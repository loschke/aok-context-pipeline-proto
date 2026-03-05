import type { PipelineRunV2, PipelineStepV2, StepStatus } from "@/types/pipeline-v2"
import { PIPELINE_STEPS_V2 } from "@/types/pipeline-v2"
import { listStepFilesV2 } from "./files-v2"

/**
 * Get pipeline state for a v2 cluster.
 * Steps are sequential: a step is "ready" only if the previous step is "completed".
 */
export async function getPipelineStateV2(cluster: string): Promise<PipelineRunV2> {
  const steps: PipelineStepV2[] = []

  for (const stepDef of PIPELINE_STEPS_V2) {
    const files = await listStepFilesV2(cluster, stepDef.dirName)
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

  return { batch: cluster, steps }
}
