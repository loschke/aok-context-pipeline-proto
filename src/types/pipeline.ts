export type StepStatus = "locked" | "ready" | "running" | "completed" | "error"

export interface PipelineStep {
  id: number
  name: string
  description: string
  /** Directory name within batch (e.g. "scraping", "bausteine") */
  dirName: string
  status: StepStatus
  files: PipelineFile[]
}

export interface PipelineFile {
  /** Filename (e.g. "pflegegeld-raw.md") */
  name: string
  /** Relative path within data/pipeline/ (e.g. "batch-1/scraping/pflegegeld-raw.md") */
  path: string
  /** File size in bytes */
  size: number
}

export interface PipelineRun {
  batch: string
  steps: PipelineStep[]
}

export interface ScrapeProgress {
  type: "progress" | "result" | "error" | "done"
  url?: string
  slug?: string
  filename?: string
  path?: string
  size?: number
  message?: string
  error?: string
  total?: number
  completed?: number
}

/** Step definitions with directory mappings */
export const PIPELINE_STEPS = [
  { id: 1, name: "Content-Extraktion", description: "Firecrawl scrapt AOK-Webseiten und liefert Artikel als Markdown", dirName: "scraping" },
  { id: 2, name: "Baustein-Extraktion", description: "LLM extrahiert atomare Wissensbausteine mit freier Kategorisierung", dirName: "bausteine" },
  { id: 3, name: "Taxonomie-Konsolidierung", description: "LLM analysiert alle Kategorien und schlaegt finale Taxonomie vor", dirName: "taxonomie" },
  { id: 4, name: "Re-Kategorisierung & Duplikate", description: "Bausteine der finalen Taxonomie zuordnen, Ueberlappungen identifizieren", dirName: "konsolidierung" },
  { id: 5, name: "Kontext-Anreicherung", description: "5 Kontext-Dimensionen als Metadaten, Relationen aufbauen", dirName: "output" },
  { id: 6, name: "QS durch AOK", description: "AOK-Fachexperten pruefen inhaltliche Korrektheit", dirName: "qs" },
] as const

/** Map from legacy "schritt-X" directories to step IDs */
export const LEGACY_DIR_MAP: Record<string, number[]> = {
  "schritt-1": [1],
  "schritt-2": [2],
  "schritt-3": [3],
  "schritt-4-6": [4],
  "schritt-7": [5],
  "schritt-8": [6],
}
