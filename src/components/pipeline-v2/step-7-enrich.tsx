"use client"

import { useState, useCallback } from "react"
import { Sparkles, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PipelineStepV2 } from "@/types/pipeline-v2"
import type { PipelineFile } from "@/types/pipeline"
import { SourceFileSelector } from "@/components/pipeline/shared/source-file-selector"
import { StreamingOutput } from "@/components/pipeline/shared/streaming-output"

interface StepEnrichV2Props {
  step: PipelineStepV2
  consolidatedFiles: PipelineFile[]
  cluster: string
  onComplete: () => void
}

export function StepEnrichV2({ step, consolidatedFiles, cluster, onComplete }: StepEnrichV2Props) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [isRunning, setIsRunning] = useState(false)
  const [streamContent, setStreamContent] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  function toggleFile(path: string) {
    setSelectedFiles((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  function selectAll() {
    if (selectedFiles.size === consolidatedFiles.length) setSelectedFiles(new Set())
    else setSelectedFiles(new Set(consolidatedFiles.map((f) => f.path)))
  }

  const handleEnrich = useCallback(async () => {
    if (selectedFiles.size === 0) return
    setIsRunning(true)
    setIsAnimating(true)
    setStreamContent("")

    try {
      const response = await fetch("/api/pipeline-v2/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceFiles: Array.from(selectedFiles), cluster }),
      })

      if (!response.ok) {
        setStreamContent(`Fehler: ${await response.text()}`)
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
        fullText += decoder.decode(value, { stream: true })
        setStreamContent(fullText)
      }

      setIsAnimating(false)
      onComplete()
    } catch (err) {
      setStreamContent(`Fehler: ${err instanceof Error ? err.message : "Verbindungsfehler"}`)
    } finally {
      setIsRunning(false)
      setIsAnimating(false)
    }
  }, [selectedFiles, cluster, onComplete])

  return (
    <div className="flex flex-col gap-6">
      <SourceFileSelector
        label="Konsolidierte Dateien aus Schritt 6"
        description="Waehle die Dateien fuer die Kontext-Anreicherung."
        emptyMessage="Keine Dateien aus Schritt 6 vorhanden."
        files={consolidatedFiles}
        selectedFiles={selectedFiles}
        onToggle={toggleFile}
        onSelectAll={selectAll}
        disabled={isRunning}
      />

      <Button
        onClick={handleEnrich}
        disabled={isRunning || selectedFiles.size === 0}
        size="sm"
        className="gap-2 self-start"
      >
        {isRunning ? (
          <><Loader2 className="size-3.5 animate-spin" />Reichere an...</>
        ) : (
          <><Sparkles className="size-3.5" />Anreichern</>
        )}
      </Button>

      <StreamingOutput
        content={streamContent}
        isRunning={isRunning}
        isAnimating={isAnimating}
        label="Kontext-Anreicherung"
      />
    </div>
  )
}
