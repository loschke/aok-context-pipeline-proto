import { getUser } from "@/lib/auth"

export default async function PipelinePage() {
  const user = await getUser()
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border bg-card p-6">
          <p className="mb-1 text-sm font-semibold">8-Schritte-Pipeline</p>
          <p className="text-sm text-muted-foreground">
            Von der Content-Extraktion ueber Baustein-Erstellung bis zur QA-Freigabe.
          </p>
        </div>
        <div className="border bg-card p-6">
          <p className="mb-1 text-sm font-semibold">7 Bausteintypen</p>
          <p className="text-sm text-muted-foreground">
            Erklaerung, Anleitung, FAQ, Checkliste, Vergleich, Glossar, Navigation.
          </p>
        </div>
        <div className="border bg-card p-6">
          <p className="mb-1 text-sm font-semibold">5 Kontext-Dimensionen</p>
          <p className="text-sm text-muted-foreground">
            Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe.
          </p>
        </div>
        <div className="border bg-card p-6">
          <p className="mb-1 text-sm font-semibold">Pilot: Pflege-Cluster</p>
          <p className="text-sm text-muted-foreground">
            ~24 Seiten aus aok.de/pk/pflege/ als erstes Themencluster.
          </p>
        </div>
      </div>
    </div>
  )
}
