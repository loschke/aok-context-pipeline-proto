"use client"

import { useCallback, useState } from "react"
import dynamic from "next/dynamic"
import { X, Eye, Pencil, Copy, Download, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MessageResponse } from "@/components/ai-elements/message"

const ArtifactEditor = dynamic(
  () =>
    import("./artifact-editor").then((mod) => ({
      default: mod.ArtifactEditor,
    })),
  { ssr: false }
)

interface ArtifactPanelProps {
  content: string
  title: string
  isStreaming: boolean
  onClose: () => void
}

export function ArtifactPanel({ content, title, isStreaming, onClose }: ArtifactPanelProps) {
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [editContent, setEditContent] = useState(content)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const textToCopy = mode === "edit" ? editContent : content
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [mode, editContent, content])

  const handleDownload = useCallback(() => {
    const textToDownload = mode === "edit" ? editContent : content
    const blob = new Blob([textToDownload], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    const filename = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    link.download = `${filename || "artifact"}.md`
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }, [mode, editContent, content, title])

  const handleToggleMode = useCallback(() => {
    if (mode === "view") {
      setEditContent(content)
      setMode("edit")
    } else {
      setMode("view")
    }
  }, [mode, content])

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2 overflow-hidden">
          {isStreaming && (
            <span className="bg-primary size-2 shrink-0 animate-pulse rounded-full" />
          )}
          <span className="truncate text-sm font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={handleToggleMode}
            title={mode === "view" ? "Bearbeiten" : "Vorschau"}
          >
            {mode === "view" ? (
              <Pencil className="size-3.5" />
            ) : (
              <Eye className="size-3.5" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={handleCopy}
            title="Kopieren"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={handleDownload}
            title="Herunterladen"
          >
            <Download className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={onClose}
          >
            <X className="size-3.5" />
            <span className="sr-only">Schliessen</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {mode === "view" ? (
          <div className="p-6">
            <MessageResponse className="chat-prose">
              {content}
            </MessageResponse>
          </div>
        ) : (
          <ArtifactEditor value={editContent} onChange={setEditContent} />
        )}
      </div>
    </div>
  )
}
