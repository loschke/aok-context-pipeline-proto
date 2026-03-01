import fs from "fs/promises"
import path from "path"

const SLUG_PATTERN = /^[a-z0-9-]+$/

export async function loadSystemPrompt(
  guidePath: string,
  moduleSlug?: string | null
): Promise<string> {
  const basePath = path.join(process.cwd(), "src/content/guides", guidePath)

  // Guide-Rolle + übergreifender Kontext (immer)
  const systemContent = await fs.readFile(
    path.join(basePath, "system.md"),
    "utf-8"
  )

  // Modul-Kontext (optional)
  let moduleContent = ""
  if (moduleSlug && SLUG_PATTERN.test(moduleSlug)) {
    try {
      moduleContent = await fs.readFile(
        path.join(basePath, "modules", `${moduleSlug}.md`),
        "utf-8"
      )
    } catch {
      // Modul-Datei nicht gefunden → kein Modul-Kontext
    }
  }

  return [systemContent, moduleContent].filter(Boolean).join("\n\n---\n\n")
}
