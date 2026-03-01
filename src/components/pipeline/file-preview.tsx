"use client"

import { useMemo } from "react"
import { Streamdown } from "streamdown"
import { code } from "@streamdown/code"

const streamdownPlugins = { code }

interface FilePreviewProps {
  content: string
  filename?: string
}

export function FilePreview({ content, filename }: FilePreviewProps) {
  const displayContent = useMemo(() => {
    const { frontmatter, body } = parseFrontmatter(content)
    let result = ""
    if (frontmatter) {
      result += "```yaml\n" + frontmatter + "\n```\n\n"
    }
    result += body
    return result
  }, [content])

  return (
    <div className="flex flex-col gap-2">
      {filename && (
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="text-xs font-medium text-muted-foreground">{filename}</span>
        </div>
      )}
      <Streamdown
        className="pipeline-prose max-h-[600px] overflow-y-auto text-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        plugins={streamdownPlugins}
      >
        {displayContent}
      </Streamdown>
    </div>
  )
}

function parseFrontmatter(content: string): { frontmatter: string | null; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (match) {
    return { frontmatter: match[1], body: match[2] }
  }
  return { frontmatter: null, body: content }
}
