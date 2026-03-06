"use client"

import { useState } from "react"
import { FileText, ArrowRight, Check, Loader2, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ClusterPipelineStep } from "@/types/cluster-pipeline"
import type { PipelineFile } from "@/types/pipeline"

interface StepReviewProps {
  step: ClusterPipelineStep
  syntheseFiles: PipelineFile[]
  cluster: string
  onComplete: () => void
}

export function StepReview({ step, syntheseFiles, cluster, onComplete }: StepReviewProps) {
  const [isCopying, setIsCopying] = useState<string | null>(null)

  async function handleCopyToReview(file: PipelineFile) {
    setIsCopying(file.path)
    try {
      // Read from synthese
      const readRes = await fetch(`/api/cluster-pipeline/files?path=${encodeURIComponent(file.path)}`)
      if (!readRes.ok) return

      const content = await readRes.text()

      // Write to review (same filename)
      const reviewPath = file.path.replace("/synthese/", "/review/")
      const writeRes = await fetch(`/api/cluster-pipeline/files?path=${encodeURIComponent(reviewPath)}`, {
        method: "PUT",
        headers: { "Content-Type": "text/markdown" },
        body: content,
      })

      if (writeRes.ok) {
        onComplete()
      }
    } catch {
      // ignore
    } finally {
      setIsCopying(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3 rounded border border-dashed p-4">
        <Terminal className="mt-0.5 size-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Review & Freigabe</p>
          <p className="text-xs text-muted-foreground">
            Uebernimm das Synthese-Ergebnis in den Review-Ordner und pruefe es dort.
            Aendere den Status im YAML-Frontmatter von <code className="rounded bg-muted px-1">entwurf</code> auf{" "}
            <code className="rounded bg-muted px-1">geprueft</code> oder{" "}
            <code className="rounded bg-muted px-1">freigegeben</code>.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Inhaltliche Korrektheit (stimmen Betraege und Voraussetzungen?)</li>
            <li>Vollstaendigkeit (fehlen wichtige Themen?)</li>
            <li>Keine Halluzinationen (hat das LLM etwas erfunden?)</li>
            <li>Strukturelle Logik (ist die Gliederung nachvollziehbar?)</li>
          </ul>
        </div>
      </div>

      {syntheseFiles.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Synthese-Dateien ({syntheseFiles.length})
          </h4>
          <div className="flex flex-col gap-1">
            {syntheseFiles.map((file) => (
              <div key={file.path} className="flex items-center gap-2 rounded border px-3 py-2 text-xs">
                <FileText className="size-3.5 text-muted-foreground" />
                <span className="flex-1 truncate font-mono">{file.name}</span>
                <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 gap-1 px-2 text-xs"
                  onClick={() => handleCopyToReview(file)}
                  disabled={isCopying !== null}
                >
                  {isCopying === file.path ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <ArrowRight className="size-3" />
                  )}
                  In Review uebernehmen
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step.files.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Review-Dateien ({step.files.length})
          </h4>
          <div className="flex flex-col gap-1">
            {step.files.map((file) => (
              <div key={file.path} className="flex items-center gap-2 rounded border px-3 py-2 text-xs">
                <Check className="size-3.5 text-green-600" />
                <span className="flex-1 truncate font-mono">{file.name}</span>
                <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {syntheseFiles.length === 0 && step.files.length === 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Keine Synthese-Dateien vorhanden. Zuerst die vorherigen Schritte abschliessen.
        </p>
      )}
    </div>
  )
}
