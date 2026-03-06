import { getClusterPipelineState } from "@/lib/pipeline/state-cluster"
import { getClusterPipelineTree } from "@/lib/pipeline/files-cluster"
import { ClusterPipelineWorkbench } from "@/components/cluster-pipeline/cluster-pipeline-workbench"

interface PageProps {
  params: Promise<{ cluster: string }>
}

export default async function ClusterPipelineClusterPage({ params }: PageProps) {
  const { cluster } = await params

  if (!/^[a-z0-9-]+$/.test(cluster)) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-muted-foreground">Ungueltiger Cluster-Name.</p>
      </div>
    )
  }

  const [initialState, initialTree] = await Promise.all([
    getClusterPipelineState(cluster),
    getClusterPipelineTree(cluster),
  ])

  return (
    <div className="px-6 py-4">
      <ClusterPipelineWorkbench
        cluster={cluster}
        initialState={initialState}
        initialTree={initialTree}
      />
    </div>
  )
}
