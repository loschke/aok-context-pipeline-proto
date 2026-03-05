import { getPipelineStateV2 } from "@/lib/pipeline/state-v2"
import { getClusterTree } from "@/lib/pipeline/files-v2"
import { PipelineV2Workbench } from "@/components/pipeline-v2/pipeline-v2-workbench"

interface PageProps {
  params: Promise<{ cluster: string }>
}

export default async function PipelineV2ClusterPage({ params }: PageProps) {
  const { cluster } = await params

  if (!/^[a-z0-9-]+$/.test(cluster)) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-muted-foreground">Ungueltiger Cluster-Name.</p>
      </div>
    )
  }

  const [initialState, initialTree] = await Promise.all([
    getPipelineStateV2(cluster),
    getClusterTree(cluster),
  ])

  return (
    <div className="px-6 py-4">
      <PipelineV2Workbench
        cluster={cluster}
        initialState={initialState}
        initialTree={initialTree}
      />
    </div>
  )
}
