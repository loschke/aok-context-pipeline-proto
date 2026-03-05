"use client"

import { useState, useCallback } from "react"
import { Sparkles, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PipelineStepV2 } from "@/types/pipeline-v2"
import type { PipelineFile } from "@/types/pipeline"
import { SourceFileSelector } from "@/components/pipeline/shared/source-file-selector"
import { StreamingOutput } from "@/components/pipeline/shared/streaming-output"

interface StepConsolidateV2Props {
  step: PipelineStepV2
  groupedFiles: PipelineFile[]
  cluster: string
  onComplete: () => void
}

export function StepConsolidateV2({ step, groupedFiles, cluster, onComplete }: StepConsolidateV2Props) {
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
    if (selectedFiles.size === groupedFiles.length) setSelectedFiles(new Set())
    else setSelectedFiles(new Set(groupedFiles.map((f) => f.path)))
  }

  const handleConsolidate = useCallback(async () => {
    if (selectedFiles.size === 0) return
    setIsRunning(true)
    setIsAnimating(true)
    setStreamContent("")

    try {
      const response = await fetch("/api/pipeline-v2/consolidate", {
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
        label="Gruppierte Dateien aus Schritt 5"
        description="Waehle die Dateien fuer die Konsolidierung."
        emptyMessage="Keine Dateien aus Schritt 5 vorhanden."
        files={groupedFiles}
        selectedFiles={selectedFiles}
        onToggle={toggleFile}
        onSelectAll={selectAll}
        disabled={isRunning}
      />

      <Button
        onClick={handleConsolidate}
        disabled={isRunning || selectedFiles.size === 0}
        size="sm"
        className="gap-2 self-start"
      >
        {isRunning ? (
          <><Loader2 className="size-3.5 animate-spin" />Konsolidiere...</>
        ) : (
          <><Sparkles className="size-3.5" />Konsolidieren</>
        )}
      </Button>

      <StreamingOutput
        content={streamContent}
        isRunning={isRunning}
        isAnimating={isAnimating}
        label="Konsolidierung"
      />
    </div>
  )
}
