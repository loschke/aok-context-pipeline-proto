import { streamText, gateway } from "ai"

import { getUser } from "@/lib/auth"
import { readPipelineFile, writePipelineFile } from "@/lib/pipeline"
import { aiDefaults } from "@/config/ai"

export const maxDuration = 120

const TAXONOMY_SYSTEM_PROMPT = `Du bist ein Experte fuer Informationsarchitektur und Taxonomie-Design im Gesundheitswesen. Deine Aufgabe: Aus den frei vergebenen Kategorien der Wissensbausteine eine konsolidierte, finale Taxonomie erstellen.

## Vorgehen

1. **Haeufigkeitsanalyse:** Liste alle in den Bausteinen vorkommenden Kategorien mit Haeufigkeit auf.
2. **Synonym-Erkennung:** Identifiziere Kategorien die dasselbe meinen (z.B. "Kombinierbarkeit" = "Kombinierte Leistungen").
3. **Konsolidierung:** Fasse Synonyme zusammen, benenne eindeutig, gruppiere in 3-5 uebergeordnete Bereiche.
4. **Finale Taxonomie:** 10-20 Kategorien, je nach Cluster-Groesse.

## Output-Format

Erstelle ein strukturiertes Markdown-Dokument mit folgenden Abschnitten:

### 1. Konsolidierungsprozess
Tabelle der freien Kategorien mit Haeufigkeit und Zuordnungsentscheidung:
| Freie Kategorie | Haeufigkeit | Aktion |
|-----------------|-------------|--------|

### 2. Synonyme aufgeloest
Auflistung welche freien Kategorien zusammengefuehrt wurden und warum.

### 3. Finale Taxonomie
Gruppiert in Bereiche, jeder Bereich als Tabelle:
| # | Kategorie-Slug | Bezeichnung | Beschreibung |
|---|----------------|-------------|-------------|

Kategorie-Slugs in kebab-case (z.B. "geldleistungen", "anspruch-und-voraussetzungen").

### 4. Hinweise fuer Re-Kategorisierung
Besonderheiten: querschnittliche Kategorien, Abgrenzungsregeln, Kategorien die aufgeloest werden sollten.

## Qualitaetskriterien

- **Schaerfe:** Jede Kategorie klar von den anderen abgrenzbar
- **Vollstaendigkeit:** Alle Bausteine muessen zuordenbar sein
- **Granularitaet:** Nicht zu grob (max 30 Bausteine pro Kategorie), nicht zu fein (min 2 Bausteine)
- **Nutzerzentrierung:** Kategorienamen die ein AOK-Versicherter verstehen wuerde
- **Konsistenz:** Einheitliche Benennungslogik (Substantive, keine Verben)

## Ton
- Analytisch, strukturiert, entscheidungsfreudig
- Bei Grenzfaellen: klare Empfehlung mit Begruendung, nicht "koennte man so oder so sehen"`

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

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
    `# Taxonomie-Konsolidierung fuer Batch: ${batch}`,
    "",
    `${sourceFiles.length} Baustein-Dateien als Input:`,
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
    "Analysiere alle Kategorien aus den obigen Bausteinen und erstelle eine konsolidierte Taxonomie.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: TAXONOMY_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 8192,
    temperature: 0.3,
    async onFinish({ text }) {
      if (text) {
        const filePath = `${batch}/taxonomie/${batch}-taxonomie.md`
        await writePipelineFile(filePath, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
