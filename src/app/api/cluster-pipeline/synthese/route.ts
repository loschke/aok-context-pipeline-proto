import { streamText, gateway } from "ai"

import { checkBodySize } from "@/lib/api-guards"
import { getUser } from "@/lib/auth"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { readClusterFile, writeClusterFile } from "@/lib/pipeline/files-cluster"
import { aiDefaults } from "@/config/ai"
import { CLUSTER_SYNTHESE_SYSTEM_PROMPT } from "@/lib/pipeline/prompts/cluster-synthese"

export const maxDuration = 300

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) return new Response("Unauthorized", { status: 401 })

  const rateCheck = checkRateLimit(user.id, RATE_LIMITS.pipeline)
  if (!rateCheck.allowed) return rateLimitResponse(rateCheck.retryAfterMs)

  const sizeError = checkBodySize(req)
  if (sizeError) return sizeError

  let body: { sourceFiles: string[]; outlineFiles: string[]; cluster: string }
  try { body = await req.json() } catch { return new Response("Invalid JSON", { status: 400 }) }

  const { sourceFiles, outlineFiles, cluster } = body

  if (!Array.isArray(sourceFiles) || sourceFiles.length === 0 || sourceFiles.length > 50) {
    return new Response("sourceFiles must be an array of 1-50 file paths", { status: 400 })
  }
  if (!Array.isArray(outlineFiles) || outlineFiles.length === 0 || outlineFiles.length > 10) {
    return new Response("outlineFiles must be an array of 1-10 file paths", { status: 400 })
  }
  if (!cluster || !/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  const allFiles = [...sourceFiles, ...outlineFiles]
  for (const file of allFiles) {
    if (file.includes("..") || !/^[a-z0-9/_.-]+$/.test(file)) {
      return new Response(`Invalid file path: ${file}`, { status: 400 })
    }
  }

  const sourceContents: string[] = []
  for (const file of sourceFiles) {
    try {
      sourceContents.push(await readClusterFile(file))
    } catch {
      return new Response(`File not found: ${file}`, { status: 404 })
    }
  }

  const outlineContents: string[] = []
  for (const file of outlineFiles) {
    try {
      outlineContents.push(await readClusterFile(file))
    } catch {
      return new Response(`File not found: ${file}`, { status: 404 })
    }
  }

  const userMessage = [
    `# Synthese fuer Cluster: ${cluster}`,
    "",
    "## Rohseiten (gescrapte Quellseiten)",
    "",
    ...sourceContents.map((content, i) => [
      `---`,
      `### Quelldatei ${i + 1}: ${sourceFiles[i]}`,
      "",
      content,
      "",
    ].join("\n")),
    "---",
    "",
    "## Gliederung (Outline aus Schritt 2)",
    "",
    ...outlineContents.map((content, i) => [
      `---`,
      `### Outline-Datei ${i + 1}: ${outlineFiles[i]}`,
      "",
      content,
      "",
    ].join("\n")),
    "---",
    "",
    "Erstelle das Cluster-Dokument entlang der Gliederung. Fuehre alle Informationen aus den Rohseiten zusammen. Beachte die Qualitaetskriterien und Strukturregeln.",
  ].join("\n")

  const result = streamText({
    model: gateway(aiDefaults.model),
    system: CLUSTER_SYNTHESE_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    maxOutputTokens: 48000,
    temperature: 0.3,
    async onFinish({ text }) {
      if (text) {
        await writeClusterFile(`${cluster}/synthese/${cluster}-cluster.md`, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
