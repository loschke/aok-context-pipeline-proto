import { getUser } from "@/lib/auth"
import { listExperts } from "@/lib/assistant/list-experts"
import { ExpertOverview } from "@/components/assistant/expert-overview"

export default async function PipelinePage() {
  const user = await getUser()
  const experts = await listExperts()
  const displayName = user?.name || user?.email || "dort"

  return (
    <div className="mx-auto max-w-3xl py-12">
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Pipeline Dashboard
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Willkommen, {displayName}
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Content-to-Context Pipeline fuer AOK-Gesundheitsinhalte. Transformiere Webinhalte in
        strukturierte Wissensbausteine fuer den AI-Assistenten.
      </p>

      {experts.length > 0 && (
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-lg font-bold tracking-tight">SAVA Experten</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {experts.length} Assistenten fuer Methodik, Qualitaetssicherung, Demo und Onboarding.
            </p>
          </div>
          <ExpertOverview experts={experts} />
        </div>
      )}
    </div>
  )
}
