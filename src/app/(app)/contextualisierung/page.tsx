import Link from "next/link"
import { ArrowRight, Lightbulb, AlertTriangle } from "lucide-react"

// --- Data ---

interface KontextDimension {
  name: string
  kernfrage: string
  fehlerBeiAbwesenheit: string
  beispiele: string[]
}

const kontextDimensionen: KontextDimension[] = [
  {
    name: "Bedeutung",
    kernfrage: "Was ist das inhaltlich?",
    fehlerBeiAbwesenheit: "System gibt generische oder falsche Antworten",
    beispiele: [
      "Eindeutige Definitionen pro Begriff, konsistent ueber alle Bausteine",
      "Taxonomien: Pflegegeld ist eine Leistung, Kategorie Pflegeleistungen, setzt Pflegegrad 2+ voraus",
      "Semantische Verknuepfungen: Pflegegeld ist Alternative zu Sachleistung, kombinierbar ueber Kombinationsleistung",
    ],
  },
  {
    name: "Struktur",
    kernfrage: "Wie haengt es zusammen?",
    fehlerBeiAbwesenheit: "System liefert fragmentierte Teilantworten",
    beispiele: [
      "Explizite Relationen: kombinierbar_mit, voraussetzung_fuer, alternative_zu",
      "Hierarchien: Pflegegeld → Pflegeleistungen → Leistungen bei Pflegebeduerftigkeit",
      "Herkunft: Baustein wurde aus welchen Quellseiten extrahiert",
    ],
  },
  {
    name: "Qualitaet",
    kernfrage: "Kann ich mich darauf verlassen?",
    fehlerBeiAbwesenheit: "System nutzt veraltete oder ungepruefte Informationen",
    beispiele: [
      "Aktualitaetsmarker: Stand 2025-01, Pruefintervall bei Gesetzesaenderung",
      "Volatilitaet: Betraege = hoch, Empfehlungen = mittel, SGB-Verweise = stabil",
      "Validierungsstatus: Geprueft durch AOK-Fachredaktion vs. noch nicht validiert",
    ],
  },
  {
    name: "Regeln",
    kernfrage: "Was gilt?",
    fehlerBeiAbwesenheit: "System ueberschreitet Grenzen (Haftung, Datenschutz)",
    beispiele: [
      "Haftungsgrenzen: Allgemeine Information, keine Einzelfallberatung",
      "Eskalationsregeln: Bei welchen Fragen Verweis an persoenliche Beratung",
      "Compliance-Marker: Welche Aussagen darf der Assistent treffen, welche nicht",
    ],
  },
  {
    name: "Zielgruppe",
    kernfrage: "Fuer wen?",
    fehlerBeiAbwesenheit: "System antwortet am Bedarf vorbei",
    beispiele: [
      "Zielgruppen-Tags: pflegebeduerfte, angehoerige, beruflich Pflegende",
      "Kontext-Tags: Pflegegrade, Trimester, Lebenssituation",
      "Sprachebene: Fachsprache vs. Alltagssprache pro Baustein",
    ],
  },
]

interface PipelineSchritt {
  nummer: number
  name: string
  ziel: string
  warumWichtig: string
  input: string
  output: string
  beispiel: string
  akteur: string // "AI" | "Mensch" | "AI + Mensch"
  kernKonzepte: string[]
}

