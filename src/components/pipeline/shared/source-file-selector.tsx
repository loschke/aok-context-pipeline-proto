"use client"

import { FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PipelineFile } from "@/types/pipeline"

interface SourceFileSelectorProps {
  label: string
  description: string
  emptyMessage: string
  files: PipelineFile[]
  selectedFiles: Set<string>
  onToggle: (path: string) => void
  onSelectAll: () => void
  disabled?: boolean
}

export function SourceFileSelector({
  label,
  description,
  emptyMessage,
  files,
  selectedFiles,
  onToggle,
  onSelectAll,
  disabled,
}: SourceFileSelectorProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{label}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {files.length > 0 && (
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={onSelectAll}>
            {selectedFiles.size === files.length ? "Keine" : "Alle"} auswaehlen
          </Button>
        )}
      </div>

      {files.length === 0 ? (
        <p className="rounded border border-dashed p-4 text-center text-xs text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {files.map((file) => (
            <label
              key={file.path}
              className="flex cursor-pointer items-center gap-2 rounded border px-3 py-2 text-xs transition-colors hover:bg-accent"
            >
              <input
                type="checkbox"
                checked={selectedFiles.has(file.path)}
                onChange={() => onToggle(file.path)}
                className="size-3.5 rounded border-muted-foreground/30"
                disabled={disabled}
              />
              <FileText className="size-3.5 text-muted-foreground" />
              <span className="flex-1 truncate font-mono">{file.name}</span>
              <span className="text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
