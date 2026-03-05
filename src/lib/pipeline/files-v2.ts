import fs from "node:fs/promises"
import path from "node:path"

import type { ClusterSummary, FileTreeNode } from "@/types/pipeline-v2"
import { PIPELINE_STEPS_V2 } from "@/types/pipeline-v2"
import { createPipelineFileOps } from "./files"

const V2_BASE = path.join(process.cwd(), "data/pipeline-v2")
const v2Ops = createPipelineFileOps(V2_BASE)

export const {
  listStepFiles: listStepFilesV2,
  readPipelineFile: readPipelineFileV2,
  writePipelineFile: writePipelineFileV2,
  ensureDir: ensureDirV2,
  dirHasFiles: dirHasFilesV2,
} = v2Ops

/**
 * List all cluster directories in data/pipeline-v2/
 */
export async function listClusters(): Promise<string[]> {
  return v2Ops.listBatches()
}

/**
 * Get summary info for a cluster (for dashboard cards).
 */
export async function getClusterSummary(cluster: string): Promise<ClusterSummary> {
  let completedSteps = 0
  let totalFiles = 0
  let lastModified: string | null = null

  for (const step of PIPELINE_STEPS_V2) {
    const files = await v2Ops.listStepFiles(cluster, step.dirName)
    if (files.length > 0) {
      completedSteps++
      totalFiles += files.length
    }
  }

  // Check _config files too
  const configFiles = await v2Ops.listStepFiles(cluster, "_config")
  totalFiles += configFiles.length

  // Get last modified from the cluster directory
  try {
    const clusterPath = path.resolve(V2_BASE, cluster)
    const stat = await fs.stat(clusterPath)
    lastModified = stat.mtime.toISOString()
  } catch {
    // ignore
  }

  // Prettify cluster name
  const displayName = cluster
    .replace(/^batch-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return { name: cluster, displayName, completedSteps, totalFiles, lastModified }
}

/**
 * Build a file tree for a cluster showing all step directories and _config.
 */
export async function getClusterTree(cluster: string): Promise<FileTreeNode[]> {
  const tree: FileTreeNode[] = []

  // Step directories
  for (const step of PIPELINE_STEPS_V2) {
    const files = await v2Ops.listStepFiles(cluster, step.dirName)
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

  // _config directory
  const configFiles = await v2Ops.listStepFiles(cluster, "_config")
  tree.push({
    name: "_config",
    path: `${cluster}/_config`,
    type: "directory",
    children: configFiles.map((f) => ({
      name: f.name,
      path: f.path,
      type: "file" as const,
    })),
  })

  return tree
}

/**
 * Create a new cluster directory with step subdirectories.
 */
export async function createCluster(name: string): Promise<void> {
  for (const step of PIPELINE_STEPS_V2) {
    await v2Ops.ensureDir(path.resolve(V2_BASE, name, step.dirName))
  }
  await v2Ops.ensureDir(path.resolve(V2_BASE, name, "_config"))
}
