"use client"

import { useState } from "react"
import { FileText, Clock, Trash2 } from "lucide-react"
import Link from "next/link"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { ClusterSummary } from "@/types/pipeline-v2"

interface ClusterCardProps {
  cluster: ClusterSummary
  onDelete?: (name: string) => void
}

export function ClusterCard({ cluster, onDelete }: ClusterCardProps) {
  const [open, setOpen] = useState(false)
  const progress = Math.round((cluster.completedSteps / 8) * 100)
  const lastModified = cluster.lastModified
    ? new Date(cluster.lastModified).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null

  return (
    <div className="group relative flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50">
      <Link
        href={`/pipeline-v2/${cluster.name}`}
        className="absolute inset-0 z-0"
      />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold group-hover:text-primary">
            {cluster.displayName}
          </h3>
          <p className="text-xs text-muted-foreground font-mono">{cluster.name}</p>
        </div>

        {onDelete && (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative z-10 size-7 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>Cluster loeschen?</AlertDialogTitle>
                <AlertDialogDescription>
                  Der Cluster <span className="font-mono font-semibold">{cluster.name}</span> und alle
                  zugehoerigen Dateien ({cluster.totalFiles} Dateien) werden unwiderruflich geloescht.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => onDelete(cluster.name)}
                >
                  Loeschen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
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
    </div>
  )
}
