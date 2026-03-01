"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface BatchSelectorProps {
  batches: string[]
  activeBatch: string
  onBatchChange: (batch: string) => void
}

export function BatchSelector({ batches, activeBatch, onBatchChange }: BatchSelectorProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newBatchName, setNewBatchName] = useState("")

  // Filter to only show "batch-*" directories (not legacy schritt-X)
  const batchDirs = batches.filter((b) => b.startsWith("batch-"))
  const legacyDirs = batches.filter((b) => b.startsWith("schritt-"))

  function handleCreate() {
    const name = newBatchName.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-")
    if (!name) return
    const batchName = name.startsWith("batch-") ? name : `batch-${name}`
    onBatchChange(batchName)
    setNewBatchName("")
    setIsCreating(false)
  }

  if (isCreating) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={newBatchName}
          onChange={(e) => setNewBatchName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreate()
            if (e.key === "Escape") setIsCreating(false)
          }}
          placeholder="batch-name"
          className="h-8 w-40 text-sm"
          autoFocus
        />
        <Button size="sm" variant="outline" className="h-8" onClick={handleCreate}>
          Erstellen
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8"
          onClick={() => setIsCreating(false)}
        >
          Abbrechen
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={activeBatch} onValueChange={onBatchChange}>
        <SelectTrigger className="h-8 w-48 text-sm">
          <SelectValue placeholder="Batch waehlen..." />
        </SelectTrigger>
        <SelectContent>
          {batchDirs.length > 0 && (
            <>
              {batchDirs.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </>
          )}
          {legacyDirs.length > 0 && (
            <>
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Pilot-Daten
              </div>
              {legacyDirs.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
      <Button
        size="sm"
        variant="outline"
        className="h-8 gap-1"
        onClick={() => setIsCreating(true)}
      >
        <Plus className="size-3.5" />
        Neuer Batch
      </Button>
    </div>
  )
}
