"use client"

import type { PipelineRunV2, FileTreeNode } from "@/types/pipeline-v2"
import { StepRailV2 } from "./step-rail-v2"
import { ClusterFileTree } from "./cluster-file-tree"
import { ContentPanel } from "./content-panel"
import { usePipelineV2State } from "./use-pipeline-v2-state"

interface PipelineV2WorkbenchProps {
  cluster: string
  initialState: PipelineRunV2 | null
  initialTree: FileTreeNode[]
}

export function PipelineV2Workbench({
  cluster,
  initialState,
  initialTree,
}: PipelineV2WorkbenchProps) {
  const {
    pipelineState,
    activeStep,
    fileTree,
    selectedFile,
    expandedDirs,
    panelMode,
    editMode,
    fileContent,
    editedContent,
    isSaving,
    isLoading,
    setActiveStep,
    selectFile,
    toggleDir,
    setEditMode,
    setEditedContent,
    saveFile,
    backToActions,
    handleStepComplete,
  } = usePipelineV2State(cluster, initialState, initialTree)

  const steps = pipelineState?.steps || []

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight">
          {cluster}<span className="text-primary">.</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Pipeline v2 — 8-Step Engine
        </p>
      </div>

      {/* 3-column layout */}
      <div className="flex gap-4" style={{ height: "calc(100vh - 160px)" }}>
        {/* Step Rail */}
        <div className="w-56 shrink-0 overflow-y-auto rounded-lg border p-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-xs text-muted-foreground">
              Laden...
            </div>
          ) : (
            <StepRailV2
              steps={steps}
              activeStep={activeStep}
              onStepClick={setActiveStep}
            />
          )}
        </div>

        {/* File Tree */}
        <div className="w-64 shrink-0 overflow-y-auto rounded-lg border p-2">
          <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            Dateien
          </h3>
          <ClusterFileTree
            tree={fileTree}
            selectedFile={selectedFile?.path || null}
            expandedDirs={expandedDirs}
            onFileClick={selectFile}
            onToggleDir={toggleDir}
          />
        </div>

        {/* Content Panel */}
        <div className="min-w-0 flex-1 overflow-y-auto rounded-lg border">
          <ContentPanel
            activeStep={activeStep}
            panelMode={panelMode}
            steps={steps}
            cluster={cluster}
            selectedFile={selectedFile}
            fileContent={fileContent}
            editedContent={editedContent}
            editMode={editMode}
            isSaving={isSaving}
            onEditModeChange={setEditMode}
            onContentChange={setEditedContent}
            onSave={saveFile}
            onBack={backToActions}
            onStepComplete={handleStepComplete}
          />
        </div>
      </div>
    </div>
  )
}
