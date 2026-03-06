"use client"

import { useState, useCallback } from "react"
import { Sparkles, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ClusterPipelineStep } from "@/types/cluster-pipeline"
import type { PipelineFile } from "@/types/pipeline"
import { SourceFileSelector } from "@/components/pipeline/shared/source-file-selector"
import { StreamingOutput } from "@/components/pipeline/shared/streaming-output"

interface StepSyntheseProps {
  step: ClusterPipelineStep
  scrapingFiles: PipelineFile[]
  outlineFiles: PipelineFile[]
  cluster: string
  onComplete: () => void
}

export function StepSynthese({ step, scrapingFiles, outlineFiles, cluster, onComplete }: StepSyntheseProps) {
  const [selectedSourceFiles, setSelectedSourceFiles] = useState<Set<string>>(new Set())
  const [selectedOutlineFiles, setSelectedOutlineFiles] = useState<Set<string>>(new Set())
  const [isRunning, setIsRunning] = useState(false)
  const [streamContent, setStreamContent] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  function toggleSource(path: string) {
    setSelectedSourceFiles((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  function selectAllSources() {
    if (selectedSourceFiles.size === scrapingFiles.length) setSelectedSourceFiles(new Set())
    else setSelectedSourceFiles(new Set(scrapingFiles.map((f) => f.path)))
  }

  function toggleOutline(path: string) {
    setSelectedOutlineFiles((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  function selectAllOutlines() {
    if (selectedOutlineFiles.size === outlineFiles.length) setSelectedOutlineFiles(new Set())
    else setSelectedOutlineFiles(new Set(outlineFiles.map((f) => f.path)))
  }

  const handleSynthese = useCallback(async () => {
    if (selectedSourceFiles.size === 0 || selectedOutlineFiles.size === 0) return
    setIsRunning(true)
    setIsAnimating(true)
    setStreamContent("")

    try {
      const response = await fetch("/api/cluster-pipeline/synthese", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceFiles: Array.from(selectedSourceFiles),
          outlineFiles: Array.from(selectedOutlineFiles),
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
  }, [selectedSourceFiles, selectedOutlineFiles, cluster, onComplete])

  return (
    <div className="flex flex-col gap-6">
      <SourceFileSelector
        label="Rohseiten aus Schritt 1"
        description="Waehle die gescrapten Rohseiten als Datenbasis."
        emptyMessage="Keine Dateien aus Schritt 1 vorhanden."
        files={scrapingFiles}
        selectedFiles={selectedSourceFiles}
        onToggle={toggleSource}
        onSelectAll={selectAllSources}
        disabled={isRunning}
      />

      <SourceFileSelector
        label="Gliederung aus Schritt 2"
        description="Waehle die Outline-Datei als Strukturvorlage."
        emptyMessage="Keine Outline aus Schritt 2 vorhanden."
        files={outlineFiles}
        selectedFiles={selectedOutlineFiles}
        onToggle={toggleOutline}
        onSelectAll={selectAllOutlines}
        disabled={isRunning}
      />

      <Button
        onClick={handleSynthese}
        disabled={isRunning || selectedSourceFiles.size === 0 || selectedOutlineFiles.size === 0}
        size="sm"
        className="gap-2 self-start"
      >
        {isRunning ? (
          <><Loader2 className="size-3.5 animate-spin" />Synthese laeuft...</>
        ) : (
          <><Sparkles className="size-3.5" />Synthese starten</>
        )}
      </Button>

      <StreamingOutput
        content={streamContent}
        isRunning={isRunning}
        isAnimating={isAnimating}
        label="Cluster-Synthese"
      />
    </div>
  )
}
