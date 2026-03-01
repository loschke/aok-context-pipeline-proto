import { streamText, convertToModelMessages, gateway } from "ai"
import type { ModelMessage } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

import { getUser } from "@/lib/auth"
import { features } from "@/config/features"
import { assistantConfig } from "@/config/assistants"
import { loadAssistantPrompt } from "@/lib/assistant/load-prompt"
import { MAX_MESSAGE_LENGTH, MAX_BODY_SIZE } from "@/lib/constants"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { assistantChatBodySchema, parseBody } from "@/lib/schemas"

/**
 * Convert data-URL strings in file parts to Uint8Array so the AI Gateway's
 * `maybeEncodeFileParts` can re-encode them as proper data-URLs.
 *
 * Background: `convertToModelMessages` stores the full data-URL
 * (e.g. "data:image/png;base64,iVBOR...") in `part.data`.  The SDK's
 * `convertToLanguageModelV3DataContent` extracts the raw base64 string,
 * but the Vercel AI Gateway expects either a Uint8Array (which it converts
 * to a data-URL) or a URL object.  A plain base64 string may be forwarded
 * as-is to the provider, causing "Invalid base64 data" errors.
 *
 * By converting to Uint8Array here, the gateway can properly re-encode
 * the binary data as a data-URL that all providers accept.
 */
function fixFilePartsForGateway(messages: ModelMessage[]): ModelMessage[] {
  for (const msg of messages) {
    if (!Array.isArray(msg.content)) continue
    for (let i = 0; i < msg.content.length; i++) {
      const part = msg.content[i]
      if (
        part.type === "file" &&
        typeof part.data === "string" &&
        part.data.startsWith("data:")
      ) {
        const commaIdx = part.data.indexOf(",")
        if (commaIdx !== -1) {
          const base64 = part.data.slice(commaIdx + 1)
          msg.content[i] = { ...part, data: Buffer.from(base64, "base64") }
        }
      }
    }
  }
  return messages
}

export const maxDuration = 60

const ALLOWED_MIME_TYPES = new Set(
  assistantConfig.upload.accept.split(",").map((t) => t.trim())
)

export async function POST(req: Request) {
  if (!features.assistant.enabled) {
    return new Response("Assistant is disabled", { status: 404 })
  }

  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const rateCheck = checkRateLimit(user.id, RATE_LIMITS.chat)
  if (!rateCheck.allowed) {
    return rateLimitResponse(rateCheck.retryAfterMs)
  }

  // Body-Size Check via Content-Length Header
  const contentLength = req.headers.get("content-length")
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return new Response("Request too large", { status: 413 })
  }

  let rawBody: string
  try {
    rawBody = await req.text()
  } catch {
    return new Response("Invalid request body", { status: 400 })
  }

  // Fallback: Check parsed body size
  if (rawBody.length > MAX_BODY_SIZE) {
    return new Response("Request too large", { status: 413 })
  }

  let raw: unknown
  try {
    raw = JSON.parse(rawBody)
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  const parsed = parseBody(assistantChatBodySchema, raw)
  if (!parsed.success) return parsed.response

  const { messages, expertSlug, thinking } = parsed.data
  const slug = expertSlug ?? "general"

  // Input-Validierung: letzte User-Nachricht pruefen
  const lastMessage = messages[messages.length - 1]
  if (lastMessage?.role === "user") {
    const textParts =
      lastMessage.parts
        ?.filter((part: { type: string }) => part.type === "text")
        .map((part: { text: string }) => part.text)
        .join("") ?? ""
    if (textParts.length > MAX_MESSAGE_LENGTH) {
      return new Response("Message too long", { status: 400 })
    }

    // File-Part Validierung: nur erlaubte MIME-Types
    const fileParts = lastMessage.parts?.filter(
      (part: { type: string }) => part.type === "file"
    )
    if (fileParts) {
      for (const filePart of fileParts) {
        if (filePart.mediaType && !ALLOWED_MIME_TYPES.has(filePart.mediaType)) {
          return new Response("File type not allowed", { status: 400 })
        }
      }
    }
  }

  let systemPrompt: string
  try {
    systemPrompt = await loadAssistantPrompt(slug)
  } catch {
    return new Response("Expert not found", { status: 404 })
  }

  const modelMessages = fixFilePartsForGateway(await convertToModelMessages(messages))

  const result = streamText({
    model: gateway(assistantConfig.model),
    system: systemPrompt,
    messages: modelMessages,
    maxOutputTokens: thinking
      ? assistantConfig.thinkingMaxTokens
      : assistantConfig.maxTokens,
    ...(thinking ? {} : { temperature: assistantConfig.temperature }),
    tools: {
      web_search: anthropic.tools.webSearch_20250305({
        maxUses: 5,
      }),
      web_fetch: anthropic.tools.webFetch_20250910({
        maxUses: 3,
      }),
    },
    providerOptions: thinking
      ? {
          anthropic: {
            thinking: {
              type: "enabled",
              budgetTokens: assistantConfig.thinkingBudget,
            },
          },
        }
      : undefined,
  })

  return result.toUIMessageStreamResponse({
    sendReasoning: thinking ?? false,
  })
}
