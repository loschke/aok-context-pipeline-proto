import { streamText, gateway } from "ai"

import { checkBodySize } from "@/lib/api-guards"
import { getUser } from "@/lib/auth"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { readPipelineFile, writePipelineFile } from "@/lib/pipeline"
import { aiDefaults } from "@/config/ai"

export const maxDuration = 120

const ENRICHMENT_SYSTEM_PROMPT = `Du bist ein Experte fuer Context Engineering im Gesundheitswesen. Deine Aufgabe: Konsolidierte Wissensbausteine mit 5 Kontext-Dimensionen anreichern und als vollstaendige Markdown-Dokumente mit YAML-Frontmatter ausgeben.

## Die 5 Kontext-Dimensionen

1. **Bedeutung (Meaning):** Woher kommt die Information? Quellen mit URLs und Crawl-Datum.
2. **Struktur (Structure):** Wie haengt dieser Baustein mit anderen zusammen? Relationstypen: voraussetzung, kombinierbar_mit, alternative_zu, verwandt_mit, teil_von, ersetzt_durch.
3. **Qualitaet (Quality):** Wie aktuell und verlaesslich? Stand, Volatilitaet (hoch/mittel/niedrig), Validierungsstatus.
4. **Regeln (Rules):** Welche rechtlichen/fachlichen Einschraenkungen? Haftungshinweis, Rechtsgrundlage (SGB-Paragraphen).
5. **Zielgruppe (Audience):** Fuer wen relevant? Zielgruppen-Tags, Kontext-Tags (Pflegegrade, Setting, Leistungsform).

## Output-Format

Gib fuer JEDEN Baustein ein vollstaendiges Markdown-Dokument aus. Trenne die Dokumente mit einer Zeile die NUR \`---SPLIT---\` enthaelt.

Jedes Dokument hat dieses Format:

\`\`\`
---SPLIT---
slug: baustein-slug
---
titel: "Titel des Bausteins"
typ: BAUSTEINTYP
cluster: CLUSTERNAME
kategorie: kategorie-slug
stand: "YYYY-MM-DD"
volatilitaet: hoch|mittel|niedrig
validiert: false
quellen:
  - url: "https://..."
    crawl_datum: "YYYY-MM-DD"
zielgruppe:
  - zielgruppe1
  - zielgruppe2
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
  setting: "haeuslich|ambulant|stationaer|palliativ"
  leistungsform: "geldleistung|sachleistung|kombiniert"
haftungshinweis: "..."
rechtsgrundlage: "§ XX SGB XI"
relationen:
  - typ: relationstyp
    ziel: ziel-baustein-slug
    details: "Beschreibung der Beziehung"
---

## Titel

Inhalt des Bausteins als strukturierter Fliesstext mit Zwischenueberschriften.
\`\`\`

## Regeln fuer die Anreicherung

### Slugs
- Leite den Slug aus dem Baustein-Inhalt ab (z.B. "pflegegeld", "beratungspflicht-pflegegeld")
- kebab-case, keine Umlaute (ae, oe, ue statt ä, ö, ü)

### Volatilitaet
- **hoch:** Betraege, Fristen, Zuschusssaetze (aendert sich mit Pflegereformen)
- **mittel:** Ablaeufe, Zustaendigkeiten, Formulare
- **niedrig:** Grunddefinitionen, Systematik, SGB-Referenzen

### Relationen
- Nur Relationen zu Bausteinen die im aktuellen Set existieren (oder plausibel existieren werden)
- Jede Relation braucht eine konkrete Beschreibung in "details"
- Relationstypen: voraussetzung, kombinierbar_mit, alternative_zu, verwandt_mit, teil_von, ersetzt_durch

### Zielgruppen
Moegliche Werte: pflegebeduerftige, angehoerige, pflegepersonen, versicherte, berater

### Kontext-Tags
- pflegegrade: Array der relevanten Pflegegrade [1-5]
- setting: haeuslich, ambulant, stationaer, palliativ
- leistungsform: geldleistung, sachleistung, kombiniert, entlastung, beratung

### Inhalt
- Strukturiere den Baustein-Inhalt mit Zwischenueberschriften (##)
- Betraege in Tabellen darstellen
- Prozesse als nummerierte Listen
- Keine Marketing-Sprache, sachlich und praezise

### Validierung
- Setze \`validiert: false\` fuer alle Bausteine (wird spaeter durch AOK-QS geaendert)
- Setze \`stand\` auf das aktuelle Datum

## Ton
- Sachlich, strukturiert, vollstaendig
- Jeder Baustein muss eigenstaendig verstaendlich sein
- Keine Abkuerzungen ohne Erklaerung`

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

  const userMessage = [
    `# Kontext-Anreicherung fuer Batch: ${batch}`,
    "",
    `${sourceFiles.length} konsolidierte Baustein-Dateien als Input:`,
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
    "Reichere jeden Baustein mit allen 5 Kontext-Dimensionen an. Gib jeden Baustein als eigenstaendiges Markdown-Dokument mit YAML-Frontmatter aus, getrennt durch ---SPLIT--- Marker.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: ENRICHMENT_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 16384,
    temperature: 0.3,
    async onFinish({ text }) {
      if (!text) return

      // Parse the output into individual baustein files
      const parts = text.split("---SPLIT---").filter((p) => p.trim())

      for (const part of parts) {
        // Extract slug from the first line after split marker
        const slugMatch = part.match(/slug:\s*([a-z0-9-]+)/)
        if (!slugMatch) continue

        const slug = slugMatch[1]
        // Remove the slug line, keep the rest (frontmatter + content)
        const content = part.replace(/slug:\s*[a-z0-9-]+\n?/, "").trim()

        const filePath = `${batch}/output/${slug}.md`
        await writePipelineFile(filePath, content)
      }
    },
  })

  return result.toTextStreamResponse()
}
