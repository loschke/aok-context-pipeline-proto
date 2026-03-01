"use client"

import { useState, useCallback } from "react"

import type { PipelineRun } from "@/types/pipeline"
import { BatchSelector } from "./batch-selector"
import { StepRail } from "./step-rail"
import { StepScrape } from "./step-scrape"
import { StepExtract } from "./step-extract"
import { StepTaxonomize } from "./step-taxonomize"
import { StepConsolidate } from "./step-consolidate"
import { StepEnrich } from "./step-enrich"
import { StepViewer } from "./step-viewer"

interface PipelineWorkbenchProps {
  initialBatches: string[]
  initialState: PipelineRun | null
  initialBatch: string
}

export function PipelineWorkbench({
  initialBatches,
  initialState,
  initialBatch,
}: PipelineWorkbenchProps) {
  const [batches, setBatches] = useState(initialBatches)
  const [activeBatch, setActiveBatch] = useState(initialBatch)
  const [pipelineState, setPipelineState] = useState<PipelineRun | null>(initialState)
  const [activeStep, setActiveStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const loadPipelineState = useCallback(async (batch: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/pipeline/state?batch=${encodeURIComponent(batch)}`)
      if (response.ok) {
        const state = (await response.json()) as PipelineRun
        setPipelineState(state)
      }
    } catch {
      // Ignore
    } finally {
      setIsLoading(false)
    }
  }, [])

  async function handleBatchChange(batch: string) {
    setActiveBatch(batch)
    setActiveStep(1)

    // Add new batch to list if it doesn't exist
    if (!batches.includes(batch)) {
      setBatches((prev) => [...prev, batch].sort())
    }

    await loadPipelineState(batch)
  }

  function handleStepComplete() {
    // Reload pipeline state to reflect new files
    loadPipelineState(activeBatch)
  }

  const steps = pipelineState?.steps || []
  const currentStep = steps.find((s) => s.id === activeStep)

  // Get files from previous steps for downstream steps
  const scrapingStep = steps.find((s) => s.id === 1)
  const scrapingFiles = scrapingStep?.files || []
  const bausteinStep = steps.find((s) => s.id === 2)
  const bausteinFiles = bausteinStep?.files || []
  const taxonomyStep = steps.find((s) => s.id === 3)
  const taxonomyFiles = taxonomyStep?.files || []
  const consolidationStep = steps.find((s) => s.id === 4)
  const consolidationFiles = consolidationStep?.files || []

  return (
    <div className="flex flex-col gap-6">
      {/* Header with batch selector */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Context Pipeline
            <span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Content-to-Context Transformation
          </p>
        </div>
        <BatchSelector
          batches={batches}
          activeBatch={activeBatch}
          onBatchChange={handleBatchChange}
        />
      </div>

      {/* Main layout: Step Rail + Content */}
      <div className="flex gap-6">
        {/* Step Rail */}
        <div className="w-56 shrink-0">
          <StepRail
            steps={steps}
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />
        </div>

        {/* Active Step Content */}
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              Pipeline-Status wird geladen...
            </div>
          ) : !currentStep ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              Batch waehlen um zu starten.
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Schritt {currentStep.id}: {currentStep.name}
                </h2>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>

              {currentStep.id === 1 && (
                <StepScrape
                  step={currentStep}
                  batch={activeBatch}
                  onComplete={handleStepComplete}
                />
              )}

              {currentStep.id === 2 && (
                <StepExtract
                  step={currentStep}
                  scrapingFiles={scrapingFiles}
                  batch={activeBatch}
                  onComplete={handleStepComplete}
                />
              )}

              {currentStep.id === 3 && (
                <StepTaxonomize
                  step={currentStep}
                  bausteinFiles={bausteinFiles}
                  batch={activeBatch}
                  onComplete={handleStepComplete}
                />
              )}

              {currentStep.id === 4 && (
                <StepConsolidate
                  step={currentStep}
                  bausteinFiles={bausteinFiles}
                  taxonomyFiles={taxonomyFiles}
                  batch={activeBatch}
                  onComplete={handleStepComplete}
                />
              )}

              {currentStep.id === 5 && (
                <StepEnrich
                  step={currentStep}
                  consolidationFiles={consolidationFiles}
                  batch={activeBatch}
                  onComplete={handleStepComplete}
                />
              )}

              {currentStep.id === 6 && (
                <StepViewer step={currentStep} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
