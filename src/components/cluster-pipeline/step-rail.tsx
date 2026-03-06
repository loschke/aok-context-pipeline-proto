"use client"

import { cn } from "@/lib/utils"
import type { ClusterPipelineStep } from "@/types/cluster-pipeline"

interface StepRailProps {
  steps: ClusterPipelineStep[]
  activeStep: number
  onStepClick: (stepId: number) => void
}

const statusColors: Record<string, string> = {
  locked: "bg-muted text-muted-foreground",
  ready: "bg-primary/10 text-primary border border-primary/30",
  running: "bg-primary text-primary-foreground animate-pulse",
  completed: "bg-primary text-primary-foreground",
  error: "bg-destructive text-destructive-foreground",
}

export function StepRail({ steps, activeStep, onStepClick }: StepRailProps) {
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
    </nav>
  )
}
