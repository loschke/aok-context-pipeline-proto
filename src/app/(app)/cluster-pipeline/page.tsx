import { listClusterPipelines, getClusterPipelineSummary } from "@/lib/pipeline/files-cluster"
import { ClusterPipelineDashboard } from "@/components/cluster-pipeline/cluster-pipeline-dashboard"

export default async function ClusterPipelinePage() {
  const clusterNames = await listClusterPipelines()
  const clusters = await Promise.all(clusterNames.map(getClusterPipelineSummary))

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <ClusterPipelineDashboard initialClusters={clusters} />
    </div>
  )
}
