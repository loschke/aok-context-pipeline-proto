import { redirect } from "next/navigation"

import { features } from "@/config/features"
import { listExperts } from "@/lib/assistant/list-experts"
import { AssistantChat } from "@/components/assistant/assistant-chat"

interface AssistantPageProps {
  searchParams: Promise<{ expert?: string }>
}

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  if (!features.assistant.enabled) {
    redirect("/")
  }

  const [experts, params] = await Promise.all([listExperts(), searchParams])
  const initialExpert = params.expert || undefined

  return (
    <div className="-m-6 flex h-[calc(100vh-var(--header-height,56px))] w-[calc(100%+3rem)]">
      <AssistantChat experts={experts} initialExpert={initialExpert} />
    </div>
  )
}
