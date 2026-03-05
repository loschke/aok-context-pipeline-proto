"use client"

import { FileText, Clock } from "lucide-react"
import Link from "next/link"

import type { ClusterSummary } from "@/types/pipeline-v2"

interface ClusterCardProps {
  cluster: ClusterSummary
}

export function ClusterCard({ cluster }: ClusterCardProps) {
  const progress = Math.round((cluster.completedSteps / 8) * 100)
  const lastModified = cluster.lastModified
    ? new Date(cluster.lastModified).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null

  return (
    <Link
      href={`/pipeline-v2/${cluster.name}`}
      className="group flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50"
    >
      <div>
        <h3 className="font-semibold group-hover:text-primary">
          {cluster.displayName}
        </h3>
        <p className="text-xs text-muted-foreground font-mono">{cluster.name}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{cluster.completedSteps}/8 Steps</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div
            className="h-1.5 rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <FileText className="size-3" />
          {cluster.totalFiles} Dateien
        </span>
        {lastModified && (
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {lastModified}
          </span>
        )}
      </div>
    </Link>
  )
}
