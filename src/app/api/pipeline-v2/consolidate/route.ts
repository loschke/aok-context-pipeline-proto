import { streamText, gateway } from "ai"

import { checkBodySize } from "@/lib/api-guards"
import { getUser } from "@/lib/auth"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { readPipelineFileV2, writePipelineFileV2 } from "@/lib/pipeline/files-v2"
import { aiDefaults } from "@/config/ai"
import { CONSOLIDATE_V2_SYSTEM_PROMPT } from "@/lib/pipeline/prompts/consolidate-v2"

export const maxDuration = 300

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

  if (!Array.isArray(sourceFiles) || sourceFiles.length === 0 || sourceFiles.length > 50) {
    return new Response("sourceFiles must be an array of 1-50 file paths", { status: 400 })
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
    `# Konsolidierung fuer Cluster: ${cluster}`,
    "",
    `${sourceFiles.length} gruppierte Dateien als Input:`,
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
    "Fuehre Duplikate zusammen und loese Konflikte auf. Gib die bereinigten Bausteine aus.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: CONSOLIDATE_V2_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 48000,
    temperature: 0.3,
    async onFinish({ text }) {
      if (text) {
        await writePipelineFileV2(`${cluster}/konsolidierung/${cluster}-konsolidiert.md`, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
