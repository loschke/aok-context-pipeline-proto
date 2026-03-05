"use client"

import { useState, useCallback } from "react"
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PipelineStepV2 } from "@/types/pipeline-v2"
import type { PipelineFile } from "@/types/pipeline"
import { StreamingOutput } from "@/components/pipeline/shared/streaming-output"

interface StepConsolidateV2Props {
  step: PipelineStepV2
  groupedFiles: PipelineFile[]
  bausteinFiles: PipelineFile[]
  cluster: string
  onComplete: () => void
}

export function StepConsolidateV2({ step, groupedFiles, bausteinFiles, cluster, onComplete }: StepConsolidateV2Props) {
  const [isRunning, setIsRunning] = useState(false)
  const [streamContent, setStreamContent] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const hasGrouped = groupedFiles.length > 0
  const hasBausteine = bausteinFiles.length > 0
  const canRun = hasGrouped && hasBausteine && !isRunning

  const handleConsolidate = useCallback(async () => {
    if (!canRun) return
    setIsRunning(true)
    setIsAnimating(true)
    setStreamContent("")

    try {
      const response = await fetch("/api/pipeline-v2/consolidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceFiles: groupedFiles.map((f) => f.path),
          bausteinFiles: bausteinFiles.map((f) => f.path),
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
  }, [canRun, groupedFiles, bausteinFiles, cluster, onComplete])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className={`size-4 ${hasBausteine ? "text-primary" : "text-muted-foreground"}`} />
          <span>Bausteine aus Schritt 2 ({bausteinFiles.length} Dateien)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className={`size-4 ${hasGrouped ? "text-primary" : "text-muted-foreground"}`} />
          <span>Gruppierung aus Schritt 5 ({groupedFiles.length} Dateien)</span>
        </div>
      </div>

      <Button
        onClick={handleConsolidate}
        disabled={!canRun}
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
