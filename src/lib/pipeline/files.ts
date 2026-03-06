import fs from "node:fs/promises"
import path from "node:path"

import type { PipelineFile } from "@/types/pipeline"

/**
 * Factory to create pipeline file operations scoped to a base path.
 */
export function createPipelineFileOps(basePath: string) {
  const resolvedBase = path.resolve(basePath)

  function resolveSafe(relativePath: string): string {
    const resolved = path.resolve(resolvedBase, relativePath)
    if (!resolved.startsWith(resolvedBase)) {
      throw new Error("Path traversal detected")
    }
    return resolved
  }

  async function listBatches(): Promise<string[]> {
    try {
      const entries = await fs.readdir(resolvedBase, { withFileTypes: true })
      return entries
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort()
    } catch {
      return []
    }
  }

  async function listStepFiles(
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

  async function readPipelineFile(relativePath: string): Promise<string> {
    const filePath = resolveSafe(relativePath)
    return fs.readFile(filePath, "utf-8")
  }

  async function writePipelineFile(
    relativePath: string,
    content: string
  ): Promise<void> {
    const filePath = resolveSafe(relativePath)
    await ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, content, "utf-8")
  }

  async function ensureDir(dirPath: string): Promise<void> {
    await fs.mkdir(dirPath, { recursive: true })
  }

  async function dirHasFiles(
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

  return { listBatches, listStepFiles, readPipelineFile, writePipelineFile, ensureDir, dirHasFiles, resolveSafe }
}
