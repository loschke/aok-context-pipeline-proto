"use client"

import { useState, useCallback } from "react"
import { Sparkles, FileText, Loader2 } from "lucide-react"
import { Streamdown } from "streamdown"
import { code } from "@streamdown/code"

import { Button } from "@/components/ui/button"
import type { PipelineStep } from "@/types/pipeline"
import { FilePreview } from "./file-preview"

const streamdownPlugins = { code }

interface StepTaxonomizeProps {
  step: PipelineStep
  /** Files from step 2 (bausteine) to use as source */
  bausteinFiles: { name: string; path: string; size: number }[]
  batch: string
  onComplete: () => void
}

export function StepTaxonomize({ step, bausteinFiles, batch, onComplete }: StepTaxonomizeProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [isRunning, setIsRunning] = useState(false)
  const [streamContent, setStreamContent] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [previewFilename, setPreviewFilename] = useState<string>("")

  function toggleFile(path: string) {
    setSelectedFiles((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  function selectAll() {
    if (selectedFiles.size === bausteinFiles.length) {
      setSelectedFiles(new Set())
    } else {
      setSelectedFiles(new Set(bausteinFiles.map((f) => f.path)))
    }
  }

  const handleTaxonomize = useCallback(async () => {
    if (selectedFiles.size === 0) return

    setIsRunning(true)
    setIsAnimating(true)
    setStreamContent("")
    setPreviewContent(null)

    try {
      const response = await fetch("/api/pipeline/taxonomize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceFiles: Array.from(selectedFiles),
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
  }, [selectedFiles, batch, onComplete])

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
      {/* Source file selection */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Baustein-Dateien aus Schritt 2</h3>
            <p className="text-xs text-muted-foreground">
              Waehle die Baustein-Dateien fuer die Taxonomie-Analyse.
            </p>
          </div>
          {bausteinFiles.length > 0 && (
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={selectAll}>
              {selectedFiles.size === bausteinFiles.length ? "Keine" : "Alle"} auswaehlen
            </Button>
          )}
        </div>

        {bausteinFiles.length === 0 ? (
          <p className="rounded border border-dashed p-4 text-center text-xs text-muted-foreground">
            Keine Baustein-Dateien aus Schritt 2 vorhanden. Zuerst Bausteine extrahieren.
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {bausteinFiles.map((file) => (
              <label
                key={file.path}
                className="flex cursor-pointer items-center gap-2 rounded border px-3 py-2 text-xs transition-colors hover:bg-accent"
              >
                <input
                  type="checkbox"
                  checked={selectedFiles.has(file.path)}
                  onChange={() => toggleFile(file.path)}
                  className="size-3.5 rounded border-muted-foreground/30"
                  disabled={isRunning}
                />
                <FileText className="size-3.5 text-muted-foreground" />
                <span className="flex-1 truncate font-mono">{file.name}</span>
                <span className="text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </label>
            ))}
          </div>
        )}

        <Button
          onClick={handleTaxonomize}
          disabled={isRunning || selectedFiles.size === 0}
          size="sm"
          className="mt-3 gap-2"
        >
          {isRunning ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Analysiere...
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" />
              Taxonomie erstellen
            </>
          )}
        </Button>
      </div>

      {/* Streaming output */}
      {(isRunning || streamContent) && (
        <div className="rounded border p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            {isRunning && <Loader2 className="size-3 animate-spin" />}
            Taxonomie-Analyse {isRunning ? "(laeuft...)" : "(abgeschlossen)"}
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

      {/* Existing taxonomy files */}
      {step.files.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Vorhandene Taxonomie ({step.files.length})
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
