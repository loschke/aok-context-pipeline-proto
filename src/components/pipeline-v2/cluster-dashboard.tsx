"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ClusterSummary } from "@/types/pipeline-v2"
import { ClusterCard } from "./cluster-card"

interface ClusterDashboardProps {
  initialClusters: ClusterSummary[]
}

export function ClusterDashboard({ initialClusters }: ClusterDashboardProps) {
  const router = useRouter()
  const [clusters, setClusters] = useState(initialClusters)
  const [isCreating, setIsCreating] = useState(false)
  const [newName, setNewName] = useState("")
  const [error, setError] = useState("")

  async function handleDelete(name: string) {
    try {
      const response = await fetch(`/api/pipeline-v2/state?cluster=${encodeURIComponent(name)}`, {
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
      const response = await fetch("/api/pipeline-v2/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        const text = await response.text()
        setError(text)
        return
      }

      const summary = (await response.json()) as ClusterSummary
      setClusters((prev) => [...prev, summary].sort((a, b) => a.name.localeCompare(b.name)))
      setNewName("")
      setIsCreating(false)
      setError("")
      router.push(`/pipeline-v2/${name}`)
    } catch {
      setError("Fehler beim Erstellen")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Baustein-Pipeline<span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            8-Step Pipeline: Content zu atomaren Wissensbausteinen mit Frontmatter-Metadaten
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((cluster) => (
          <ClusterCard key={cluster.name} cluster={cluster} onDelete={handleDelete} />
        ))}

        {/* Create new cluster */}
        {isCreating ? (
          <div className="flex flex-col gap-3 rounded-lg border border-dashed p-4">
            <h3 className="text-sm font-semibold">Neuer Content Cluster</h3>
            <Input
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value)
                setError("")
              }}
              placeholder="z.B. schwangerschaft"
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
            Neuer Content Cluster
          </button>
        )}
      </div>
    </div>
  )
}
