import { FileText, Maximize2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface ArtifactCardProps {
  title: string
  preview: string
  isActive: boolean
  onClick: () => void
}

export function ArtifactCard({
  title,
  preview,
  isActive,
  onClick,
}: ArtifactCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group mt-3 flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors",
        isActive
          ? "border-primary/30 bg-primary/5"
          : "border-border hover:bg-muted/50"
      )}
    >
      <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
        <FileText className="text-muted-foreground size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {preview && (
          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
            {preview}
          </p>
        )}
      </div>
      <Maximize2 className="text-muted-foreground mt-0.5 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  )
}
