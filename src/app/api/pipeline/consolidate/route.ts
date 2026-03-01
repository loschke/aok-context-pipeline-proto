import { streamText, gateway } from "ai"

import { getUser } from "@/lib/auth"
import { readPipelineFile, writePipelineFile } from "@/lib/pipeline"
import { aiDefaults } from "@/config/ai"

export const maxDuration = 120

const CONSOLIDATION_SYSTEM_PROMPT = `Du bist ein Experte fuer Content-Konsolidierung im Gesundheitswesen. Deine Aufgabe: Wissensbausteine gegen eine finale Taxonomie zuordnen, nach Kategorie gruppieren und Duplikate identifizieren.

## Vorgehen

1. **Re-Kategorisierung:** Jeden Baustein der passenden Taxonomie-Kategorie zuordnen. Dabei die freie Kategorie aus Schritt 2 durch die finale Taxonomie-Kategorie ersetzen.
2. **Gruppierung:** Bausteine nach Taxonomie-Kategorie sortieren und in Tabellen darstellen.
3. **Duplikat-Erkennung:** Bausteine mit inhaltlicher Ueberlappung identifizieren. Unterscheide:
   - **Echte Duplikate:** Identischer oder nahezu identischer Inhalt aus verschiedenen Quellen → zusammenfuehren
   - **Inhaltliche Naehe:** Verwandter Inhalt, aber unterschiedliche Perspektive → getrennt lassen mit Begruendung
4. **Zusammenfuehrung:** Fuer echte Duplikate: neuen zusammengefuehrten Baustein erstellen, alle Quellen erhalten.

## Output-Format

Erstelle ein strukturiertes Markdown-Dokument mit folgenden Abschnitten:

### 1. Re-Kategorisierung
Pro Taxonomie-Kategorie eine Tabelle:

#### Kategorie: \`kategorie-slug\` (N Bausteine)
| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|

Bei zusammengefuehrten Bausteinen die Quelle als **zusammengefuehrt** markieren und eine neue ID vergeben (z.B. ALL-FC fuer alle Quellen, PG/PS-09 fuer pflegegeld+pflegesachleistung).

### 2. Duplikat-Analyse
Pro Duplikat-Gruppe:
- Betroffene Baustein-IDs
- Befund (was ist identisch/ueberlappend)
- Zusammengefuehrter Inhalt (Zitat)
- Quellen
- Entscheidung mit Begruendung

Auch: "Nicht-Duplikate mit inhaltlicher Naehe" — bewusst getrennt gehaltene Bausteine mit Begruendung.

### 3. Zusammenfassung
Metrik-Tabelle:
| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Bausteine gesamt | X | Y |
| Duplikate entfernt | — | N Gruppen |
| Kategorien genutzt | N frei | N von M Taxonomie |

## Regeln

- Keine Information darf verloren gehen. Bei Zusammenfuehrung immer den reicheren Text verwenden.
- Wenn ein Baustein mehreren Kategorien zuordenbar ist: Primaerkategorie waehlen, Zweitkategorie in Klammern notieren.
- Antragsprozesse sind leistungsspezifisch und KEINE Duplikate, auch wenn die Struktur aehnlich ist.
- Querschnittliche Kategorien (z.B. "leistungsbetraege") werden aufgeloest: Betrags-Bausteine werden der jeweiligen Leistungsart zugeordnet.

## Ton
- Analytisch, praezise, nachvollziehbar
- Jede Entscheidung begruenden`

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  let body: { bausteinFiles: string[]; taxonomyFile: string; batch: string }
  try {
    body = await req.json()
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  const { bausteinFiles, taxonomyFile, batch } = body

  if (!Array.isArray(bausteinFiles) || bausteinFiles.length === 0 || bausteinFiles.length > 20) {
    return new Response("bausteinFiles must be an array of 1-20 file paths", { status: 400 })
  }

  if (!taxonomyFile || typeof taxonomyFile !== "string") {
    return new Response("taxonomyFile is required", { status: 400 })
  }

  if (!batch || !/^[a-z0-9-]+$/.test(batch)) {
    return new Response("Invalid batch name", { status: 400 })
  }

  // Validate paths
  const allFiles = [...bausteinFiles, taxonomyFile]
  for (const file of allFiles) {
    if (file.includes("..") || !/^[a-z0-9/_.-]+$/.test(file)) {
      return new Response(`Invalid file path: ${file}`, { status: 400 })
    }
  }

  // Read taxonomy file
  let taxonomyContent: string
  try {
    taxonomyContent = await readPipelineFile(taxonomyFile)
  } catch {
    return new Response(`Taxonomy file not found: ${taxonomyFile}`, { status: 404 })
  }

  // Read baustein files
  const bausteinContents: string[] = []
  for (const file of bausteinFiles) {
    try {
      const content = await readPipelineFile(file)
      bausteinContents.push(content)
    } catch {
      return new Response(`File not found: ${file}`, { status: 404 })
    }
  }

  const userMessage = [
    `# Konsolidierung fuer Batch: ${batch}`,
    "",
    "## Taxonomie (aus Schritt 3)",
    "",
    taxonomyContent,
    "",
    "---",
    "",
    `## Bausteine (${bausteinFiles.length} Dateien)`,
    "",
    ...bausteinContents.map((content, i) => [
      `---`,
      `### Baustein-Datei ${i + 1}: ${bausteinFiles[i]}`,
      "",
      content,
      "",
    ].join("\n")),
    "---",
    "",
    "Ordne alle Bausteine der finalen Taxonomie zu, identifiziere Duplikate und erstelle den konsolidierten Report.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: CONSOLIDATION_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 8192,
    temperature: 0.3,
    async onFinish({ text }) {
      if (text) {
        const filePath = `${batch}/konsolidierung/${batch}-konsolidiert.md`
        await writePipelineFile(filePath, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
