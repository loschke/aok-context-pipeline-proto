import { NextRequest, NextResponse } from "next/server"

import { getUser } from "@/lib/auth"
import { listClusters, getClusterSummary, createCluster } from "@/lib/pipeline/files-v2"
import { getPipelineStateV2 } from "@/lib/pipeline/state-v2"

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const cluster = req.nextUrl.searchParams.get("cluster")

  // If no cluster specified, return cluster list with summaries
  if (!cluster) {
    const clusters = await listClusters()
    const summaries = await Promise.all(clusters.map(getClusterSummary))
    return NextResponse.json({ clusters: summaries })
  }

  // Validate cluster name
  if (!/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  const state = await getPipelineStateV2(cluster)
  return NextResponse.json(state)
}

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  let body: { name: string }
  try {
    body = await req.json()
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  const { name } = body
  if (!name || !/^[a-z0-9-]+$/.test(name)) {
    return new Response("Invalid cluster name. Use lowercase letters, numbers, and hyphens.", { status: 400 })
  }

  await createCluster(name)
  const summary = await getClusterSummary(name)
  return NextResponse.json(summary, { status: 201 })
}
