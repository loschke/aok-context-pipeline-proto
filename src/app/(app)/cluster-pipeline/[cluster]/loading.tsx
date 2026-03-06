import { Skeleton } from "@/components/ui/skeleton"

export default function ClusterPipelineLoading() {
  return (
    <div className="px-6 py-4">
      <div className="flex flex-col gap-4">
        <div>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-1 h-4 w-64" />
        </div>
        <div className="flex gap-4" style={{ height: "calc(100vh - 160px)" }}>
          <Skeleton className="w-56 shrink-0 rounded-lg" />
          <Skeleton className="w-64 shrink-0 rounded-lg" />
          <Skeleton className="flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
