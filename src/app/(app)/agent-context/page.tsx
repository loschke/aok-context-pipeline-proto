import Link from "next/link"
import { ArrowRight, Lightbulb, Database } from "lucide-react"

// --- Data ---

const kontextQuellen = [
  {
    name: "Strukturiertes Fachwissen",
    typ: "Build" as const,
    beschreibung:
      "Redaktionell geprueftes Faktenwissen aus den Content-Pipelines. Liegt entweder als Cluster-Dokument (ein Markdown pro Thema) oder als atomare Wissensbausteine (mit Frontmatter-Metadaten) vor. Beides ist validiert und direkt als LLM-Context nutzbar.",
    beispiele: [
      "Pflegegeld-Betraege nach Pflegegrad mit Rechtsgrundlage",
      "Schritt-fuer-Schritt-Anleitung Pflegegrad beantragen",
      "Vergleich: Pflegegeld vs. Pflegesachleistung",
    ],
    status: "Verfuegbar",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    name: "Tools & Datenbanken",
    typ: "Hybrid" as const,
    beschreibung:
      "AOK-Werkzeuge und Datenbanken, die der Assistent per API aufruft. Manche liefern statisch hinterlegte Daten (Oeffnungszeiten, Adressen), andere berechnen oder filtern auf Basis von Nutzereingaben. Derselbe Tool-Call kann je nach Aufruf Build oder Runtime sein.",
    beispiele: [
      "Pflegegradrechner (Ersteinschaetzung auf Basis von Eingaben)",
      "AOK-Pflegenavigator (ambulante Dienste nach PLZ und Leistungsart)",
      "Filial-Oeffnungszeiten (statisch hinterlegt, nur abgeholt)",
    ],
    status: "Teilweise verfuegbar",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    name: "Echtzeit-Daten",
    typ: "Runtime" as const,
    beschreibung:
      "Dynamische Informationen, die sich laufend aendern. Existieren erst im Moment der Abfrage. Erfordern API-Anbindungen an AOK-Systeme oder externe Datenquellen.",
    beispiele: [
      "Wartezeiten MD-Begutachtung nach Region",
      "Aktuelle Verfuegbarkeit von Pflegediensten",
      "Terminverfuegbarkeit in AOK-Kundencentern",
    ],
    status: "Nicht verfuegbar",
    statusColor: "bg-muted text-muted-foreground",
  },
  {
    name: "Nutzerprofil",
    typ: "Runtime" as const,
    beschreibung:
      "Personalisierung auf Basis bekannter Nutzerdaten. Ermoeglichen massgeschneiderte Antworten statt generischer Informationen. Erfordert Authentifizierung und Datenschutz-Freigabe.",
    beispiele: [
      "Bekannter Pflegegrad → konkrete Betraege statt Tabelle",
      "PLZ → regionale Angebote und zustaendiges Kundencenter",
      "Bereits genutzte Leistungen → proaktive Hinweise auf Kombinierbarkeit",
    ],
    status: "Nicht verfuegbar (MGW)",
    statusColor: "bg-muted text-muted-foreground",
  },
]

const typColors = {
  Build: "bg-blue-100 text-blue-800",
  Hybrid: "bg-violet-100 text-violet-800",
  Runtime: "bg-amber-100 text-amber-800",
} as const

