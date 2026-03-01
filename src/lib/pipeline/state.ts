import type { PipelineRun, PipelineStep, StepStatus } from "@/types/pipeline"
import { PIPELINE_STEPS } from "@/types/pipeline"
import { listStepFiles, dirHasFiles } from "./files"

/**
 * Get pipeline state for a batch by checking which directories exist and have files.
 * Steps are sequential: a step is "ready" only if the previous step is "completed".
 *
 * For legacy "schritt-X" directories, files are at the root level (no subdirectories).
 */
export async function getPipelineState(batch: string): Promise<PipelineRun> {
  const isLegacy = batch.startsWith("schritt-")

  if (isLegacy) {
    return getLegacyPipelineState(batch)
  }

  return getBatchPipelineState(batch)
}

/**
 * Get pipeline state for a real batch (batch-1, batch-2, etc.).
 * This is the main function for the workbench UI.
 */
export async function getBatchPipelineState(batch: string): Promise<PipelineRun> {
  const steps: PipelineStep[] = []

  for (const stepDef of PIPELINE_STEPS) {
    const files = await listStepFiles(batch, stepDef.dirName)
    const hasFiles = files.length > 0

    let status: StepStatus = "locked"
    if (hasFiles) {
      status = "completed"
    } else if (steps.length === 0 || steps[steps.length - 1].status === "completed") {
      status = "ready"
    }

    steps.push({
      id: stepDef.id,
      name: stepDef.name,
      description: stepDef.description,
      dirName: stepDef.dirName,
      status,
      files,
    })
  }

  return { batch, steps }
}

/**
 * Get pipeline state for legacy "schritt-X" directories.
 * These have all files at the root level, not in subdirectories.
 */
async function getLegacyPipelineState(batch: string): Promise<PipelineRun> {
  const hasFiles = await dirHasFiles(batch, ".")
  const files = hasFiles ? await listStepFiles(batch, ".") : []

  // For legacy dirs, show a single "completed" step with all files
  const steps: PipelineStep[] = PIPELINE_STEPS.map((stepDef, index) => ({
    id: stepDef.id,
    name: stepDef.name,
    description: stepDef.description,
    dirName: stepDef.dirName,
    status: (index === 0 && hasFiles ? "completed" : "locked") as StepStatus,
    files: index === 0 ? files : [],
  }))

  return { batch, steps }
}
