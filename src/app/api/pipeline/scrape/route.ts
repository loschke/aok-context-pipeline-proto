import { checkBodySize } from "@/lib/api-guards"
import { getUser } from "@/lib/auth"
import { features } from "@/config/features"
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit"
import { isAllowedUrl } from "@/lib/url-validation"
import { webScrape } from "@/lib/web"
import { writePipelineFile } from "@/lib/pipeline"

export const maxDuration = 120

function slugFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname
    // Take the last path segment, remove trailing slash
    const segment = pathname.replace(/\/$/, "").split("/").pop() || "page"
    // Sanitize to safe filename
    return segment.replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").substring(0, 80)
  } catch {
    return "page"
  }
}

export async function POST(req: Request) {
  if (!features.web.enabled) {
    return new Response("Web features disabled", { status: 404 })
  }

  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const rateCheck = checkRateLimit(user.id, RATE_LIMITS.pipeline)
  if (!rateCheck.allowed) {
    return rateLimitResponse(rateCheck.retryAfterMs)
  }

  const sizeError = checkBodySize(req)
  if (sizeError) return sizeError

  let body: { urls: string[]; batch: string }
  try {
    body = await req.json()
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  const { urls, batch } = body

  if (!Array.isArray(urls) || urls.length === 0 || urls.length > 20) {
    return new Response("urls must be an array of 1-20 URLs", { status: 400 })
  }

  if (!batch || !/^[a-z0-9-]+$/.test(batch)) {
    return new Response("Invalid batch name", { status: 400 })
  }

  // Validate all URLs (protocol + SSRF protection)
  for (const url of urls) {
    if (!isAllowedUrl(url)) {
      return new Response(`URL not allowed: ${url}`, { status: 400 })
    }
  }

  // Stream NDJSON progress
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"))
      }

      let completed = 0
      const total = urls.length

      for (const url of urls) {
        const slug = slugFromUrl(url)
        send({ type: "progress", url, slug, message: `Scraping ${slug}...`, completed, total })

        try {
          const result = await webScrape({
            url,
            formats: ["markdown"],
            onlyMainContent: true,
          })

          const markdown = result.markdown || ""
          const filename = `${slug}-raw.md`
          const filePath = `${batch}/scraping/${filename}`

          // Build file content with metadata header
          const title = (result.metadata?.title as string) || slug
          const header = [
            "---",
            `title: "${title}"`,
            `source: "${url}"`,
            `scraped: "${new Date().toISOString()}"`,
            "---",
            "",
          ].join("\n")

          await writePipelineFile(filePath, header + markdown)

          completed++
          send({
            type: "result",
            url,
            slug,
            filename,
            path: filePath,
            size: (header + markdown).length,
            completed,
            total,
          })
        } catch (err) {
          completed++
          send({
            type: "error",
            url,
            slug,
            error: err instanceof Error ? err.message : "Scraping failed",
            completed,
            total,
          })
        }
      }

      send({ type: "done", completed, total })
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Transfer-Encoding": "chunked",
    },
  })
}