const retrievalStufen = [
  {
    stufe: 1,
    name: "Full Context Loading",
    prinzip: "Den gesamten Context eines Clusters komplett ins Context Window laden.",
    wieEsFunktioniert:
      "Ein Cluster-Dokument (4.000-27.000 Tokens) oder alle Bausteine eines Clusters (20.000-60.000 Tokens) werden vollstaendig geladen. Das LLM durchsucht den Context selbst und findet die relevanten Stellen.",
    staerken: [
      "Setup in 1-2 Stunden",
      "Kein Retrieval-Algorithmus noetig",
      "LLM findet selbst die relevanten Teile",
    ],
    grenzen: [
      "Skaliert nicht ueber 1-2 Cluster",
      "Hoehere Token-Kosten pro Anfrage",
      "Bei grossen Clustern: Latenz durch langes Context Window",
    ],
    geeignetFuer: "Demo, Proof of Concept, Fokus-Assistenten, Content-Validierung",
  },
  {
    stufe: 2,
    name: "MCP Server",
    prinzip:
      "Model Context Protocol als Schnittstelle. Der Assistent ruft aktiv Context ab statt alles vorzuladen.",
    wieEsFunktioniert:
      "Der MCP Server liest Markdown-Dateien, parst Metadaten und stellt Such-Tools bereit: suche_context(), hole_dokument(), zeige_relationen(). Der Assistent entscheidet per Tool-Call, welchen Context er braucht.",
    staerken: [
      "Laedt nur relevanten Context",
      "Skaliert cluster-uebergreifend",
      "Setup in 4-8 Stunden",
    ],
    grenzen: [
      "Suche nur ueber Metadaten, nicht semantisch",
      "Assistent muss wissen, wonach er suchen soll",
      "Kein Web-Interface fuer Redaktion",
    ],
    geeignetFuer: "Prototyp mit mehreren Clustern, technische Validierung",
  },
  {
    stufe: 3,
    name: "Vector DB + Hybride Suche",
    prinzip:
      "Semantische Aehnlichkeit (Vektorsuche) kombiniert mit Metadaten-Filtern (Frontmatter-Felder).",
    wieEsFunktioniert:
      "Jede Wissenseinheit wird als Embedding gespeichert, Metadaten als filterbare Felder. Bei einer Anfrage: Vektorsuche findet semantisch aehnliche Inhalte, Metadaten-Filter grenzt ein (Cluster, Zielgruppe, Pflegegrad), Re-Ranking liefert die relevantesten.",
    staerken: [
      "Semantisches Verstehen freier Nutzerfragen",
      "Skaliert auf Tausende Wissenseinheiten",
      "Praezise durch hybride Filterung",
    ],
    grenzen: [
      "Setup: Tage bis Wochen",
      "Jede Aenderung erfordert Re-Embedding",
      "DSGVO: EU-Hosting Pflicht fuer AOK-Daten",
    ],
    geeignetFuer: "Produktionssystem, Multi-Cluster-Betrieb",
  },
  {
    stufe: 4,
    name: "Tool-APIs und Live-Daten",
    prinzip:
      "Der Assistent ruft ueber API-Schnittstellen Datenbanken, Rechner und externe Services auf und speist deren Ergebnisse in den Context ein.",
    wieEsFunktioniert:
      "Parallel zum Wissens-Retrieval erkennt der Assistent, ob die Anfrage Live-Daten erfordert. Ueber definierte Tool-Calls greift er auf AOK-Services zu: pflegenavigator_suche(plz, leistungsart) liefert konkrete Pflegedienste, pflegegradrechner(eingaben) berechnet eine Ersteinschaetzung, kundencenter_finden(region) zeigt Anlaufstellen. Die Ergebnisse fliessen zusammen mit den Wissensbausteinen in den Context.",
    staerken: [
      "Konkrete, personalisierte Antworten statt generischer Infos",
      "Ergebnisse sind immer aktuell",
      "Kombinierbar mit jeder Wissens-Retrieval-Stufe",
    ],
    grenzen: [
      "Pro Service eigene API-Anbindung noetig",
      "Abhaengig von Verfuegbarkeit der AOK-Systeme",
      "Latenz: API-Calls brauchen Zeit",
    ],
    geeignetFuer: "Produktionssystem mit Tool-Integration, personalisierte Beratung",
  },
]

