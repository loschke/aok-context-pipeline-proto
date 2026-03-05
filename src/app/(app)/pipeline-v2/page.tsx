import { listClusters, getClusterSummary } from "@/lib/pipeline/files-v2"
import { ClusterDashboard } from "@/components/pipeline-v2/cluster-dashboard"

export default async function PipelineV2Page() {
  const clusterNames = await listClusters()
  const clusters = await Promise.all(clusterNames.map(getClusterSummary))

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <ClusterDashboard initialClusters={clusters} />
    </div>
  )
}
