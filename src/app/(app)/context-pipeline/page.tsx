import Link from "next/link"
import { ArrowRight } from "lucide-react"

const pipelineSteps = [
  { name: "Content-Extraktion", beschreibung: "Firecrawl scrapt AOK-Webseiten und liefert Artikel als Markdown" },
  { name: "Baustein-Extraktion", beschreibung: "LLM extrahiert atomare Wissensbausteine mit freier Kategorisierung" },
  { name: "Taxonomie-Konsolidierung", beschreibung: "LLM analysiert alle Kategorien und schlaegt finale Taxonomie vor" },
  { name: "Re-Kategorisierung", beschreibung: "Bausteine werden der finalen Taxonomie zugeordnet" },
  { name: "Gruppierung & Duplikate", beschreibung: "Bausteine gruppieren, Ueberlappungen identifizieren" },
  { name: "Konsolidierung", beschreibung: "LLM schlaegt Zusammenfuehrungen vor, Mensch verifiziert" },
  { name: "Kontext-Anreicherung", beschreibung: "5 Kontext-Dimensionen als Metadaten, Relationen aufbauen" },
  { name: "QS durch AOK", beschreibung: "AOK-Fachexperten pruefen inhaltliche Korrektheit" },
]

const bausteintypen = [
  { typ: "FAKT", beschreibung: "Objektive, verifizierbare Information", beispiel: "Pflegegeld Grad 2: 332 € monatlich" },
  { typ: "LEISTUNG", beschreibung: "AOK-spezifisches Leistungsangebot", beispiel: "Toxoplasmose-Test wird bezuschusst" },
  { typ: "EMPFEHLUNG", beschreibung: "Medizinisch begruendete Handlungsanweisung", beispiel: "Linke Seitenlage optimal ab Trimester 2" },
  { typ: "WARNUNG", beschreibung: "Risiko oder Symptom mit Arztpflicht", beispiel: "Schwindel in Rueckenlage: sofort Position wechseln" },
  { typ: "TIPP", beschreibung: "Praktischer Hinweis ohne medizinische Dringlichkeit", beispiel: "Stillkissen zwischen den Knien hilft beim Schlafen" },
  { typ: "VERWEIS", beschreibung: "Referenz auf anderes Thema oder Service", beispiel: "Siehe auch: Kombinationsleistung" },
  { typ: "PROZESS", beschreibung: "Schritt-fuer-Schritt-Anleitung", beispiel: "Pflegegrad beantragen: 1. Antrag, 2. MD-Besuch..." },
]

const dimensionen = [
  { name: "Bedeutung", kernfrage: "Worum geht es?", beschreibung: "Thema, Kernaussagen, Zusammenfassung" },
  { name: "Struktur", kernfrage: "Wie haengt es zusammen?", beschreibung: "Relationen, Cluster-Zuordnung, Hierarchien" },
  { name: "Qualitaet", kernfrage: "Kann ich mich darauf verlassen?", beschreibung: "Quelle, Aktualitaet, Validierungsstatus" },
  { name: "Regeln", kernfrage: "Was gilt?", beschreibung: "Compliance, Haftungsgrenzen, Tonalitaet" },
  { name: "Zielgruppe", kernfrage: "Fuer wen?", beschreibung: "Intentionen, Sprachniveau, Lebenssituation" },
]

const workflowPhasen = [
  {
    phase: "A",
    name: "Cluster-Setup",
    frequenz: "Einmalig pro Cluster",
    beschreibung: "AOK liefert URL-Liste und Fachkontakt. Dienstleister fuehrt Hub-Analyse, Batch-Bildung und Taxonomie-Entwurf durch.",
  },
  {
    phase: "B",
    name: "Batch-Verarbeitung",
    frequenz: "Wiederholt pro Batch",
    beschreibung: "Scraping, Extraktion, Deduplizierung, Anreicherung. AOK testet mit Test-Assistent und gibt Qualitaetsfeedback.",
  },
  {
    phase: "C",
    name: "Cluster-Review",
    frequenz: "Einmalig nach letztem Batch",
    beschreibung: "Inhaltliche Pruefung durch AOK: Checklisten, Vorsichtshinweise, Mengenabgleich, fehlende Themen.",
  },
  {
    phase: "D",
    name: "Freigabe",
    frequenz: "Einmalig pro Cluster",
    beschreibung: "Finales Cluster-Paket wird zusammengestellt. Formale Freigabe durch AOK fuer den Assistenten.",
  },
]

