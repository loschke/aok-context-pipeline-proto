"use client"

import { Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PipelineStepV2 } from "@/types/pipeline-v2"

interface StepRailV2Props {
  steps: PipelineStepV2[]
  activeStep: number | "config"
  onStepClick: (stepId: number | "config") => void
}

const statusColors: Record<string, string> = {
  locked: "bg-muted text-muted-foreground",
  ready: "bg-primary/10 text-primary border border-primary/30",
  running: "bg-primary text-primary-foreground animate-pulse",
  completed: "bg-primary text-primary-foreground",
  error: "bg-destructive text-destructive-foreground",
}

export function StepRailV2({ steps, activeStep, onStepClick }: StepRailV2Props) {
  return (
    <nav className="flex flex-col gap-1">
      {steps.map((step) => {
        const isActive = step.id === activeStep
        const isClickable = step.status !== "locked"

        return (
          <button
            key={step.id}
            onClick={() => isClickable && onStepClick(step.id)}
            disabled={!isClickable}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
              isActive ? "bg-accent" : "hover:bg-accent/50",
              !isClickable && "cursor-not-allowed opacity-50"
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded text-xs font-bold tabular-nums",
                statusColors[step.status]
              )}
            >
              {step.id}
            </span>
            <span className={cn("truncate", isActive && "font-medium")}>
              {step.name}
            </span>
            {step.files.length > 0 && (
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                {step.files.length}
              </span>
            )}
          </button>
        )
      })}

      {/* Separator + Config */}
      <div className="my-1 border-t" />
      <button
        onClick={() => onStepClick("config")}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
          activeStep === "config" ? "bg-accent" : "hover:bg-accent/50"
        )}
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
          <Settings className="size-3.5" />
        </span>
        <span className={cn("truncate", activeStep === "config" && "font-medium")}>
          Config
        </span>
      </button>
    </nav>
  )
}
