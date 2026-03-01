import { listBatches, getBatchPipelineState } from "@/lib/pipeline"
import { PipelineWorkbench } from "@/components/pipeline/pipeline-workbench"

export default async function ContextPipelinePage() {
  const batches = await listBatches()

  // Default to first batch- directory, or first available
  const defaultBatch =
    batches.find((b) => b.startsWith("batch-")) || batches[0] || ""

  const initialState = defaultBatch
    ? await getBatchPipelineState(defaultBatch)
    : null

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <PipelineWorkbench
        initialBatches={batches}
        initialState={initialState}
        initialBatch={defaultBatch}
      />
    </div>
  )
}
