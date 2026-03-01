"use client"

import { useCallback } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { markdown } from "@codemirror/lang-markdown"

interface ArtifactEditorProps {
  value: string
  onChange: (value: string) => void
}

const extensions = [markdown()]

export function ArtifactEditor({ value, onChange }: ArtifactEditorProps) {
  const handleChange = useCallback(
    (val: string) => {
      onChange(val)
    },
    [onChange]
  )

  return (
    <CodeMirror
      value={value}
      onChange={handleChange}
      extensions={extensions}
      theme="light"
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
      }}
      className="h-full overflow-auto text-sm [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto"
    />
  )
}
