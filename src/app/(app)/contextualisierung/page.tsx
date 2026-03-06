import Link from "next/link"
import { ArrowRight, Lightbulb, AlertTriangle, Layers, Workflow, BotMessageSquare } from "lucide-react"

// --- Data ---

interface ClusterSchritt {
  nummer: number
  name: string
  beschreibung: string
  akteur: string
  details: string
}

const clusterSchritte: ClusterSchritt[] = [
  {
    nummer: 1,
    name: "Content-Extraktion",
    beschreibung: "Firecrawl scrapt alle Quellseiten des Clusters als Markdown.",
    akteur: "AI (Firecrawl)",
    details: "Bis zu 50 URLs pro Cluster. JavaScript-Rendering fuer Accordion-Inhalte. Output: eine Markdown-Datei pro Quellseite mit Titel, URL und Crawl-Datum.",
  },
  {
    nummer: 2,
    name: "Analyse & Themenstruktur",
    beschreibung: "LLM analysiert alle Rohseiten, gruppiert nach Themen, erkennt Duplikate und Luecken, schlaegt eine Gliederung vor.",
    akteur: "AI (LLM)",
    details: "Gruppierung nach inhaltlicher Logik, nicht nach Quellseite. Duplikate werden markiert, Luecken identifiziert. Output: Markdown-Outline mit H2/H3-Struktur.",
  },
  {
    nummer: 3,
    name: "Synthese",
    beschreibung: "LLM erzeugt entlang der Gliederung ein zusammengefuehrtes Cluster-Dokument. Marketing wird entfernt, Fakten bleiben.",
    akteur: "AI (LLM)",
    details: "YAML-Frontmatter mit Quellen und Status. Max. 3 Heading-Ebenen, 200-500 Woerter pro H2. Tabellen fuer Betraege. Quell-URLs am Ende jedes Abschnitts. Widersprueche werden markiert.",
  },
  {
    nummer: 4,
    name: "Review & Freigabe",
    beschreibung: "Redaktion prueft das Dokument auf inhaltliche Korrektheit, Vollstaendigkeit und Halluzinationen.",
    akteur: "Mensch",
    details: "Status-Workflow im Frontmatter: entwurf → geprueft → freigegeben. Pruefpunkte: Betraege korrekt? Themen vollstaendig? Keine LLM-Halluzinationen? Gliederung nachvollziehbar?",
  },
]

const bausteinSchritte: ClusterSchritt[] = [
  {
    nummer: 1,
    name: "Content-Extraktion",
    beschreibung: "Firecrawl scrapt Quellseiten als Markdown (identisch zur Cluster-Pipeline).",
    akteur: "AI (Firecrawl)",
    details: "Identisch zu Schritt 1 der Cluster-Pipeline. Selbe Quellen, selbes Tooling.",
  },
  {
    nummer: 2,
    name: "Baustein-Extraktion",
    beschreibung: "LLM zerlegt jeden Artikel in typisierte, atomare Bausteine (8 Typen) mit freier Kategorisierung.",
    akteur: "AI (LLM)",
    details: "8 Typen: FAKT, EMPFEHLUNG, ANLEITUNG, FAQ, CHECKLISTE, VERGLEICH, GLOSSAR, NAVIGATION. Jeder Baustein enthaelt genau eine Information mit freier Kategorie-Zuordnung.",
  },
  {
    nummer: 3,
    name: "Taxonomie-Konsolidierung",
    beschreibung: "Aus frei vergebenen Kategorien wird eine konsistente Taxonomie mit max. 15-20 Kategorien abgeleitet.",
    akteur: "AI + Mensch",
    details: "Synonyme erkennen (Schlaf vs. Nachtruhe), trennscharfe Kategorien bilden. Die Taxonomie definiert, wie das System Themen versteht.",
  },
  {
    nummer: 4,
    name: "Re-Kategorisierung",
    beschreibung: "Alle Bausteine werden mit der finalen Taxonomie neu zugeordnet.",
    akteur: "AI + Mensch",
    details: "Automatisches Mapping der freien Kategorien auf die finale Taxonomie. Uneindeutige Faelle gehen zur manuellen Stichprobe.",
  },
  {
    nummer: 5,
    name: "Gruppierung & Duplikate",
    beschreibung: "Bausteine werden nach Kategorie gruppiert, Duplikate und Widersprueche identifiziert.",
    akteur: "AI (LLM)",
    details: "Semantische Duplikaterkennung (erwartete Rate: 20-30%). Gleiche Info von verschiedenen Quellseiten wird als Duplikat-Cluster markiert.",
  },
  {
    nummer: 6,
    name: "Konsolidierung",
    beschreibung: "Duplikat-Cluster werden zu jeweils einem finalen Baustein zusammengefuehrt.",
    akteur: "AI + Mensch",
    details: "Der aufwaendigste Schritt. Beste Formulierung behalten, Widersprueche aufloesen, Quellen-Tracking. Jede Information soll genau einmal existieren.",
  },
  {
    nummer: 7,
    name: "Kontext-Anreicherung",
    beschreibung: "Bausteine erhalten Frontmatter-Metadaten mit 5 Kontextdimensionen und Relationen.",
    akteur: "AI + Mensch",
    details: "5 Dimensionen: Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe. Plus Relationen (kombinierbar_mit, voraussetzung_fuer, alternative_zu) und Volatilitaetsmarker.",
  },
  {
    nummer: 8,
    name: "QS durch AOK",
    beschreibung: "Fachredakteure pruefen Bausteine auf medizinische und rechtliche Korrektheit.",
    akteur: "Mensch (AOK)",
    details: "Validierung gegen aktuelle Gesetzeslage. Volatilitaetsmarker steuern Pruefintervalle: Betraege = haeufig, Definitionen = selten.",
  },
]