const blaupauseAbschnitte = [
  {
    name: "Intentionsprofil",
    frage: "Welche der 7 Intentionen bedient dieser Cluster?",
    beispiel:
      "Pflege-Cluster: Primaer I4 (Leistungsklaerung), I6 (Angehoerigen-Sorge), I5 (Langzeit-Management). Sekundaer I2 (Frische Diagnose bei erstem Pflegegrad). Nicht im Scope: I7 (Praevention).",
  },
  {
    name: "Kontextquellen-Inventar",
    frage: "Welche Quellen stehen fuer diesen Cluster zur Verfuegung — Build, Runtime, Hybrid?",
    beispiel:
      "Fachwissen (Build): Cluster-Dokument aus 10 Webseiten oder 15 atomare Bausteine, vorhanden. Tools (Hybrid): Pflegegradrechner, Pflegestuetzpunkt-Finder — AOK-Tools existieren, Anbindung offen. Echtzeit-Daten (Runtime): nicht verfuegbar. Nutzerprofil (Runtime): nicht verfuegbar.",
  },
  {
    name: "Kompass-Konfiguration",
    frage: "Welche Leitplanken sind fuer diesen Cluster besonders relevant?",
    beispiel:
      "Hard Constraints: Keine Pflegegrad-Zusagen, keine Diagnosen, Eskalation bei Einzelfall. Konfigurierbare Verhaltensweisen: Proaktive Hinweise auf Entlastungsleistungen aktivieren. Vertrauens-Hierarchie: SGB XI vor AOK-Empfehlungen vor Erfahrungswissen.",
  },
  {
    name: "Qualitaets-Check",
    frage: "Erfuellt der Context die Qualitaetskriterien?",
    beispiel:
      "Cluster-Dokument: Keine Marketing-Sprache, jeder Absatz mit konkretem Fakt, Betraege mit Kontext, keine Wiederholungen, Quellen dokumentiert? Bausteine: 5 Dimensionen gefuellt (Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe), Relationen bidirektional?",
  },
  {
    name: "Retrieval-Konfiguration",
    frage: "Welche Retrieval-Stufe wird fuer diesen Cluster eingesetzt?",
    beispiel:
      "PoC-Phase: Stufe 1 (Full Context Loading), Cluster-Dokument oder alle Bausteine komplett laden. Naechster Schritt: Stufe 2 (MCP Server) fuer cluster-uebergreifende Suche. Tool-APIs: Pflegegradrechner und Pflegenavigator parallel anbinden (Stufe 4).",
  },
  {
    name: "Abnahme und Freigabe",
    frage: "Wer prueft, wer gibt frei, was ist das Qualitaetskriterium?",
    beispiel:
      "Fachliche Pruefung durch AOK-Fachredaktion (inhaltliche Korrektheit, Aktualitaet). Technische Pruefung durch Projektteam (Dimensionen vollstaendig, Relationen konsistent, Retrieval-Test bestanden). Freigabe erst wenn beide Seiten abnehmen.",
  },
]

// --- Component ---

