import { NextRequest, NextResponse } from "next/server"

import { getUser } from "@/lib/auth"
import { getClusterPipelineTree } from "@/lib/pipeline/files-cluster"

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const cluster = req.nextUrl.searchParams.get("cluster")
  if (!cluster || !/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  const tree = await getClusterPipelineTree(cluster)
  return NextResponse.json(tree)
}