export default function ContextPipelinePage() {
  return (
    <div className="mx-auto max-w-3xl py-12">
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Methodik
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Context Pipeline
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Die Content-to-Context Pipeline transformiert AOK-Webinhalte in strukturierte
        Wissensbausteine. 8 Schritte, 7 Bausteintypen, 5 Kontext-Dimensionen.
      </p>

      {/* 8-Schritte-Pipeline */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold tracking-tight">8-Schritte-Pipeline</h2>
        <div className="flex flex-col gap-2">
          {pipelineSteps.map((step, index) => (
            <div key={step.name} className="flex gap-4 border bg-card p-4">
              <span className="flex size-7 shrink-0 items-center justify-center bg-primary/10 text-xs font-bold text-primary tabular-nums">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold">{step.name}</p>
                <p className="text-sm text-muted-foreground">{step.beschreibung}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bausteintypen + Dimensionen */}
      <section className="mb-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-tight">7 Bausteintypen</h2>
            <div className="flex flex-col gap-2">
              {bausteintypen.map((bt) => (
                <div key={bt.typ} className="border bg-card p-3">
                  <p className="mb-0.5 text-xs font-bold text-primary">{bt.typ}</p>
                  <p className="text-sm">{bt.beschreibung}</p>
                  <p className="mt-1 text-xs italic text-muted-foreground">{bt.beispiel}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-tight">5 Kontext-Dimensionen</h2>
            <div className="flex flex-col gap-2">
              {dimensionen.map((dim, index) => (
                <div key={dim.name} className="border bg-card p-3">
                  <div className="mb-0.5 flex items-baseline gap-2">
                    <span className="text-xs font-bold text-primary tabular-nums">{index + 1}</span>
                    <p className="text-sm font-semibold">{dim.name}</p>
                  </div>
                  <p className="text-sm italic text-muted-foreground">&ldquo;{dim.kernfrage}&rdquo;</p>
                  <p className="mt-1 text-sm">{dim.beschreibung}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Pipeline-Experte */}
      <div className="mb-12 border border-primary/20 bg-primary/5 p-6">
        <p className="mb-1 text-sm font-semibold">Pipeline-Experte</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Pipeline-Experte beantwortet Fragen zur Methodik, zu Bausteintypen und Kontext-Dimensionen.
        </p>
        <Link
          href="/assistant?expert=pipeline"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Pipeline-Experte oeffnen
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Kollaborations-Workflow */}
      <section className="mb-10">
        <h2 className="mb-2 text-lg font-bold tracking-tight">Kollaborations-Workflow</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          4 Phasen definieren die Zusammenarbeit zwischen Dienstleister und AOK pro Themencluster.
        </p>
        <div className="flex flex-col gap-3">
          {workflowPhasen.map((wp) => (
            <div key={wp.phase} className="border bg-card p-4">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-primary/10 text-xs font-bold text-primary">
                  {wp.phase}
                </span>
                <p className="text-sm font-semibold">{wp.name}</p>
                <span className="text-xs text-muted-foreground">{wp.frequenz}</span>
              </div>
              <p className="text-sm">{wp.beschreibung}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Workflow-Guide */}
      <div className="border border-primary/20 bg-primary/5 p-6">
        <p className="mb-1 text-sm font-semibold">Workflow-Guide</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Workflow-Guide unterstuetzt bei der Planung und Durchfuehrung des Kollaborations-Workflows.
        </p>
        <Link
          href="/assistant?expert=workflow"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Workflow-Guide oeffnen
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