export default function AgentContextPage() {
  return (
    <div className="mx-auto max-w-4xl py-12">
      {/* Header */}
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Runtime-Wissen
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Agent Context
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Die Contextualisierung baut das Wissen auf. Agent Context beschreibt,
        was der Assistent im Moment der Antwort tatsaechlich weiss: welche Quellen
        ihm zur Verfuegung stehen, wie er den richtigen Context findet und wie
        ein neuer Themencluster konfiguriert wird.
      </p>

      {/* Kernprinzip */}
      <div className="mb-10 border bg-muted/30 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="size-4 text-primary" />
          <p className="text-sm font-semibold">Kernprinzip</p>
        </div>
        <p className="text-sm">
          Context ist alles, was der Assistent braucht, um eine Frage zu beantworten.
          Nicht nur strukturiertes Fachwissen — ob als Cluster-Dokument oder als atomare
          Bausteine — sondern auch Tools, Datenbanken und Nutzerdaten. Ein Context weiss
          nicht, wer ihn nutzt. Er weiss nur, was wahr ist und was zur Verfuegung steht.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Tonalitaet, Empathie, Kanalanpassung — das ist Sache des Kommunikations-Layers.
        </p>
      </div>

      {/* Zwei Typen von Context */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Grundunterscheidung
        </p>
        <h2 className="headline-black mb-4 text-2xl">
          Zwei Typen von Context
          <span className="text-primary">.</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border bg-card p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">Build</span>
              <p className="text-sm font-bold">Build Context</p>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Vor dem Gespraech aufgebaut. Redaktionell geprueft, versioniert,
              aendert sich nur durch bewusste Aktualisierung. Die Redaktion kontrolliert,
              was der Assistent weiss.
            </p>
            <div className="space-y-0.5 border-t border-dashed border-muted pt-3">
              <p className="text-xs text-muted-foreground">
                <ArrowRight className="mr-1 inline size-3 text-primary" />
                Strukturiertes Fachwissen aus den Pipelines
              </p>
              <p className="text-xs text-muted-foreground">
                <ArrowRight className="mr-1 inline size-3 text-primary" />
                Statisch hinterlegte Daten (z.B. Filial-Oeffnungszeiten)
              </p>
              <p className="text-xs text-muted-foreground">
                <ArrowRight className="mr-1 inline size-3 text-primary" />
                Tool-Beschreibungen (wann ist welches Tool relevant)
              </p>
            </div>
          </div>
          <div className="border bg-card p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">Runtime</span>
              <p className="text-sm font-bold">Runtime Context</p>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Existiert erst im Moment der Anfrage. Haengt von Nutzereingabe,
              Zeitpunkt oder Standort ab. Die Anfrage bestimmt, was zurueckkommt.
            </p>
            <div className="space-y-0.5 border-t border-dashed border-muted pt-3">
              <p className="text-xs text-muted-foreground">
                <ArrowRight className="mr-1 inline size-3 text-primary" />
                Berechnungen (Pflegegradrechner mit Eingaben)
              </p>
              <p className="text-xs text-muted-foreground">
                <ArrowRight className="mr-1 inline size-3 text-primary" />
                Echtzeit-Daten (Wartezeiten, Verfuegbarkeit)
              </p>
              <p className="text-xs text-muted-foreground">
                <ArrowRight className="mr-1 inline size-3 text-primary" />
                Nutzerdaten (Pflegegrad, PLZ, genutzte Leistungen)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vier Kontextquellen */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Kontextquellen
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Vier Quellen, ein Context
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Agent Context setzt sich aus vier Quellen zusammen. Heute ist strukturiertes
          Fachwissen die Hauptquelle. Tools kommen dazu, Echtzeit-Daten und Nutzerprofil
          sind Zukunft. Je mehr Quellen verfuegbar sind, desto praeziser und persoenlicher
          die Antwort.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {kontextQuellen.map((quelle) => (
            <div key={quelle.name} className="border bg-card p-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${typColors[quelle.typ]}`}>
                    {quelle.typ}
                  </span>
                  <p className="text-sm font-bold">{quelle.name}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${quelle.statusColor}`}>
                  {quelle.status}
                </span>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{quelle.beschreibung}</p>
              <div className="space-y-0.5">
                {quelle.beispiele.map((b) => (
                  <p key={b} className="text-xs text-muted-foreground">
                    <ArrowRight className="mr-1 inline size-3 text-primary" />
                    {b}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Je mehr Quellen zusammenspielen, desto konkreter und persoenlicher die Antwort.
          Build Context liefert das gepruefte Fachwissen, Runtime Context macht es situativ.
        </p>

        {/* Kompass als Querschnitt */}
        <div className="mt-4 border border-primary/20 bg-primary/5 p-5">
          <p className="mb-1 text-sm font-bold">Dazu kommt: der Kompass</p>
          <p className="mb-3 text-sm text-muted-foreground">
            Unabhaengig von Typ und Quelle gilt fuer jede Antwort die Verfassung des Assistenten:
            5 Kernwerte, 5 Hard Constraints, Vertrauens-Hierarchie. Der Kompass ist kein Context
            im klassischen Sinn, sondern die Leitplanke, die bestimmt, was der Assistent mit dem
            Context tun darf und was nicht.
          </p>
          <Link
            href="/kompass"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Kompass im Detail
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Retrieval */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Retrieval-Architektur
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Wie der Assistent den richtigen Context findet
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Stufe 1-3 beschreiben, wie der Assistent das richtige Wissen findet — aufeinander aufbauend,
          jede loest ein Problem der vorherigen. Stufe 4 ergaenzt den zweiten Retrieval-Pfad:
          Live-Daten aus Tools, Datenbanken und externen Services.
        </p>

        <div className="flex flex-col gap-4">
          {retrievalStufen.map((stufe) => (
            <div key={stufe.stufe} className="border bg-card p-5">
              {/* Header */}
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-xs font-bold text-primary tabular-nums">{stufe.stufe}</span>
                <h3 className="text-base font-bold tracking-tight">{stufe.name}</h3>
              </div>

              {/* Prinzip */}
              <p className="mb-3 text-sm">{stufe.prinzip}</p>

              {/* Wie es funktioniert */}
              <div className="mb-3 border-t border-dashed border-muted pt-3">
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wie es funktioniert
                </p>
                <p className="text-sm text-muted-foreground">{stufe.wieEsFunktioniert}</p>
              </div>

              {/* Staerken / Grenzen */}
              <div className="mb-3 grid gap-3 border-t border-dashed border-muted pt-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Staerken</p>
                  <div className="space-y-0.5">
                    {stufe.staerken.map((s) => (
                      <p key={s} className="text-sm text-muted-foreground">
                        <ArrowRight className="mr-1 inline size-3 text-green-600" />
                        {s}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Grenzen</p>
                  <div className="space-y-0.5">
                    {stufe.grenzen.map((g) => (
                      <p key={g} className="text-sm text-muted-foreground">
                        <ArrowRight className="mr-1 inline size-3 text-amber-600" />
                        {g}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geeignet fuer */}
              <div className="border-t border-dashed border-muted pt-3">
                <p className="text-xs">
                  <span className="font-semibold">Geeignet fuer:</span>{" "}
                  <span className="text-muted-foreground">{stufe.geeignetFuer}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          In der Praxis laufen Wissens-Retrieval und Tool-Aufrufe parallel. Der Assistent sucht
          den passenden Context und fragt gleichzeitig relevante Services ab. Beides fliesst
          zusammen in den Gesamt-Context, aus dem die Antwort entsteht.
        </p>
      </div>

      {/* Blaupause */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Cluster-Konfiguration
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Die Blaupause pro Themencluster
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Jeder neue Themencluster (Pflege, Schwangerschaft, Diabetes) durchlaeuft dasselbe
          Template. Die Blaupause stellt sicher, dass nichts vergessen wird und der Assistent
          fuer jeden Cluster korrekt konfiguriert ist.
        </p>

        <div className="flex flex-col gap-3">
          {blaupauseAbschnitte.map((abschnitt, i) => (
            <div key={abschnitt.name} className="border bg-card p-4">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold">{abschnitt.name}</h3>
              </div>
              <p className="mb-2 text-sm italic text-muted-foreground">{abschnitt.frage}</p>
              <div className="border-t border-dashed border-muted pt-2">
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Beispiel: Pflege-Cluster</p>
                <p className="text-sm text-muted-foreground">{abschnitt.beispiel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context ≠ Kommunikation */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Architekturprinzip
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Context ≠ Kommunikation
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Metadaten wie Zielgruppe und Kontext-Tags helfen den richtigen Context zur Laufzeit
          zu finden. Sie bestimmen nicht, wie er kommuniziert wird. Derselbe Context bedient
          voellig unterschiedliche Situationen.
        </p>
        <div className="border bg-card p-5">
          <p className="mb-3 text-sm font-bold">Beispiel: Pflegegeld-Context</p>
          <p className="mb-3 text-sm text-muted-foreground">
            Dasselbe Wissen ueber Pflegegeld. Drei verschiedene Intentionen. Drei verschiedene Antworten.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 border-t border-dashed border-muted pt-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">I2</span>
              <div>
                <p className="text-sm font-semibold">Frische Diagnose</p>
                <p className="text-xs text-muted-foreground">
                  &ldquo;Was bedeutet Pflegegrad 2?&rdquo; → Orientierung geben, Pflegegeld als eine von mehreren Leistungen einordnen, nicht ueberfluten
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-dashed border-muted pt-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">I4</span>
              <div>
                <p className="text-sm font-semibold">Leistungsklaerung</p>
                <p className="text-xs text-muted-foreground">
                  &ldquo;Wie viel Pflegegeld gibt es?&rdquo; → Direkt die Betraege nennen, Kombinierbarkeit mit Sachleistung erwaehnen, Antragsprozess skizzieren
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-dashed border-muted pt-2">
              <span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">I5</span>
              <div>
                <p className="text-sm font-semibold">Langzeit-Management</p>
                <p className="text-xs text-muted-foreground">
                  &ldquo;Wie organisiere ich die Pflege dauerhaft?&rdquo; → Pflegegeld als Teil des Gesamtpakets, Verweis auf Verhinderungspflege und Entlastung
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Der Context liefert das Was. Wie es beim Nutzer ankommt — Tonalitaet, Kanal,
            Format — das steuert der Kommunikations-Layer.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 border border-primary/20 bg-primary/5 p-6">
        <p className="mb-1 text-sm font-semibold">Context-Architektur vertiefen</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Engine-Experte kennt alle drei Schichten der SAVA-Architektur und erklaert
          Zusammenhaenge zwischen Context, Intentionen und Kommunikation.
        </p>
        <Link
          href="/assistant?expert=engine"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Engine-Experte oeffnen
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