interface Vergleichszeile {
  achse: string
  cluster: string
  bausteine: string
}

const vergleich: Vergleichszeile[] = [
  {
    achse: "Output",
    cluster: "Ein Markdown-Dokument pro Themenbereich",
    bausteine: "Viele kleine Dateien mit Frontmatter-Metadaten",
  },
  {
    achse: "Granularitaet",
    cluster: "Thematisch (1 Abschnitt = 1 Unterthema)",
    bausteine: "Atomar (1 Baustein = 1 Information)",
  },
  {
    achse: "Erstellungsaufwand",
    cluster: "Stunden pro Cluster (4 Schritte)",
    bausteine: "Tage pro Cluster (8 Schritte)",
  },
  {
    achse: "Retrieval",
    cluster: "Full Context Loading, kein Retrieval noetig",
    bausteine: "Metadaten-Filter + semantische Suche",
  },
  {
    achse: "Token-Last pro Anfrage",
    cluster: "15.000-40.000 Tokens (gesamtes Dokument)",
    bausteine: "1.000-4.000 Tokens (nur relevante Bausteine)",
  },
  {
    achse: "Modellabhaengigkeit",
    cluster: "Braucht grosses Context Window",
    bausteine: "Funktioniert auch mit kleineren Modellen",
  },
  {
    achse: "Einsatzgebiet",
    cluster: "PoC, Fokus-Assistenten, Validierung",
    bausteine: "Produktion, Multi-Modell, KI-Inseln",
  },
]

const clusterZielgroessen = [
  { typ: "Klein (z.B. Pubertaet)", seiten: "5-10", woerter: "3.000-6.000", tokens: "4.000-8.000" },
  { typ: "Mittel (z.B. Zahngesundheit)", seiten: "10-20", woerter: "6.000-12.000", tokens: "8.000-16.000" },
  { typ: "Gross (z.B. Pflege)", seiten: "20-40", woerter: "12.000-20.000", tokens: "16.000-27.000" },
]

