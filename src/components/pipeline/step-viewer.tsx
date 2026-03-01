"use client"

import { useState } from "react"
import { FileText, Terminal } from "lucide-react"

import type { PipelineStep } from "@/types/pipeline"
import { FilePreview } from "./file-preview"

interface StepViewerProps {
  step: PipelineStep
}

export function StepViewer({ step }: StepViewerProps) {
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [previewFilename, setPreviewFilename] = useState<string>("")

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
      <div className="flex items-start gap-3 rounded border border-dashed p-4">
        <Terminal className="mt-0.5 size-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Dieser Schritt wird aktuell ueber CLI ausgefuehrt.</p>
          <p className="text-xs text-muted-foreground">
            Vorhandene Ergebnisse koennen hier eingesehen werden.
          </p>
        </div>
      </div>

      {step.files.length > 0 ? (
        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Dateien ({step.files.length})
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
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          Keine Dateien fuer diesen Schritt vorhanden.
        </p>
      )}

      {previewContent && (
        <div className="rounded border p-4">
          <FilePreview content={previewContent} filename={previewFilename} />
        </div>
      )}
    </div>
  )
}
