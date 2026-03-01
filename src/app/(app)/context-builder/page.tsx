import { Layers } from "lucide-react"

export default function ContextBuilderPage() {
  return (
    <div className="mx-auto max-w-3xl py-12">
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Context Builder
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Context Builder
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Strukturierte Wissensbausteine erstellen. Jeder Baustein ist ein Markdown-Dokument
        mit Frontmatter-Metadaten und angereichertem Kontext.
      </p>

      <div className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">7 Bausteintypen</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { type: "Erklaerung", desc: "Was ist X? Konzepte verstaendlich machen" },
            { type: "Anleitung", desc: "Wie mache ich X? Schritt-fuer-Schritt" },
            { type: "FAQ", desc: "Haeufige Fragen zu einem Thema" },
            { type: "Checkliste", desc: "Was muss ich beachten?" },
            { type: "Vergleich", desc: "Option A vs. Option B" },
            { type: "Glossar", desc: "Fachbegriffe und Definitionen" },
            { type: "Navigation", desc: "Wo finde ich was? Wegweiser" },
          ].map((item) => (
            <div key={item.type} className="flex items-start gap-3 border bg-card p-4">
              <Layers className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">{item.type}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">5 Kontext-Dimensionen</h2>
        <div className="space-y-2">
          {[
            { dim: "Bedeutung", question: "Was ist das?" },
            { dim: "Struktur", question: "Wie haengt es zusammen?" },
            { dim: "Qualitaet", question: "Ist es zuverlaessig?" },
            { dim: "Regeln", question: "Was gilt?" },
            { dim: "Zielgruppe", question: "Fuer wen?" },
          ].map((item) => (
            <div key={item.dim} className="flex items-center gap-3 border bg-card p-3">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              <span className="text-sm font-semibold">{item.dim}</span>
              <span className="text-sm text-muted-foreground">— {item.question}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
