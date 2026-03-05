"use client"

import { useState, useEffect } from "react"
import { Pencil, Save, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ConfigCardProps {
  title: string
  description: string
  filename: string
  cluster: string
}

export function ConfigCard({ title, description, filename, cluster }: ConfigCardProps) {
  const [content, setContent] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const filePath = `${cluster}/_config/${filename}`
  const isDirty = editedContent !== null && editedContent !== content

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`/api/pipeline-v2/files?path=${encodeURIComponent(filePath)}`)
        if (response.ok) {
          const text = await response.text()
          setContent(text)
        } else {
          setContent("")
        }
      } catch {
        setContent("")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [filePath])

  async function handleSave() {
    if (editedContent === null) return
    setIsSaving(true)
    try {
      const response = await fetch(`/api/pipeline-v2/files?path=${encodeURIComponent(filePath)}`, {
        method: "PUT",
        headers: { "Content-Type": "text/markdown" },
        body: editedContent,
      })
      if (response.ok) {
        setContent(editedContent)
        setEditedContent(null)
        setIsEditing(false)
      }
    } catch {
      // ignore
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-1">
          {isDirty && (
            <Button size="sm" className="h-7 gap-1 px-2" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="size-3 animate-spin" /> : <Save className="size-3" />}
              <span className="text-xs">Speichern</span>
            </Button>
          )}
          <Button
            size="sm"
            variant={isEditing ? "default" : "ghost"}
            className="h-7 gap-1 px-2"
            onClick={() => {
              if (isEditing && !isDirty) {
                setIsEditing(false)
              } else {
                setIsEditing(true)
                if (editedContent === null) setEditedContent(content || "")
              }
            }}
          >
            <Pencil className="size-3" />
            <span className="text-xs">{isEditing ? "Fertig" : "Bearbeiten"}</span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-4 text-xs text-muted-foreground">
          Laden...
        </div>
      ) : isEditing ? (
        <textarea
          value={editedContent ?? content ?? ""}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[120px] w-full rounded border bg-muted/30 p-3 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={`${filename} Inhalt...`}
        />
      ) : (
        <div className="min-h-[40px] whitespace-pre-wrap rounded bg-muted/30 p-3 font-mono text-xs text-muted-foreground">
          {content || <span className="italic">Noch nicht konfiguriert.</span>}
        </div>
      )}
    </div>
  )
}