const bausteinTypen = [
  { typ: "FAKT", beschreibung: "Objektive, verifizierbare Information", beispiel: "Pflegegeld Grad 2: 332 EUR monatlich" },
  { typ: "EMPFEHLUNG", beschreibung: "Begruendete Handlungsempfehlung", beispiel: "Kombinationsleistung pruefen: oft guenstiger als reines Pflegegeld" },
  { typ: "ANLEITUNG", beschreibung: "Schritt-fuer-Schritt-Prozess", beispiel: "Pflegegrad beantragen: 1. Antrag bei Kasse, 2. MD-Besuch..." },
  { typ: "FAQ", beschreibung: "Frage-Antwort-Paar", beispiel: "Kann ich Pflegegeld und Sachleistung kombinieren?" },
  { typ: "CHECKLISTE", beschreibung: "Pruefbare Anforderungen oder Dokumente", beispiel: "Unterlagen fuer den Pflegegrad-Antrag" },
  { typ: "VERGLEICH", beschreibung: "Gegenuberstellung von Optionen", beispiel: "Pflegegeld vs. Pflegesachleistung: Unterschiede" },
  { typ: "GLOSSAR", beschreibung: "Definition eines Fachbegriffs", beispiel: "Verhinderungspflege: Ersatzpflege bei Ausfall der Pflegeperson" },
  { typ: "NAVIGATION", beschreibung: "Verweis auf verwandtes Thema oder Anlaufstelle", beispiel: "Fuer Kombinationsleistung siehe: pflege/leistungen/kombi" },
]

const anwendungsfaelle = [
  {
    fall: "Fokus-Assistent (z.B. Pubertaet)",
    ansatz: "Cluster",
    grund: "Ueberschaubares Thema, passt komplett in ein Dokument",
  },
  {
    fall: "Pflegeberatung mit vielen Leistungen",
    ansatz: "Bausteine",
    grund: "24+ Seiten, dutzende Leistungen, Retrieval muss gezielt filtern",
  },
  {
    fall: "Superchat ueber alle Themen",
    ansatz: "Bausteine",
    grund: "Kein Modell kann alle Cluster gleichzeitig laden",
  },
  {
    fall: "Viele KI-Inseln, ein Wissenspool",
    ansatz: "Bausteine",
    grund: "Eine Quelle, viele Kanaele, modellunabhaengig",
  },
  {
    fall: "Schnelle Validierung neuer Inhalte",
    ansatz: "Cluster",
    grund: "Redaktion kann ganzes Dokument lesen und pruefen",
  },
]

// --- Component ---

