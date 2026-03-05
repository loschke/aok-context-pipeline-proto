import fs from "fs/promises"
import path from "path"

import type { ExpertConfig } from "./types"

const ASSISTANTS_DIR = path.join(process.cwd(), "src/content/assistants")

export async function listExperts(): Promise<ExpertConfig[]> {
  const entries = await fs.readdir(ASSISTANTS_DIR, { withFileTypes: true })
  const dirs = entries.filter((e) => e.isDirectory())

  const experts: ExpertConfig[] = []

  for (const dir of dirs) {
    try {
      const configPath = path.join(ASSISTANTS_DIR, dir.name, "config.json")
      const raw = await fs.readFile(configPath, "utf-8")
      const config = JSON.parse(raw) as Omit<ExpertConfig, "slug">

      if (config.hidden) continue

      experts.push({
        slug: dir.name,
        name: config.name,
        emoji: config.emoji,
        description: config.description,
        suggestions: config.suggestions ?? [],
      })
    } catch {
      // Ordner ohne config.json — ignorieren
    }
  }

  return experts
}
