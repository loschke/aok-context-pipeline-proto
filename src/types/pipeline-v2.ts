import type { StepStatus, PipelineFile, ScrapeProgress } from "./pipeline"
export type { StepStatus, PipelineFile, ScrapeProgress }

export const BAUSTEIN_TYPEN_V2 = [
  "FAKT", "EMPFEHLUNG", "ANLEITUNG", "FAQ",
  "CHECKLISTE", "VERGLEICH", "GLOSSAR", "NAVIGATION",
] as const
export type BausteinTypV2 = typeof BAUSTEIN_TYPEN_V2[number]

export const PIPELINE_STEPS_V2 = [
  { id: 1, name: "Content-Extraktion", dirName: "scraping", description: "Firecrawl scrapt AOK-Webseiten" },
  { id: 2, name: "Baustein-Extraktion", dirName: "bausteine", description: "8 Bausteintypen mit freier Kategorisierung" },
  { id: 3, name: "Taxonomie-Konsolidierung", dirName: "taxonomie", description: "Kategorien zu finaler Taxonomie vereinheitlichen" },
  { id: 4, name: "Re-Kategorisierung", dirName: "rekategorisierung", description: "Bausteine der finalen Taxonomie zuordnen" },
  { id: 5, name: "Gruppierung & Duplikate", dirName: "gruppierung", description: "Nach Kategorie gruppieren, Ueberschneidungen finden" },
  { id: 6, name: "Konsolidierung", dirName: "konsolidierung", description: "Duplikate zusammenfuehren, Konflikte aufloesen" },
  { id: 7, name: "Kontext-Anreicherung", dirName: "output", description: "5 Dimensionen, Relationen, finale Struktur" },
  { id: 8, name: "QS durch AOK", dirName: "qs", description: "AOK-Fachexperten pruefen Korrektheit" },
] as const

export interface ClusterSummary {
  name: string
  displayName: string
  completedSteps: number
  totalFiles: number
  lastModified: string | null
}

export interface PipelineStepV2 {
  id: number
  name: string
  dirName: string
  description: string
  status: StepStatus
  files: PipelineFile[]
}

export interface PipelineRunV2 {
  batch: string
  steps: PipelineStepV2[]
}

export interface FileTreeNode {
  name: string
  path: string
  type: "file" | "directory"
  children?: FileTreeNode[]
}