const pipelineSchritte: PipelineSchritt[] = [
  {
    nummer: 1,
    name: "Content-Extraktion",
    ziel: "Alle Artikel eines Themenclusters als sauberen Markdown extrahieren.",
    warumWichtig:
      "Website-Content ist fuer menschliche Leser optimiert: Accordions, Navigation, Footer, CTAs. Ein LLM braucht den reinen Inhalt ohne dieses Rauschen.",
    input: "Liste der Artikel-URLs zum jeweiligen Themencluster",
    output: "Markdown-Dateien, eine pro Artikel, mit Original-URL und Crawl-Datum",
    beispiel:
      "24 Pflege-Unterseiten der AOK-Gesundheitswelt werden via Firecrawl gecrawlt. Accordion-Inhalte werden dabei mit JavaScript-Rendering geoeffnet und extrahiert.",
    akteur: "AI (Firecrawl)",
    kernKonzepte: ["Firecrawl", "JavaScript-Rendering", "Markdown-Konvertierung"],
  },
  {
    nummer: 2,
    name: "Baustein-Extraktion (Pass 1)",
    ziel: "Jeden Artikel in typisierte, atomare Bausteine zerlegen mit freier Kategorisierung.",
    warumWichtig:
      "Ein Artikel vermischt oft mehrere Themen: Betraege, Voraussetzungen, Prozesse und Tipps in einem Fliesstext. Atomare Bausteine machen jede einzelne Information adressierbar.",
    input: "Markdown-Dateien der gecrawlten Artikel",
    output: "Typisierte Bausteine mit freier Kategorie, Titel und Quelle",
    beispiel:
      "Aus einem Pflegegeld-Artikel entstehen: ein LEISTUNG-Baustein (Betraege), ein PROZESS-Baustein (Antragstellung), ein FAKT-Baustein (Kombinierbarkeit) und ein VERWEIS-Baustein (Pflegesachleistung).",
    akteur: "AI (LLM)",
    kernKonzepte: [
      "8 Bausteintypen",
      "Freie Kategorisierung",
      "Atomare Informationseinheiten",
    ],
  },
  {
    nummer: 3,
    name: "Taxonomie-Konsolidierung",
    ziel: "Aus allen frei vergebenen Kategorien eine konsistente Taxonomie ableiten.",
    warumWichtig:
      "Pass 1 erzeugt bewusst inkonsistente Kategorien (Schlaf vs. Schlafposition vs. Nachtruhe). Die Taxonomie ist der Kern des Bedeutungskontexts und definiert, wie das System Themen versteht.",
    input: "Liste aller vergebenen Kategorien mit Haeufigkeit und Beispiel-Bausteinen",
    output: "Finale Taxonomie mit max. 15-20 trennscharfen Kategorien pro Cluster",
    beispiel:
      "Schlaf, Schlafposition und Nachtruhe werden zu einer Kategorie Schlaf & Ruhe zusammengefasst. Pflegegeld und Pflegesachleistung bleiben getrennt, weil sie unterschiedliche Leistungen sind.",
    akteur: "AI + Mensch",
    kernKonzepte: ["Bedeutungskontext", "Synonyme erkennen", "Trennschaerfe"],
  },
  {
    nummer: 4,
    name: "Re-Kategorisierung (Pass 2)",
    ziel: "Alle Bausteine mit der finalen Taxonomie neu zuordnen.",
    warumWichtig:
      "Erst jetzt sind die Kategorien verbindlich. Ohne diesen Schritt wuerden Bausteine unter inkonsistenten Labels liegen und das Retrieval wuerde unzuverlaessig.",
    input: "Alle Bausteine aus Pass 1 + finale Taxonomie",
    output: "Bausteine mit konsistenter Kategorie-Zuordnung",
    beispiel:
      "Ein Baustein mit Kategorie Geldleistung wird automatisch auf Pflegeleistungen/Pflegegeld gemappt. Uneindeutige Faelle gehen zur manuellen Pruefung.",
    akteur: "AI + Mensch",
    kernKonzepte: [
      "Automatisches Mapping",
      "Stichproben-Kontrolle",
      "Konsistenz",
    ],
  },
  {
    nummer: 5,
    name: "Gruppierung & Duplikat-Erkennung",
    ziel: "Bausteine nach Kategorie gruppieren, Ueberschneidungen und Duplikate identifizieren.",
    warumWichtig:
      "Dieselbe Information steht oft auf mehreren Website-Seiten. Ohne Duplikat-Erkennung wuerde der Assistent widerspruechliche oder redundante Antworten liefern.",
    input: "Kategorisierte Bausteine",
    output: "Liste von Duplikat-Clustern mit betroffenen Bausteinen und Quellen",
    beispiel:
      "Drei Bausteine beschreiben Pflegegeld-Betraege: einer von der Leistungsseite, einer vom Ueberblick, einer aus einem Ratgeber. Alle drei werden als Duplikat-Cluster erkannt (erwartete Rate: 20-30%).",
    akteur: "AI (Embedding + LLM)",
    kernKonzepte: [
      "Cosine Similarity",
      "Semantische Duplikate",
      "Widerspruchserkennung",
    ],
  },
  {
    nummer: 6,
    name: "Konsolidierung",
    ziel: "Aus Duplikat-Clustern jeweils einen finalen, vollstaendigen Baustein erstellen.",
    warumWichtig:
      "Der aufwaendigste Schritt. Hier entsteht die eigentliche Qualitaet der Knowledge Base. Jede Information soll genau einmal existieren, in der praezisesten Formulierung.",
    input: "Duplikat-Cluster mit allen betroffenen Bausteinen",
    output: "Konsolidierte Bausteine ohne Redundanz, mit Quellenliste",
    beispiel:
      "Drei Pflegegeld-Bausteine werden zu einem zusammengefuehrt: Betraege von Seite A (aktuellste), Voraussetzungen von Seite B (detaillierteste), Kombinierbarkeit von Seite C. Widersprueche werden markiert.",
    akteur: "AI + Mensch",
    kernKonzepte: [
      "Informationsverdichtung",
      "Widersprueche aufloesen",
      "Quellen-Tracking",
    ],
  },
  {
    nummer: 7,
    name: "Kontext-Anreicherung & Struktur-Aufbau",
    ziel: "Konsolidierte Bausteine mit allen fuenf Kontextdimensionen als Metadaten anreichern.",
    warumWichtig:
      "Dieser Schritt macht den Unterschied zwischen FAQ-Sammlung und echter Wissensbasis. Ohne Kontext-Anreicherung fehlen dem Assistenten Haftungsgrenzen, Aktualitaetsinfos und Zielgruppen-Wissen.",
    input: "Konsolidierte Bausteine",
    output:
      "Markdown-Dateien mit Frontmatter (5 Dimensionen) + strukturiertem Body, abgelegt in Cluster-Ordnern",
    beispiel:
      "Der Pflegegeld-Baustein erhaelt: typ: LEISTUNG, rechtsgrundlage: SGB XI §37, volatilitaet: hoch, zielgruppe: [pflegebeduerfte, angehoerige], relationen zu Sachleistung und Kombinationsleistung.",
    akteur: "AI + Mensch",
    kernKonzepte: [
      "5 Kontextdimensionen",
      "Frontmatter-Schema",
      "Relationen",
      "Cluster-Struktur",
    ],
  },
  {
    nummer: 8,
    name: "Qualitaetssicherung durch AOK",
    ziel: "Fachredakteure pruefen Bausteine auf medizinische und rechtliche Korrektheit.",
    warumWichtig:
      "Ein Assistent einer Krankenkasse darf keine falschen Betraege oder veralteten Rechtsgrundlagen nennen. Die QS ist kein einmaliger Schritt, sondern ein laufender Prozess, gesteuert durch Volatilitaetsmarker.",
    input: "Angereicherte Bausteine mit Validierungsstatus false",
    output: "Validierte Bausteine (korrekt / aenderung noetig / falsch)",
    beispiel:
      "AOK-Fachredaktion prueft Pflegegeld-Betraege gegen aktuelle Gesetzeslage, korrigiert den Betrag fuer Pflegegrad 3 und setzt validiert: true mit Pruefdatum.",
    akteur: "Mensch (AOK)",
    kernKonzepte: [
      "Fachredaktionelle Pruefung",
      "Volatilitaets-Pruefintervalle",
      "Validierungsstatus",
    ],
  },
]

