"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Eye, Pencil, Save, Copy, Download, Loader2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FilePreview } from "@/components/pipeline/shared/file-preview"

const FileEditor = dynamic(
  () => import("./file-editor").then((mod) => ({ default: mod.FileEditor })),
  { ssr: false, loading: () => <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Editor wird geladen...</div> }
)

interface FileEditorPanelProps {
  filename: string
  stepDir: string
  content: string
  editedContent: string | null
  editMode: boolean
  isSaving: boolean
  onEditModeChange: (editMode: boolean) => void
  onContentChange: (content: string) => void
  onSave: () => void
  onBack: () => void
}

export function FileEditorPanel({
  filename,
  stepDir,
  content,
  editedContent,
  editMode,
  isSaving,
  onEditModeChange,
  onContentChange,
  onSave,
  onBack,
}: FileEditorPanelProps) {
  const [copied, setCopied] = useState(false)
  const isDirty = editedContent !== null && editedContent !== content
  const displayContent = editedContent ?? content
  const isMarkdown = filename.endsWith(".md")

  async function handleCopy() {
    await navigator.clipboard.writeText(displayContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([displayContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2" onClick={onBack}>
          <ArrowLeft className="size-3" />
          <span className="text-xs">Zurueck</span>
        </Button>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate font-mono text-xs">{filename}</span>
          <Badge variant="outline" className="shrink-0 text-[10px]">
            {stepDir}
          </Badge>
          {isDirty && (
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              Geaendert
            </Badge>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1">
          {isMarkdown && (
            <Button
              size="sm"
              variant={editMode ? "default" : "ghost"}
              className="h-7 gap-1 px-2"
              onClick={() => onEditModeChange(!editMode)}
            >
              {editMode ? <Eye className="size-3" /> : <Pencil className="size-3" />}
              <span className="text-xs">{editMode ? "Preview" : "Bearbeiten"}</span>
            </Button>
          )}
          {isDirty && (
            <Button
              size="sm"
              className="h-7 gap-1 px-2"
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <Save className="size-3" />
              )}
              <span className="text-xs">Speichern</span>
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-7 px-2" onClick={handleCopy}>
            <Copy className="size-3" />
            {copied && <span className="ml-1 text-xs">Kopiert</span>}
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2" onClick={handleDownload}>
            <Download className="size-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {editMode ? (
          <FileEditor value={displayContent} onChange={onContentChange} />
        ) : (
          <FilePreview content={displayContent} />
        )}
      </div>
    </div>
  )
}
