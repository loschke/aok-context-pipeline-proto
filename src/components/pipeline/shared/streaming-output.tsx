"use client"

import { Loader2 } from "lucide-react"
import { Streamdown } from "streamdown"
import { code } from "@streamdown/code"

const streamdownPlugins = { code }

interface StreamingOutputProps {
  content: string
  isRunning: boolean
  isAnimating: boolean
  label: string
}

export function StreamingOutput({ content, isRunning, isAnimating, label }: StreamingOutputProps) {
  if (!isRunning && !content) return null

  return (
    <div className="rounded border p-4">
      <h4 className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {isRunning && <Loader2 className="size-3 animate-spin" />}
        {label} {isRunning ? "(laeuft...)" : "(abgeschlossen)"}
      </h4>
      <Streamdown
        className="pipeline-prose max-h-[500px] overflow-y-auto text-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        plugins={streamdownPlugins}
        isAnimating={isAnimating}
      >
        {content}
      </Streamdown>
    </div>
  )
}
