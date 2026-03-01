"use client"

import { useState, useCallback } from "react"
import { Play, FileText, Check, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { PipelineStep, ScrapeProgress } from "@/types/pipeline"
import { FilePreview } from "./file-preview"

interface StepScrapeProps {
  step: PipelineStep
  batch: string
  onComplete: () => void
}

interface ScrapeItem {
  url: string
  slug?: string
  status: "pending" | "scraping" | "done" | "error"
  filename?: string
  error?: string
}

export function StepScrape({ step, batch, onComplete }: StepScrapeProps) {
  const [urls, setUrls] = useState("")
  const [items, setItems] = useState<ScrapeItem[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [previewFilename, setPreviewFilename] = useState<string>("")

  const handleScrape = useCallback(async () => {
    const urlList = urls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0)

    if (urlList.length === 0) return

    setIsRunning(true)
    setPreviewContent(null)
    setItems(urlList.map((url) => ({ url, status: "pending" })))

    try {
      const response = await fetch("/api/pipeline/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList, batch }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setItems((prev) =>
          prev.map((item) => ({ ...item, status: "error" as const, error: errorText }))
        )
        setIsRunning(false)
        return
      }

      const reader = response.body?.getReader()
      if (!reader) return

      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const data = JSON.parse(line) as ScrapeProgress
            if (data.type === "progress") {
              setItems((prev) =>
                prev.map((item) =>
                  item.url === data.url
                    ? { ...item, slug: data.slug, status: "scraping" as const }
                    : item
                )
              )
            } else if (data.type === "result") {
              setItems((prev) =>
                prev.map((item) =>
                  item.url === data.url
                    ? {
                        ...item,
                        status: "done" as const,
                        filename: data.filename,
                      }
                    : item
                )
              )
            } else if (data.type === "error") {
              setItems((prev) =>
                prev.map((item) =>
                  item.url === data.url
                    ? { ...item, status: "error" as const, error: data.error }
                    : item
                )
              )
            } else if (data.type === "done") {
              onComplete()
            }
          } catch {
            // Skip malformed lines
          }
        }
      }
    } catch (err) {
      setItems((prev) =>
        prev.map((item) =>
          item.status === "pending" || item.status === "scraping"
            ? {
                ...item,
                status: "error" as const,
                error: err instanceof Error ? err.message : "Verbindungsfehler",
              }
            : item
        )
      )
    } finally {
      setIsRunning(false)
    }
  }, [urls, batch, onComplete])

  async function loadFilePreview(filePath: string, filename: string) {
    try {
      const response = await fetch(`/api/pipeline/files?path=${encodeURIComponent(filePath)}`)
      if (response.ok) {
        const content = await response.text()
        setPreviewContent(content)
        setPreviewFilename(filename)
      }
    } catch {
      // Ignore
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-1 text-sm font-semibold">URLs zum Scrapen</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Eine URL pro Zeile. Firecrawl extrahiert den Hauptinhalt als Markdown.
        </p>
        <Textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="https://www.deine-gesundheitswelt.de/pflege-und-betreuung/pflegegeld"
          rows={5}
          className="mb-3 font-mono text-xs"
          disabled={isRunning}
        />
        <Button
          onClick={handleScrape}
          disabled={isRunning || urls.trim().length === 0}
          size="sm"
          className="gap-2"
        >
          {isRunning ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Scraping...
            </>
          ) : (
            <>
              <Play className="size-3.5" />
              Scrapen
            </>
          )}
        </Button>
      </div>

      {/* Progress */}
      {items.length > 0 && (
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-medium text-muted-foreground">
            Fortschritt ({items.filter((i) => i.status === "done").length}/{items.length})
          </h4>
          {items.map((item) => (
            <div
              key={item.url}
              className="flex items-center gap-2 rounded border px-3 py-2 text-xs"
            >
              {item.status === "pending" && (
                <span className="size-4 rounded-full border border-muted-foreground/30" />
              )}
              {item.status === "scraping" && (
                <Loader2 className="size-4 animate-spin text-primary" />
              )}
              {item.status === "done" && <Check className="size-4 text-green-600" />}
              {item.status === "error" && <X className="size-4 text-destructive" />}
              <span className="flex-1 truncate font-mono">{item.url}</span>
              {item.status === "error" && (
                <span className="text-destructive">{item.error}</span>
              )}
              {item.status === "done" && item.filename && (
                <span className="text-muted-foreground">{item.filename}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Existing files */}
      {step.files.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Vorhandene Dateien ({step.files.length})
          </h4>
          <div className="flex flex-col gap-1">
            {step.files.map((file) => (
              <button
                key={file.path}
                onClick={() => loadFilePreview(file.path, file.name)}
                className="flex items-center gap-2 rounded border px-3 py-2 text-left text-xs transition-colors hover:bg-accent"
              >
                <FileText className="size-3.5 text-muted-foreground" />
                <span className="flex-1 truncate font-mono">{file.name}</span>
                <span className="text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* File preview */}
      {previewContent && (
        <div className="rounded border p-4">
          <FilePreview content={previewContent} filename={previewFilename} />
        </div>
      )}
    </div>
  )
}
