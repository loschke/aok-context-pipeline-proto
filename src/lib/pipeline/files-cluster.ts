import fs from "node:fs/promises"
import path from "node:path"

import type { ClusterPipelineSummary, FileTreeNode } from "@/types/cluster-pipeline"
import { CLUSTER_PIPELINE_STEPS } from "@/types/cluster-pipeline"
import { createPipelineFileOps } from "./files"

const CLUSTER_BASE = path.join(process.cwd(), "data/cluster-pipeline")
const clusterOps = createPipelineFileOps(CLUSTER_BASE)

export const {
  listStepFiles: listStepFilesCluster,
  readPipelineFile: readClusterFile,
  writePipelineFile: writeClusterFile,
  ensureDir: ensureDirCluster,
  dirHasFiles: dirHasFilesCluster,
} = clusterOps

/**
 * List all cluster directories in data/cluster-pipeline/
 */
export async function listClusterPipelines(): Promise<string[]> {
  return clusterOps.listBatches()
}

/**
 * Get summary info for a cluster pipeline (for dashboard cards).
 */
export async function getClusterPipelineSummary(cluster: string): Promise<ClusterPipelineSummary> {
  let completedSteps = 0
  let totalFiles = 0

  for (const step of CLUSTER_PIPELINE_STEPS) {
    const files = await clusterOps.listStepFiles(cluster, step.dirName)
    if (files.length > 0) {
      completedSteps++
      totalFiles += files.length
    }
  }

  let lastModified: string | null = null
  try {
    const clusterPath = path.resolve(CLUSTER_BASE, cluster)
    const stat = await fs.stat(clusterPath)
    lastModified = stat.mtime.toISOString()
  } catch {
    // ignore
  }

  const displayName = cluster
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return { name: cluster, displayName, completedSteps, totalFiles, lastModified }
}

/**
 * Build a file tree for a cluster pipeline showing all 4 step directories.
 */
export async function getClusterPipelineTree(cluster: string): Promise<FileTreeNode[]> {
  const tree: FileTreeNode[] = []

  for (const step of CLUSTER_PIPELINE_STEPS) {
    const files = await clusterOps.listStepFiles(cluster, step.dirName)
    const children: FileTreeNode[] = files.map((f) => ({
      name: f.name,
      path: f.path,
      type: "file" as const,
    }))

    tree.push({
      name: step.dirName,
      path: `${cluster}/${step.dirName}`,
      type: "directory",
      children,
    })
  }

  return tree
}

/**
 * Create a new cluster pipeline directory with step subdirectories.
 */
export async function createClusterPipeline(name: string): Promise<void> {
  for (const step of CLUSTER_PIPELINE_STEPS) {
    await clusterOps.ensureDir(path.resolve(CLUSTER_BASE, name, step.dirName))
  }
}

/**
 * Delete a cluster pipeline directory and all its contents.
 */
export async function deleteClusterPipeline(name: string): Promise<void> {
  const clusterPath = clusterOps.resolveSafe(name)
  await fs.stat(clusterPath)
  await fs.rm(clusterPath, { recursive: true, force: true })
}
