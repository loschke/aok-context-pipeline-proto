import fs from "node:fs/promises"
import path from "node:path"

import type { PipelineFile } from "@/types/pipeline"

const BASE_PATH = path.join(process.cwd(), "data/pipeline")

/**
 * Resolve a relative pipeline path to an absolute path.
 * Validates that the resolved path stays within BASE_PATH (path traversal protection).
 */
function resolveSafe(relativePath: string): string {
  const resolved = path.resolve(BASE_PATH, relativePath)
  if (!resolved.startsWith(BASE_PATH)) {
    throw new Error("Path traversal detected")
  }
  return resolved
}

/**
 * List all batch directories (e.g. "batch-1", "batch-2").
 * Also includes legacy "schritt-X" directories as virtual batches.
 */
export async function listBatches(): Promise<string[]> {
  const entries = await fs.readdir(BASE_PATH, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()
}

/**
 * List markdown files within a step directory of a batch.
 */
export async function listStepFiles(
  batch: string,
  stepDir: string
): Promise<PipelineFile[]> {
  const dirPath = resolveSafe(path.join(batch, stepDir))

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    const files: PipelineFile[] = []

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue
      const filePath = path.join(dirPath, entry.name)
      const stat = await fs.stat(filePath)
      files.push({
        name: entry.name,
        path: path.join(batch, stepDir, entry.name).replace(/\\/g, "/"),
        size: stat.size,
      })
    }

    return files.sort((a, b) => a.name.localeCompare(b.name))
  } catch {
    return []
  }
}

/**
 * Read the content of a pipeline file.
 */
export async function readPipelineFile(relativePath: string): Promise<string> {
  const filePath = resolveSafe(relativePath)
  return fs.readFile(filePath, "utf-8")
}

/**
 * Write content to a pipeline file, creating directories as needed.
 */
export async function writePipelineFile(
  relativePath: string,
  content: string
): Promise<void> {
  const filePath = resolveSafe(relativePath)
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content, "utf-8")
}

/**
 * Ensure a directory exists, creating it and parents if needed.
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true })
}

/**
 * Check whether a directory exists and has files.
 */
export async function dirHasFiles(
  batch: string,
  stepDir: string
): Promise<boolean> {
  const dirPath = resolveSafe(path.join(batch, stepDir))
  try {
    const entries = await fs.readdir(dirPath)
    return entries.some((e) => e.endsWith(".md"))
  } catch {
    return false
  }
}
