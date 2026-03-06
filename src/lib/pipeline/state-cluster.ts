import type { ClusterPipelineRun, ClusterPipelineStep, StepStatus } from "@/types/cluster-pipeline"
import { CLUSTER_PIPELINE_STEPS } from "@/types/cluster-pipeline"
import { listStepFilesCluster } from "./files-cluster"

/**
 * Get pipeline state for a cluster pipeline.
 * Steps are sequential: a step is "ready" only if the previous step is "completed".
 */
export async function getClusterPipelineState(cluster: string): Promise<ClusterPipelineRun> {
  const steps: ClusterPipelineStep[] = []

  for (const stepDef of CLUSTER_PIPELINE_STEPS) {
    const files = await listStepFilesCluster(cluster, stepDef.dirName)
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

  return { cluster, steps }
}
