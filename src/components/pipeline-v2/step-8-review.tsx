"use client"

import { Terminal, FileText } from "lucide-react"

import type { PipelineStepV2 } from "@/types/pipeline-v2"

interface StepReviewV2Props {
  step: PipelineStepV2
  cluster: string
}

export function StepReviewV2({ step }: StepReviewV2Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3 rounded border border-dashed p-4">
        <Terminal className="mt-0.5 size-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">QS durch AOK-Fachexperten</p>
          <p className="text-xs text-muted-foreground">
            Dieser Schritt ist fuer die manuelle Pruefung durch AOK-Fachexperten.
            Dateien koennen ueber den FileTree links eingesehen und bearbeitet werden.
          </p>
        </div>
      </div>

      {step.files.length > 0 ? (
        <div>
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            QS-Dateien ({step.files.length})
          </h4>
          <div className="flex flex-col gap-1">
            {step.files.map((file) => (
              <div key={file.path} className="flex items-center gap-2 rounded border px-3 py-2 text-xs">
                <FileText className="size-3.5 text-muted-foreground" />
                <span className="flex-1 truncate font-mono">{file.name}</span>
                <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          Keine QS-Dateien vorhanden. Zuerst die vorherigen Schritte abschliessen.
        </p>
      )}
    </div>
  )
}
