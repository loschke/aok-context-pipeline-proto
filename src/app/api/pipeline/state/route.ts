import { NextRequest, NextResponse } from "next/server"

import { getUser } from "@/lib/auth"
import { getBatchPipelineState, listBatches } from "@/lib/pipeline"

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const batch = req.nextUrl.searchParams.get("batch")

  // If no batch specified, return list of batches
  if (!batch) {
    const batches = await listBatches()
    return NextResponse.json({ batches })
  }

  // Validate batch name
  if (!/^[a-z0-9-]+$/.test(batch)) {
    return new Response("Invalid batch name", { status: 400 })
  }

  const state = await getBatchPipelineState(batch)
  return NextResponse.json(state)
}
