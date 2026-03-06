import { NextRequest, NextResponse } from "next/server"

import { getUser } from "@/lib/auth"
import {
  listClusterPipelines,
  getClusterPipelineSummary,
  createClusterPipeline,
  deleteClusterPipeline,
} from "@/lib/pipeline/files-cluster"
import { getClusterPipelineState } from "@/lib/pipeline/state-cluster"

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const cluster = req.nextUrl.searchParams.get("cluster")

  // If no cluster specified, return cluster list with summaries
  if (!cluster) {
    const clusters = await listClusterPipelines()
    const summaries = await Promise.all(clusters.map(getClusterPipelineSummary))
    return NextResponse.json({ clusters: summaries })
  }

  if (!/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  const state = await getClusterPipelineState(cluster)
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

  await createClusterPipeline(name)
  const summary = await getClusterPipelineSummary(name)
  return NextResponse.json(summary, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const cluster = req.nextUrl.searchParams.get("cluster")
  if (!cluster || !/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  try {
    await deleteClusterPipeline(cluster)
  } catch {
    return new Response("Cluster not found", { status: 404 })
  }

  return new Response(null, { status: 204 })
}
