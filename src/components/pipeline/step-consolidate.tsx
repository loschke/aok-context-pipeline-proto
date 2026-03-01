"use client"

import { useState, useCallback } from "react"
import { Sparkles, FileText, Loader2, CheckCircle2 } from "lucide-react"
import { Streamdown } from "streamdown"
import { code } from "@streamdown/code"

import { Button } from "@/components/ui/button"
import type { PipelineStep } from "@/types/pipeline"
import { FilePreview } from "./file-preview"

const streamdownPlugins = { code }

interface StepConsolidateProps {
  step: PipelineStep
  /** Files from step 2 (bausteine) */
  bausteinFiles: { name: string; path: string; size: number }[]
  /** Files from step 3 (taxonomie) */
  taxonomyFiles: { name: string; path: string; size: number }[]
  batch: string
  onComplete: () => void
}

export function StepConsolidate({
  step,
  bausteinFiles,
  taxonomyFiles,
  batch,
  onComplete,
}: StepConsolidateProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [streamContent, setStreamContent] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [previewFilename, setPreviewFilename] = useState<string>("")

  const hasBausteine = bausteinFiles.length > 0
  const hasTaxonomy = taxonomyFiles.length > 0
  const canRun = hasBausteine && hasTaxonomy && !isRunning

  const handleConsolidate = useCallback(async () => {
    if (!canRun) return

    setIsRunning(true)
    setIsAnimating(true)
    setStreamContent("")
    setPreviewContent(null)

    try {
      const response = await fetch("/api/pipeline/consolidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bausteinFiles: bausteinFiles.map((f) => f.path),
          taxonomyFile: taxonomyFiles[0].path,
          batch,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setStreamContent(`Fehler: ${errorText}`)
        setIsRunning(false)
        setIsAnimating(false)
        return
      }

      const reader = response.body?.getReader()
      if (!reader) return

      const decoder = new TextDecoder()
      let fullText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        setStreamContent(fullText)
      }

      setIsAnimating(false)
      onComplete()
    } catch (err) {
      setStreamContent(
        `Fehler: ${err instanceof Error ? err.message : "Verbindungsfehler"}`
      )
    } finally {
      setIsRunning(false)
      setIsAnimating(false)
    }
  }, [canRun, bausteinFiles, taxonomyFiles, batch, onComplete])

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
      {/* Input overview */}
      <div className="flex flex-col gap-4">
        {/* Baustein input */}
        <div>
          <h3 className="mb-1 text-sm font-semibold flex items-center gap-2">
            Bausteine aus Schritt 2
            {hasBausteine && <CheckCircle2 className="size-3.5 text-primary" />}
          </h3>
          {hasBausteine ? (
            <div className="flex flex-col gap-1">
              {bausteinFiles.map((file) => (
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
          ) : (
            <p className="rounded border border-dashed p-3 text-center text-xs text-muted-foreground">
              Keine Baustein-Dateien vorhanden. Zuerst Schritt 2 ausfuehren.
            </p>
          )}
        </div>

        {/* Taxonomy input */}
        <div>
          <h3 className="mb-1 text-sm font-semibold flex items-center gap-2">
            Taxonomie aus Schritt 3
            {hasTaxonomy && <CheckCircle2 className="size-3.5 text-primary" />}
          </h3>
          {hasTaxonomy ? (
            <div className="flex flex-col gap-1">
              {taxonomyFiles.map((file) => (
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
          ) : (
            <p className="rounded border border-dashed p-3 text-center text-xs text-muted-foreground">
              Keine Taxonomie vorhanden. Zuerst Schritt 3 ausfuehren.
            </p>
          )}
        </div>

        <Button
          onClick={handleConsolidate}
          disabled={!canRun}
          size="sm"
          className="gap-2 self-start"
        >
          {isRunning ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Konsolidiere...
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" />
              Konsolidieren
            </>
          )}
        </Button>
      </div>

      {/* Streaming output */}
      {(isRunning || streamContent) && (
        <div className="rounded border p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            {isRunning && <Loader2 className="size-3 animate-spin" />}
            Konsolidierung {isRunning ? "(laeuft...)" : "(abgeschlossen)"}
          </h4>
          <Streamdown
            className="pipeline-prose max-h-[500px] overflow-y-auto text-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            plugins={streamdownPlugins}
            isAnimating={isAnimating}
          >
            {streamContent}
          </Streamdown>
        </div>
      )}

      {/* Existing consolidation files */}
      {step.files.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Vorhandene Konsolidierung ({step.files.length})
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
