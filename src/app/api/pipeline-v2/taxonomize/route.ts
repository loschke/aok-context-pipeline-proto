import { streamText, gateway } from "ai"

import { checkBodySize } from "@/lib/api-guards"
import { getUser } from "@/lib/auth"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { readPipelineFileV2, writePipelineFileV2 } from "@/lib/pipeline/files-v2"
import { aiDefaults } from "@/config/ai"
import { TAXONOMY_V2_SYSTEM_PROMPT } from "@/lib/pipeline/prompts/taxonomize-v2"

export const maxDuration = 120

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) return new Response("Unauthorized", { status: 401 })

  const rateCheck = checkRateLimit(user.id, RATE_LIMITS.pipeline)
  if (!rateCheck.allowed) return rateLimitResponse(rateCheck.retryAfterMs)

  const sizeError = checkBodySize(req)
  if (sizeError) return sizeError

  let body: { sourceFiles: string[]; cluster: string }
  try { body = await req.json() } catch { return new Response("Invalid JSON", { status: 400 }) }

  const { sourceFiles, cluster } = body

  if (!Array.isArray(sourceFiles) || sourceFiles.length === 0 || sourceFiles.length > 20) {
    return new Response("sourceFiles must be an array of 1-20 file paths", { status: 400 })
  }
  if (!cluster || !/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  const sourceContents: string[] = []
  for (const file of sourceFiles) {
    if (file.includes("..") || !/^[a-z0-9/_.-]+$/.test(file)) {
      return new Response(`Invalid file path: ${file}`, { status: 400 })
    }
    try {
      sourceContents.push(await readPipelineFileV2(file))
    } catch {
      return new Response(`File not found: ${file}`, { status: 404 })
    }
  }

  const userMessage = [
    `# Taxonomie-Konsolidierung fuer Cluster: ${cluster}`,
    "",
    `${sourceFiles.length} Baustein-Dateien als Input:`,
    "",
    ...sourceContents.map((content, i) => [
      `---`,
      `## Quelldatei ${i + 1}: ${sourceFiles[i]}`,
      "",
      content,
      "",
    ].join("\n")),
    "---",
    "",
    "Analysiere alle Kategorien und erstelle eine konsolidierte Taxonomie.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: TAXONOMY_V2_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 8192,
    temperature: 0.3,
    async onFinish({ text }) {
      if (text) {
        await writePipelineFileV2(`${cluster}/taxonomie/${cluster}-taxonomie.md`, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