const bausteinTypen = [
  {
    typ: "FAKT",
    beschreibung: "Objektive, faktenbasierte Sachinformation",
    beispiel: "Pflegegeld Grad 2: 332 EUR monatlich",
  },
  {
    typ: "EMPFEHLUNG",
    beschreibung: "Handlungsorientierte Einordnung mit klarer Richtung",
    beispiel: "Kombinationsleistung pruefen: oft guenstiger als reines Pflegegeld",
  },
  {
    typ: "ANLEITUNG",
    beschreibung: "Schritt-fuer-Schritt-Prozess",
    beispiel: "Pflegegrad beantragen: 1. Antrag, 2. MD-Besuch...",
  },
  {
    typ: "FAQ",
    beschreibung: "Frage-Antwort-Paar",
    beispiel: "Kann ich Pflegegeld und Sachleistung kombinieren?",
  },
  {
    typ: "CHECKLISTE",
    beschreibung: "Pruefbare Punkte fuer eine Situation",
    beispiel: "Checkliste: Unterlagen fuer den Pflegegrad-Antrag",
  },
  {
    typ: "VERGLEICH",
    beschreibung: "Gegenuberstellung von Optionen",
    beispiel: "Pflegegeld vs. Pflegesachleistung: Unterschiede",
  },
  {
    typ: "GLOSSAR",
    beschreibung: "Begriffsdefinition",
    beispiel: "Verhinderungspflege: Ersatzpflege bei Ausfall der Pflegeperson",
  },
  {
    typ: "NAVIGATION",
    beschreibung: "Verweis auf verwandtes Thema oder Anlaufstelle",
    beispiel: "Fuer Kombinationsleistung siehe: pflege/leistungen/kombi",
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
        Website-Content ist fuer menschliche Leser optimiert. Ein AI-Assistent braucht
        strukturiertes Wissen mit explizitem Kontext. Die Contextualisierung transformiert
        AOK-Webinhalte in eine 8-Schritte-Pipeline von rohem HTML zu angereicherten
        Wissensbausteinen mit fuenf Kontextdimensionen.
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
              <li>Atomare, in sich geschlossene Wissenseinheiten</li>
              <li>Explizite Zusammenhaenge und Relationen</li>
              <li>Metadaten: Aktualitaet, Haftung, Zielgruppe</li>
              <li>Konsistente Taxonomie und Struktur</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5 Kontextdimensionen */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="size-4 text-primary" />
          <p className="text-sm font-semibold">Fuenf Kontextdimensionen</p>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Vollstaendiger Kontext beantwortet fuenf Fragen. Jede fehlende Dimension erzeugt
          eine spezifische Art von Fehler im AI-System.
        </p>
        <div className="flex flex-col gap-3">
          {kontextDimensionen.map((dim, i) => (
            <div key={dim.name} className="border bg-card p-4">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold">{dim.name}</h3>
                <p className="text-sm italic text-muted-foreground">&ldquo;{dim.kernfrage}&rdquo;</p>
              </div>
              <p className="mb-2 text-xs text-red-600">
                Wenn fehlend: {dim.fehlerBeiAbwesenheit}
              </p>
              <div className="space-y-0.5">
                {dim.beispiele.map((b) => (
                  <p key={b} className="text-sm text-muted-foreground">
                    <ArrowRight className="mr-1.5 inline size-3 text-primary" />
                    {b}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8 Bausteintypen */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Bausteintypen
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          7 Wissensbausteine
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Jeder extrahierte Inhalt wird einem von acht Bausteintypen zugeordnet.
          Der Typ bestimmt die interne Struktur und welche Kontextdimensionen besonders kritisch sind.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {bausteinTypen.map((bt) => (
            <div key={bt.typ} className="border bg-card p-3">
              <p className="text-xs font-bold text-primary">{bt.typ}</p>
              <p className="text-sm">{bt.beschreibung}</p>
              <p className="mt-1 text-xs italic text-muted-foreground">&ldquo;{bt.beispiel}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8-Schritte-Pipeline */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Transformations-Pipeline
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          8 Schritte
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Der Prozess ist als Multi-Step-Pipeline angelegt. Jeder Schritt hat ein klares Ziel,
          definierte Ein- und Ausgaben und einen verantwortlichen Akteur.
        </p>

        <div className="flex flex-col gap-4">
          {pipelineSchritte.map((schritt) => (
            <div key={schritt.nummer} className="border bg-card p-5">
              {/* Header */}
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-xs font-bold text-primary tabular-nums">{schritt.nummer}</span>
                <h3 className="text-base font-bold tracking-tight">{schritt.name}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {schritt.akteur}
                </span>
              </div>

              {/* Ziel */}
              <p className="mb-3 text-sm">{schritt.ziel}</p>

              {/* Warum wichtig */}
              <div className="mb-3 border-t border-dashed border-muted pt-3">
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Warum dieser Schritt wichtig ist
                </p>
                <p className="text-sm text-muted-foreground">{schritt.warumWichtig}</p>
              </div>

              {/* Input / Output */}
              <div className="mb-3 grid gap-3 border-t border-dashed border-muted pt-3 sm:grid-cols-2">
                <div>
                  <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Input</p>
                  <p className="text-sm">{schritt.input}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Output</p>
                  <p className="text-sm">{schritt.output}</p>
                </div>
              </div>

              {/* Beispiel */}
              <div className="mb-3 border-t border-dashed border-muted pt-3">
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Beispiel</p>
                <p className="text-sm italic text-muted-foreground">{schritt.beispiel}</p>
              </div>

              {/* Kernkonzepte */}
              <div className="border-t border-dashed border-muted pt-3">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Kernkonzepte</p>
                <div className="flex flex-wrap gap-1.5">
                  {schritt.kernKonzepte.map((k) => (
                    <span key={k} className="rounded-full bg-muted px-2 py-0.5 text-xs">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vorher/Nachher */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Transformation
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Vorher vs. Nachher
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Am Beispiel Pflegegeld: Was die Website liefert und was der Assistent braucht.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-red-200 bg-red-50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-800">Website-Content</p>
            <p className="text-sm italic text-red-900">
              &ldquo;Pflegegeld erhalten Pflegebeduerfte, die zu Hause von Angehoerigen
              oder Freunden gepflegt werden. Die Hoehe richtet sich nach dem Pflegegrad.&rdquo;
            </p>
            <p className="mt-2 text-xs text-red-700">
              Fuenf Saetze, eine Verlinkung. Dem LLM fehlen: Betraege, Voraussetzungen,
              Abgrenzung zur Sachleistung, Kombinierbarkeit, Rechtsgrundlage, Zielgruppe,
              Aktualitaet, Haftungsgrenze.
            </p>
          </div>
          <div className="border border-green-200 bg-green-50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-800">Context-Baustein</p>
            <div className="space-y-1 text-xs text-green-900">
              <p><span className="font-semibold">typ:</span> LEISTUNG</p>
              <p><span className="font-semibold">rechtsgrundlage:</span> SGB XI §37</p>
              <p><span className="font-semibold">volatilitaet:</span> hoch</p>
              <p><span className="font-semibold">zielgruppe:</span> pflegebeduerfte, angehoerige</p>
              <p><span className="font-semibold">relationen:</span> kombinierbar_mit Sachleistung, voraussetzung Pflegegrade</p>
              <p><span className="font-semibold">haftung:</span> Allgemeine Information, keine Einzelfallberatung</p>
            </div>
            <p className="mt-2 text-xs text-green-700">
              + strukturierter Body mit Betraegen, Voraussetzungen, Antragstellung, Besonderheiten.
            </p>
          </div>
        </div>
      </div>

      {/* Zwei-Ebenen-Modell */}
      <div className="mb-10 border bg-muted/30 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="size-4 text-primary" />
          <p className="text-sm font-semibold">Zwei-Ebenen-Modell: Content und Context</p>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Zukuenftig braucht die AOK zwei Ausspielungsebenen fuer ihr Wissen.
          Beide haben ihre Berechtigung. Die Vision: Write Once, Publish Twice.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-semibold">Content-Ebene (Website)</p>
            <ul className="space-y-0.5 text-sm text-muted-foreground">
              <li>Menschen informieren, SEO, Conversion</li>
              <li>HTML, Bilder, Videos, CTAs</li>
              <li>Emotional, Marketing, Storytelling</li>
              <li>Kontext implizit (Leser erschliesst selbst)</li>
            </ul>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold">Context-Ebene (AI-Assistent)</p>
            <ul className="space-y-0.5 text-sm text-muted-foreground">
              <li>LLMs mit strukturiertem Wissen versorgen</li>
              <li>Markdown-Chunks mit Metadaten</li>
              <li>Faktisch, praezise, vollstaendig</li>
              <li>Kontext explizit (5 Dimensionen als Metadaten)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pipeline-Expert CTA */}
      <div className="mt-10 border border-primary/20 bg-primary/5 p-6">
        <p className="mb-1 text-sm font-semibold">Pipeline-Methodik vertiefen</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Pipeline-Experte kennt alle 8 Schritte, 8 Bausteintypen und 5 Kontextdimensionen im Detail
          und beantwortet Fragen zur Methodik.
        </p>
        <Link
          href="/assistant?expert=pipeline"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Pipeline-Experte oeffnen
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
