import { NextRequest, NextResponse } from "next/server"

import { getUser } from "@/lib/auth"
import { getClusterTree } from "@/lib/pipeline/files-v2"

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const cluster = req.nextUrl.searchParams.get("cluster")
  if (!cluster || !/^[a-z0-9-]+$/.test(cluster)) {
    return new Response("Invalid cluster name", { status: 400 })
  }

  const tree = await getClusterTree(cluster)
  return NextResponse.json(tree)
}
