import type { StepStatus, PipelineFile, ScrapeProgress } from "./pipeline"
export type { StepStatus, PipelineFile, ScrapeProgress }
export type { FileTreeNode } from "./pipeline-v2"

export const CLUSTER_PIPELINE_STEPS = [
  { id: 1, name: "Content-Extraktion", dirName: "scraping", description: "Firecrawl scrapt Quellseiten des Clusters" },
  { id: 2, name: "Analyse & Themenstruktur", dirName: "analyse", description: "LLM analysiert Themen, Duplikate, Luecken" },
  { id: 3, name: "Synthese", dirName: "synthese", description: "LLM erzeugt Cluster-Dokument aus Rohseiten + Gliederung" },
  { id: 4, name: "Review & Freigabe", dirName: "review", description: "Menschliche Pruefung und Freigabe" },
] as const

export interface ClusterPipelineStep {
  id: number
  name: string
  dirName: string
  description: string
  status: StepStatus
  files: PipelineFile[]
}

export interface ClusterPipelineRun {
  cluster: string
  steps: ClusterPipelineStep[]
}

export interface ClusterPipelineSummary {
  name: string
  displayName: string
  completedSteps: number
  totalFiles: number
  lastModified: string | null
}
