"use client"

import type { PipelineStepV2 } from "@/types/pipeline-v2"
import { FileEditorPanel } from "./file-editor-panel"
import { StepScrapeV2 } from "./step-1-scrape"
import { StepExtractV2 } from "./step-2-extract"
import { StepTaxonomizeV2 } from "./step-3-taxonomize"
import { StepRecategorizeV2 } from "./step-4-recategorize"
import { StepGroupV2 } from "./step-5-group"
import { StepConsolidateV2 } from "./step-6-consolidate"
import { StepEnrichV2 } from "./step-7-enrich"
import { StepReviewV2 } from "./step-8-review"
import { ConfigPanel } from "./config-panel"

interface ContentPanelProps {
  activeStep: number | "config"
  panelMode: "actions" | "file"
  steps: PipelineStepV2[]
  cluster: string
  // File editor props
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

export function ContentPanel({
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

  // Config panel
  if (activeStep === "config") {
    return <ConfigPanel cluster={cluster} />
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
        <StepScrapeV2 step={currentStep} cluster={cluster} onComplete={onStepComplete} />
      )}
      {currentStep.id === 2 && (
        <StepExtractV2
          step={currentStep}
          scrapingFiles={getStepFiles(1)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 3 && (
        <StepTaxonomizeV2
          step={currentStep}
          bausteinFiles={getStepFiles(2)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 4 && (
        <StepRecategorizeV2
          step={currentStep}
          bausteinFiles={getStepFiles(2)}
          taxonomyFiles={getStepFiles(3)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 5 && (
        <StepGroupV2
          step={currentStep}
          recategorizedFiles={getStepFiles(4)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 6 && (
        <StepConsolidateV2
          step={currentStep}
          groupedFiles={getStepFiles(5)}
          bausteinFiles={getStepFiles(2)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 7 && (
        <StepEnrichV2
          step={currentStep}
          consolidatedFiles={getStepFiles(6)}
          cluster={cluster}
          onComplete={onStepComplete}
        />
      )}
      {currentStep.id === 8 && (
        <StepReviewV2 step={currentStep} cluster={cluster} />
      )}
    </div>
  )
}
