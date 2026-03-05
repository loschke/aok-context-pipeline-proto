import { streamText, gateway } from "ai"

import { checkBodySize } from "@/lib/api-guards"
import { getUser } from "@/lib/auth"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { readPipelineFileV2, writePipelineFileV2 } from "@/lib/pipeline/files-v2"
import { aiDefaults } from "@/config/ai"
import { RECATEGORIZE_V2_SYSTEM_PROMPT } from "@/lib/pipeline/prompts/recategorize-v2"

export const maxDuration = 120

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) return new Response("Unauthorized", { status: 401 })

  const rateCheck = checkRateLimit(user.id, RATE_LIMITS.pipeline)
  if (!rateCheck.allowed) return rateLimitResponse(rateCheck.retryAfterMs)

  const sizeError = checkBodySize(req)
  if (sizeError) return sizeError

  let body: { bausteinFiles: string[]; taxonomyFile: string; cluster: string }
  try { body = await req.json() } catch { return new Response("Invalid JSON", { status: 400 }) }

  const { bausteinFiles, taxonomyFile, cluster } = body

  if (!Array.isArray(bausteinFiles) || bausteinFiles.length === 0 || bausteinFiles.length > 20) {
    return new Response("bausteinFiles must be an array of 1-20 file paths", { status: 400 })
  }
  if (!taxonomyFile || typeof taxonomyFile !== "string") {
    return new Response("taxonomyFile is required", { status: 400 })
  }
  if (!cluster || !/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  const allFiles = [...bausteinFiles, taxonomyFile]
  for (const file of allFiles) {
    if (file.includes("..") || !/^[a-z0-9/_.-]+$/.test(file)) {
      return new Response(`Invalid file path: ${file}`, { status: 400 })
    }
  }

  let taxonomyContent: string
  try {
    taxonomyContent = await readPipelineFileV2(taxonomyFile)
  } catch {
    return new Response(`Taxonomy file not found: ${taxonomyFile}`, { status: 404 })
  }

  const bausteinContents: string[] = []
  for (const file of bausteinFiles) {
    try {
      bausteinContents.push(await readPipelineFileV2(file))
    } catch {
      return new Response(`File not found: ${file}`, { status: 404 })
    }
  }

  const userMessage = [
    `# Re-Kategorisierung fuer Cluster: ${cluster}`,
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
    "Ordne jeden Baustein der passenden Taxonomie-Kategorie zu.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: RECATEGORIZE_V2_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 8192,
    temperature: 0.3,
    async onFinish({ text }) {
      if (text) {
        await writePipelineFileV2(`${cluster}/rekategorisierung/${cluster}-rekategorisiert.md`, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
