"use client"

import type { ClusterPipelineStep } from "@/types/cluster-pipeline"
import { FileEditorPanel } from "@/components/pipeline-v2/file-editor-panel"
import { StepScrape } from "./step-1-scrape"
import { StepAnalyse } from "./step-2-analyse"
import { StepSynthese } from "./step-3-synthese"
import { StepReview } from "./step-4-review"

interface ContentPanelProps {
  activeStep: number
  panelMode: "actions" | "file"
  steps: ClusterPipelineStep[]
  cluster: string
  selectedFile: { path: string; name: string; stepDir: string } | null
  fileContent: string | null
  editedContent: string | null
  editMode: boolean
  isSaving: boolean
  onEditModeChange: (editMode: boolean) => void
  onContentChange: (content: string) => void
  onSave: () => void
  onBack: () => void
  onStepComplete: () => void
}

export function ClusterContentPanel({
  activeStep,
  panelMode,
  steps,
  cluster,
  selectedFile,
  fileContent,
  editedContent,
  editMode,
  isSaving,
  onEditModeChange,
  onContentChange,
  onSave,
  onBack,
  onStepComplete,
}: ContentPanelProps) {
  // File editor view
  if (panelMode === "file" && selectedFile && fileContent !== null) {
    return (
      <FileEditorPanel
        filename={selectedFile.name}
        stepDir={selectedFile.stepDir}
        content={fileContent}
        editedContent={editedContent}
        editMode={editMode}
        isSaving={isSaving}
        onEditModeChange={onEditModeChange}
        onContentChange={onContentChange}
        onSave={onSave}
        onBack={onBack}
      />
    )
  }

  // Step action panels
  const currentStep = steps.find((s) => s.id === activeStep)
  if (!currentStep) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
        Step nicht gefunden.
      </div>
    )
  }

  const getStepFiles = (id: number) => steps.find((s) => s.id === id)?.files || []

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Schritt {currentStep.id}: {currentStep.name}
        </h2>
        <p className="text-sm text-muted-foreground">{currentStep.description}</p>
      </div>

      {currentStep.id === 1 && (
        <StepScrape step={currentStep} cluster={cluster} onComplete={onStepComplete} />
      )}
      {currentStep.id === 2 && (
        <StepAnalyse
          step={currentStep}
          scrapingFiles={getStepFiles(1)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 3 && (
        <StepSynthese
          step={currentStep}
          scrapingFiles={getStepFiles(1)}
          outlineFiles={getStepFiles(2)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 4 && (
        <StepReview
          step={currentStep}
          syntheseFiles={getStepFiles(3)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
    </div>
  )
}