export default function ContextualisierungPage() {
  return (
    <div className="mx-auto max-w-4xl py-12">
      {/* Header */}
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Content-to-Context Methodik
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Contextualisierung
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        AOK-Webinhalte muessen so aufbereitet werden, dass ein LLM verlaesslich daraus antworten
        kann. Zwei Pipeline-Ansaetze loesen dieses Problem auf unterschiedlichem Granularitaetsniveau.
      </p>

      {/* Grundproblem */}
      <div className="mb-10 border border-amber-500/20 bg-amber-50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="size-4 text-amber-600" />
          <p className="text-sm font-semibold text-amber-900">Das Grundproblem: Content ≠ Context</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-800">Website-Content</p>
            <ul className="space-y-1 text-sm text-amber-900">
              <li>Niedrige Informationsdichte (Marketing, CTAs)</li>
              <li>Fragmentiertes Wissen ueber viele Seiten</li>
              <li>Fehlende explizite Relationen</li>
              <li>Accordion-Inhalte oft nicht crawlbar</li>
            </ul>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-800">Was ein LLM braucht</p>
            <ul className="space-y-1 text-sm text-amber-900">
              <li>Bereinigte, strukturierte Inhalte ohne Rauschen</li>
              <li>Deduplizierte Fakten aus allen Quellseiten</li>
              <li>Kontextinformationen: Aktualitaet, Haftung, Zielgruppe</li>
              <li>Konsistente Struktur fuer zuverlaessiges Retrieval</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Zwei Ansaetze */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Zwei Ansaetze
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Cluster-Pipeline vs. Baustein-Pipeline
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Beide Pipelines starten mit demselben Ausgangsmaterial: Webseiten der AOK-Gesundheitswelt.
          Sie unterscheiden sich im Zielformat, der Granularitaet und dem Aufwand.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Cluster */}
          <div className="flex flex-col border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              <h3 className="text-base font-bold">Cluster-Pipeline</h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Transformiert N Webseiten eines Themenclusters in <strong>ein einzelnes Markdown-Dokument</strong>.
              Das gesamte Dokument wird ins Context Window geladen. Kein Retrieval noetig.
            </p>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">4 Schritte</p>
            <div className="flex flex-col gap-2">
              {clusterSchritte.map((s) => (
                <div key={s.nummer} className="flex items-baseline gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {s.nummer}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.beschreibung}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <Link
                href="/cluster-pipeline"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Cluster Pipeline oeffnen
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Bausteine */}
          <div className="flex flex-col border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Workflow className="size-4 text-primary" />
              <h3 className="text-base font-bold">Baustein-Pipeline</h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Zerlegt Webseiten in <strong>atomare Wissensbausteine mit Frontmatter-Metadaten</strong>.
              Retrieval liefert pro Anfrage nur die relevanten Bausteine.
            </p>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">8 Schritte</p>
            <div className="flex flex-col gap-2">
              {bausteinSchritte.map((s) => (
                <div key={s.nummer} className="flex items-baseline gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {s.nummer}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.beschreibung}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <Link
                href="/pipeline-v2"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Baustein-Pipeline oeffnen
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Vergleich */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Vergleich
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Trade-offs
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Kein Ansatz ist besser. Der richtige haengt von den Rahmenbedingungen ab.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Achse</th>
                <th className="py-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cluster-Pipeline</th>
                <th className="py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Baustein-Pipeline</th>
              </tr>
            </thead>
            <tbody>
              {vergleich.map((z) => (
                <tr key={z.achse} className="border-b last:border-0">
                  <td className="py-2.5 pr-4 text-sm font-medium">{z.achse}</td>
                  <td className="py-2.5 pr-4 text-sm text-muted-foreground">{z.cluster}</td>
                  <td className="py-2.5 text-sm text-muted-foreground">{z.bausteine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anwendungsfaelle */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Praxis
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Welcher Ansatz wann
          <span className="text-primary">.</span>
        </h2>
        <div className="flex flex-col gap-2">
          {anwendungsfaelle.map((a) => (
            <div key={a.fall} className="flex items-baseline gap-3 border bg-card p-3">
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${a.ansatz === "Cluster" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {a.ansatz}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{a.fall}</p>
                <p className="text-xs text-muted-foreground">{a.grund}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hybride Wege */}
      <div className="mb-10 border bg-muted/30 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="size-4 text-primary" />
          <p className="text-sm font-semibold">Hybride Wege</p>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">
          Beide Ansaetze schliessen sich nicht aus. Sie koennen koexistieren und aufeinander aufbauen.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Cluster-Dokumente als Startpunkt.</strong>{" "}
            Schnell erstellbar, validiert den Inhalt, funktioniert im PoC. Gibt der Redaktion ein Format, das sie kennt.
          </p>
          <p>
            <strong className="text-foreground">Atomarisierung wo noetig.</strong>{" "}
            Wenn ein Cluster in Produktion geht, auf kleineren Modellen laufen soll oder
            von mehreren KI-Inseln genutzt wird, lohnt sich die Baustein-Pipeline.
          </p>
          <p>
            <strong className="text-foreground">Beide Pipelines parallel.</strong>{" "}
            Dieselben Quellen, zwei Outputs. Cluster-Dokumente fuer schnelle Validierung,
            Bausteine fuer Produktion.
          </p>
        </div>
      </div>

      {/* Detail: Cluster-Pipeline */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Detail
        </p>
        <div className="mb-2 flex items-center gap-2">
          <Layers className="size-5 text-primary" />
          <h2 className="headline-black text-2xl">
            Cluster-Pipeline
            <span className="text-primary">.</span>
          </h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Aus N Webseiten eines Themenclusters ein einzelnes, LLM-optimiertes Markdown-Dokument erzeugen.
          Informationsdicht, dedupliziert, direkt ins Context Window ladbar.
        </p>

        <div className="mb-6 flex flex-col gap-3">
          {clusterSchritte.map((s) => (
            <div key={s.nummer} className="border bg-card p-4">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-xs font-bold text-primary tabular-nums">{s.nummer}</span>
                <h3 className="text-sm font-bold">{s.name}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {s.akteur}
                </span>
              </div>
              <p className="mb-2 text-sm">{s.beschreibung}</p>
              <p className="text-xs text-muted-foreground">{s.details}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-3 text-sm font-semibold">Zielgroessen</h3>
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cluster-Typ</th>
                <th className="py-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quellseiten</th>
                <th className="py-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Woerter</th>
                <th className="py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tokens (ca.)</th>
              </tr>
            </thead>
            <tbody>
              {clusterZielgroessen.map((z) => (
                <tr key={z.typ} className="border-b last:border-0">
                  <td className="py-2 pr-4 text-sm font-medium">{z.typ}</td>
                  <td className="py-2 pr-4 text-sm text-muted-foreground tabular-nums">{z.seiten}</td>
                  <td className="py-2 pr-4 text-sm text-muted-foreground tabular-nums">{z.woerter}</td>
                  <td className="py-2 text-sm text-muted-foreground tabular-nums">{z.tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground">
          Obergrenze: ~30.000 Tokens pro Dokument. Darueber hinaus wird der Cluster-Ansatz
          ineffizient und die Baustein-Pipeline ist die bessere Wahl.
        </p>
      </div>

      {/* Detail: Baustein-Pipeline */}
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <Workflow className="size-5 text-primary" />
          <h2 className="headline-black text-2xl">
            Baustein-Pipeline
            <span className="text-primary">.</span>
          </h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Webseiten in atomare Wissensbausteine mit Frontmatter-Metadaten zerlegen. Jeder Baustein
          beantwortet genau eine Frage und ist ueber 5 Kontextdimensionen adressierbar.
        </p>

        <div className="mb-6 flex flex-col gap-3">
          {bausteinSchritte.map((s) => (
            <div key={s.nummer} className="border bg-card p-4">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-xs font-bold text-primary tabular-nums">{s.nummer}</span>
                <h3 className="text-sm font-bold">{s.name}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {s.akteur}
                </span>
              </div>
              <p className="mb-2 text-sm">{s.beschreibung}</p>
              <p className="text-xs text-muted-foreground">{s.details}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-3 text-sm font-semibold">8 Bausteintypen</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Schritt 2 ordnet jeden extrahierten Inhalt einem Typ zu. Der Typ bestimmt die interne
          Struktur des Bausteins und steuert, wie er im Retrieval gefunden und ausgespielt wird.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {bausteinTypen.map((bt) => (
            <div key={bt.typ} className="border bg-card p-3">
              <p className="mb-0.5 text-xs font-bold text-primary">{bt.typ}</p>
              <p className="text-sm">{bt.beschreibung}</p>
              <p className="mt-1 text-xs italic text-muted-foreground">&ldquo;{bt.beispiel}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mb-6 mt-14">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Werkzeuge
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Direkt loslegen
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Beide Pipelines sind als Werkzeuge in dieser App verfuegbar. Der Pipeline-Experte
          beantwortet Fragen zur Methodik, zu Bausteintypen und zur Entscheidung zwischen den Ansaetzen.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Link
          href="/cluster-pipeline"
          className="group flex items-start gap-3 border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
        >
          <Layers className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">Cluster-Pipeline</p>
            <p className="text-xs text-muted-foreground">4-Step Tool oeffnen</p>
          </div>
          <ArrowRight className="ml-auto mt-0.5 size-3.5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
        <Link
          href="/pipeline-v2"
          className="group flex items-start gap-3 border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
        >
          <Workflow className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">Baustein-Pipeline</p>
            <p className="text-xs text-muted-foreground">8-Step Tool oeffnen</p>
          </div>
          <ArrowRight className="ml-auto mt-0.5 size-3.5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
        <Link
          href="/assistant?expert=pipeline"
          className="group flex items-start gap-3 border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
        >
          <BotMessageSquare className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">Pipeline-Experte</p>
            <p className="text-xs text-muted-foreground">Methodik im Chat vertiefen</p>
          </div>
          <ArrowRight className="ml-auto mt-0.5 size-3.5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
    </div>
  )
}
