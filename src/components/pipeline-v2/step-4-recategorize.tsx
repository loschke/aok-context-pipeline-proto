"use client"

import { useState, useCallback } from "react"
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PipelineStepV2 } from "@/types/pipeline-v2"
import type { PipelineFile } from "@/types/pipeline"
import { StreamingOutput } from "@/components/pipeline/shared/streaming-output"

interface StepRecategorizeV2Props {
  step: PipelineStepV2
  bausteinFiles: PipelineFile[]
  taxonomyFiles: PipelineFile[]
  cluster: string
  onComplete: () => void
}

export function StepRecategorizeV2({
  step,
  bausteinFiles,
  taxonomyFiles,
  cluster,
  onComplete,
}: StepRecategorizeV2Props) {
  const [isRunning, setIsRunning] = useState(false)
  const [streamContent, setStreamContent] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const hasBausteine = bausteinFiles.length > 0
  const hasTaxonomy = taxonomyFiles.length > 0
  const canRun = hasBausteine && hasTaxonomy && !isRunning

  const handleRecategorize = useCallback(async () => {
    if (!canRun) return
    setIsRunning(true)
    setIsAnimating(true)
    setStreamContent("")

    try {
      const response = await fetch("/api/pipeline-v2/recategorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bausteinFiles: bausteinFiles.map((f) => f.path),
          taxonomyFile: taxonomyFiles[0].path,
          cluster,
        }),
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
  }, [canRun, bausteinFiles, taxonomyFiles, cluster, onComplete])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className={`size-4 ${hasBausteine ? "text-primary" : "text-muted-foreground"}`} />
          <span>Bausteine aus Schritt 2 ({bausteinFiles.length} Dateien)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className={`size-4 ${hasTaxonomy ? "text-primary" : "text-muted-foreground"}`} />
          <span>Taxonomie aus Schritt 3 ({taxonomyFiles.length} Dateien)</span>
        </div>
      </div>

      <Button
        onClick={handleRecategorize}
        disabled={!canRun}
        size="sm"
        className="gap-2 self-start"
      >
        {isRunning ? (
          <><Loader2 className="size-3.5 animate-spin" />Re-Kategorisiere...</>
        ) : (
          <><Sparkles className="size-3.5" />Re-Kategorisieren</>
        )}
      </Button>

      <StreamingOutput
        content={streamContent}
        isRunning={isRunning}
        isAnimating={isAnimating}
        label="Re-Kategorisierung"
      />
    </div>
  )
}
