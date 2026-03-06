import Link from "next/link"
import { ArrowRight, Workflow, Compass, BrainCircuit, Shield, Layers, MessageCircle } from "lucide-react"
import { getUser } from "@/lib/auth"
import { listExperts } from "@/lib/assistant/list-experts"
import { ExpertOverview } from "@/components/assistant/expert-overview"

const infoPages = [
  {
    title: "7 Kernintentionen",
    url: "/intentionen",
    icon: Compass,
    description: "Warum kommen Menschen zur AOK? 7 Motive, 3 Ebenen.",
  },
  {
    title: "Agent Context",
    url: "/agent-context",
    icon: BrainCircuit,
    description: "Build- und Runtime-Wissen, Retrieval, Cluster-Konfiguration.",
  },
  {
    title: "Kompass",
    url: "/kompass",
    icon: Shield,
    description: "Verfassung, Werte und Compliance-Regeln.",
  },
  {
    title: "Contextualisierung",
    url: "/contextualisierung",
    icon: Layers,
    description: "Zwei Pipeline-Ansaetze: Cluster-Dokumente und atomare Bausteine.",
  },
  {
    title: "Kommunikation",
    url: "/kommunikation",
    icon: MessageCircle,
    description: "Tonalitaet, Kanaele und Situations-Anpassung.",
  },
]

const tools = [
  {
    title: "Baustein-Pipeline",
    url: "/pipeline-v2",
    icon: Workflow,
    description: "8-Step Pipeline: Content zu atomaren Wissensbausteinen mit Frontmatter-Metadaten.",
  },
  {
    title: "Cluster Pipeline",
    url: "/cluster-pipeline",
    icon: Layers,
    description: "4-Step Pipeline: Webseiten-Cluster zu LLM-optimierten Markdown-Dokumenten.",
  },
]

export default async function PipelinePage() {
  const user = await getUser()
  const experts = await listExperts()
  const displayName = user?.name || user?.email || "dort"

  return (
    <div className="mx-auto max-w-3xl py-12">
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        SAVA Engine
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Willkommen, {displayName}
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Werkbank fuer die SAVA Engine der AOK Sachsen-Anhalt. Architektur verstehen,
        Context aufbauen, Experten befragen.
      </p>

      {experts.length > 0 && (
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-lg font-bold tracking-tight">SAVA Experten</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              6 Assistenten fuer Methodik, Qualitaetssicherung, Demo und Onboarding.
            </p>
          </div>
          <ExpertOverview experts={experts} />
        </div>
      )}

      <div className="mt-12">
        <div className="mb-4">
          <h2 className="text-lg font-bold tracking-tight">SAVA Architektur</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Die Bausteine der Engine im Detail. Von der Intention bis zur Antwort.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {infoPages.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="group flex items-start gap-3 border bg-card p-3 transition-colors hover:bg-muted/50"
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center bg-muted">
                <page.icon className="size-3.5 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold group-hover:text-primary">{page.title}</p>
                <p className="text-xs text-muted-foreground">{page.description}</p>
              </div>
              <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-4">
          <h2 className="text-lg font-bold tracking-tight">Werkzeuge</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Operativer Zugang zu Pipeline und Arbeitsumgebungen.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.url}
              href={tool.url}
              className="group flex items-start gap-3 border bg-card p-3 transition-colors hover:bg-muted/50"
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center bg-muted">
                <tool.icon className="size-3.5 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold group-hover:text-primary">{tool.title}</p>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </div>
              <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
