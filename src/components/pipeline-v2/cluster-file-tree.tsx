"use client"

import { FileText, FolderOpen, Folder, ChevronRight, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import type { FileTreeNode } from "@/types/pipeline-v2"

interface ClusterFileTreeProps {
  tree: FileTreeNode[]
  selectedFile: string | null
  expandedDirs: Set<string>
  onFileClick: (path: string, name: string, stepDir: string) => void
  onToggleDir: (path: string) => void
}

export function ClusterFileTree({
  tree,
  selectedFile,
  expandedDirs,
  onFileClick,
  onToggleDir,
}: ClusterFileTreeProps) {
  return (
    <div className="flex flex-col gap-0.5 text-xs">
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          depth={0}
          selectedFile={selectedFile}
          expandedDirs={expandedDirs}
          onFileClick={onFileClick}
          onToggleDir={onToggleDir}
        />
      ))}
    </div>
  )
}

interface TreeNodeProps {
  node: FileTreeNode
  depth: number
  selectedFile: string | null
  expandedDirs: Set<string>
  onFileClick: (path: string, name: string, stepDir: string) => void
  onToggleDir: (path: string) => void
}

function TreeNode({
  node,
  depth,
  selectedFile,
  expandedDirs,
  onFileClick,
  onToggleDir,
}: TreeNodeProps) {
  const isExpanded = expandedDirs.has(node.path)
  const hasChildren = node.children && node.children.length > 0

  if (node.type === "directory") {
    return (
      <div>
        <button
          onClick={() => onToggleDir(node.path)}
          className={cn(
            "flex w-full items-center gap-1.5 rounded px-2 py-1 text-left transition-colors hover:bg-accent/50",
            isExpanded && "text-foreground"
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="size-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-3 text-muted-foreground" />
            )
          ) : (
            <span className="size-3" />
          )}
          {isExpanded ? (
            <FolderOpen className="size-3.5 text-muted-foreground" />
          ) : (
            <Folder className="size-3.5 text-muted-foreground" />
          )}
          <span className="font-medium">{node.name}</span>
          {hasChildren && (
            <span className="ml-auto text-muted-foreground tabular-nums">
              {node.children!.length}
            </span>
          )}
        </button>
        {isExpanded && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                selectedFile={selectedFile}
                expandedDirs={expandedDirs}
                onFileClick={onFileClick}
                onToggleDir={onToggleDir}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // File node - extract stepDir from path (cluster/stepDir/file.md)
  const pathParts = node.path.split("/")
  const stepDir = pathParts.length >= 2 ? pathParts[1] : ""

  return (
    <button
      onClick={() => onFileClick(node.path, node.name, stepDir)}
      className={cn(
        "flex w-full items-center gap-1.5 rounded px-2 py-1 text-left transition-colors hover:bg-accent/50",
        selectedFile === node.path && "bg-accent text-accent-foreground"
      )}
      style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
    >
      <FileText className="size-3.5 text-muted-foreground" />
      <span className="truncate font-mono">{node.name}</span>
    </button>
  )
}
