import { streamText, gateway } from "ai"

import { checkBodySize } from "@/lib/api-guards"
import { getUser } from "@/lib/auth"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { readPipelineFile, writePipelineFile } from "@/lib/pipeline"
import { aiDefaults } from "@/config/ai"

export const maxDuration = 120

const EXTRACTION_SYSTEM_PROMPT = `Du bist ein Experte fuer die Content-to-Context Transformation. Deine Aufgabe: Aus gescraptem AOK-Webinhalt atomare Wissensbausteine extrahieren.

## Regeln

1. Jeder Baustein enthaelt genau EINE Information — keine Mischung
2. Nutze diese 7 Bausteintypen:
   - FAKT — Objektive, verifizierbare Information (Betraege, Fristen, Voraussetzungen)
   - LEISTUNG — AOK-spezifisches Leistungsangebot
   - EMPFEHLUNG — Begruendete Handlungsempfehlung
   - WARNUNG — Risiko oder wichtiger Hinweis
   - TIPP — Praktischer Hinweis
   - VERWEIS — Referenz auf anderes Thema oder Service
   - PROZESS — Schritt-fuer-Schritt-Anleitung

3. Formatierung pro Baustein:
   ### KUERZEL-NR | TYP | \`kategorie\`
   Inhalt des Bausteins als Fliesstext.

4. Gruppiere Bausteine pro Quellseite mit einer Ueberschrift:
   ## Seite N: Titel
   Quelle: URL

5. Vergib ein 2-3-buchstabiges Kuerzel pro Seite (z.B. PG fuer Pflegegeld, EB fuer Entlastungsbetrag)
6. Nummeriere Bausteine fortlaufend pro Seite (PG-01, PG-02, ...)
7. Vergib eine thematische Kategorie als kebab-case (z.B. "pflege-zu-hause", "hilfsmittel")
8. Kennzeichne offensichtliche Duplikate mit: **DUPLIKAT → KUERZEL**

## Ton
- Sachlich, komprimiert, kein Marketing-Sprech
- Betraege und Fristen exakt uebernehmen
- Keine Interpretationen, nur Fakten aus dem Quelltext`

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const rateCheck = checkRateLimit(user.id, RATE_LIMITS.pipeline)
  if (!rateCheck.allowed) {
    return rateLimitResponse(rateCheck.retryAfterMs)
  }

  const sizeError = checkBodySize(req)
  if (sizeError) return sizeError

  let body: { sourceFiles: string[]; batch: string }
  try {
    body = await req.json()
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  const { sourceFiles, batch } = body

  if (!Array.isArray(sourceFiles) || sourceFiles.length === 0 || sourceFiles.length > 20) {
    return new Response("sourceFiles must be an array of 1-20 file paths", { status: 400 })
  }

  if (!batch || !/^[a-z0-9-]+$/.test(batch)) {
    return new Response("Invalid batch name", { status: 400 })
  }

  // Validate and read all source files
  const sourceContents: string[] = []
  for (const file of sourceFiles) {
    if (file.includes("..") || !/^[a-z0-9/_.-]+$/.test(file)) {
      return new Response(`Invalid file path: ${file}`, { status: 400 })
    }
    try {
      const content = await readPipelineFile(file)
      sourceContents.push(content)
    } catch {
      return new Response(`File not found: ${file}`, { status: 404 })
    }
  }

  // Build user message with all source content
  const userMessage = [
    `# Baustein-Extraktion fuer Batch: ${batch}`,
    "",
    `${sourceFiles.length} Quelldateien:`,
    "",
    ...sourceContents.map((content, i) => [
      `---`,
      `## Quelldatei ${i + 1}: ${sourceFiles[i]}`,
      "",
      content,
      "",
    ].join("\n")),
    "---",
    "",
    "Extrahiere alle Wissensbausteine aus den obigen Quelldateien.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: EXTRACTION_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 8192,
    temperature: 0.3,
    async onFinish({ text }) {
      // Save extraction result
      if (text) {
        const filePath = `${batch}/bausteine/${batch}-bausteine.md`
        await writePipelineFile(filePath, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
