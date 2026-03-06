"use client"

import { useState } from "react"
import { Plus, FileText, Clock, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import type { ClusterPipelineSummary } from "@/types/cluster-pipeline"

interface ClusterPipelineDashboardProps {
  initialClusters: ClusterPipelineSummary[]
}

export function ClusterPipelineDashboard({ initialClusters }: ClusterPipelineDashboardProps) {
  const router = useRouter()
  const [clusters, setClusters] = useState(initialClusters)
  const [isCreating, setIsCreating] = useState(false)
  const [newName, setNewName] = useState("")
  const [error, setError] = useState("")

  async function handleDelete(name: string) {
    try {
      const response = await fetch(`/api/cluster-pipeline/state?cluster=${encodeURIComponent(name)}`, {
        method: "DELETE",
      })
      if (!response.ok) return
      setClusters((prev) => prev.filter((c) => c.name !== name))
    } catch {
      // ignore
    }
  }

  async function handleCreate() {
    const name = newName.trim().toLowerCase().replace(/\s+/g, "-")
    if (!name) return

    if (!/^[a-z0-9-]+$/.test(name)) {
      setError("Nur Kleinbuchstaben, Zahlen und Bindestriche.")
      return
    }

    try {
      const response = await fetch("/api/cluster-pipeline/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        const text = await response.text()
        setError(text)
        return
      }

      const summary = (await response.json()) as ClusterPipelineSummary
      setClusters((prev) => [...prev, summary].sort((a, b) => a.name.localeCompare(b.name)))
      setNewName("")
      setIsCreating(false)
      setError("")
      router.push(`/cluster-pipeline/${name}`)
    } catch {
      setError("Fehler beim Erstellen")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Cluster Pipeline<span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Webseiten-Cluster zu LLM-optimierten Markdown-Dokumenten transformieren
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((cluster) => (
          <ClusterPipelineCard key={cluster.name} cluster={cluster} onDelete={handleDelete} />
        ))}

        {/* Create new cluster */}
        {isCreating ? (
          <div className="flex flex-col gap-3 rounded-lg border border-dashed p-4">
            <h3 className="text-sm font-semibold">Neuer Cluster</h3>
            <Input
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value)
                setError("")
              }}
              placeholder="z.B. pflege"
              className="font-mono text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
            />
            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate} disabled={!newName.trim()}>
                Erstellen
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsCreating(false)
                  setNewName("")
                  setError("")
                }}
              >
                Abbrechen
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
          >
            <Plus className="size-4" />
            Neuer Cluster
          </button>
        )}
      </div>
    </div>
  )
}

function ClusterPipelineCard({
  cluster,
  onDelete,
}: {
  cluster: ClusterPipelineSummary
  onDelete: (name: string) => void
}) {
  const [open, setOpen] = useState(false)
  const progress = Math.round((cluster.completedSteps / 4) * 100)
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
        href={`/cluster-pipeline/${cluster.name}`}
        className="absolute inset-0 z-0"
      />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold group-hover:text-primary">
            {cluster.displayName}
          </h3>
          <p className="text-xs text-muted-foreground font-mono">{cluster.name}</p>
        </div>

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
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{cluster.completedSteps}/4 Steps</span>
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
