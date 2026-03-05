import Link from "next/link"
import { ArrowRight, Lightbulb } from "lucide-react"

interface Intention {
  name: string
  leitfrage: string
  beduerfnis: string
  emotion: string
  strategie: string
  zustand: string
  handlungen: string[]
  wirkungen: string[]
  typischeAeusserungen: string[]
  responseJourney: {
    name: string
    schritte: string[]
  }
}

const intentionen: Intention[] = [
  {
    name: "Akute Sorge",
    leitfrage: "Bin ich krank?",
    beduerfnis: "Sicherheit & Erleichterung",
    emotion: "Angst, Unsicherheit, Dringlichkeit",
    strategie: "Beruhigen ohne zu verharmlosen, Handlungsoptionen aufzeigen, bei Notfall sofort verweisen",
    zustand: "Unsicherheit, Dringlichkeit, Angst vor falscher Einschaetzung",
    handlungen: [
      "Relevanz bewerten",
      "Information verfuegbar machen",
      "Einordnung geben",
      "Naechste Schritte klaeren",
      "Sicherheit absichern",
    ],
    wirkungen: [
      "Unsicherheit wird handhabbar",
      "Es gibt einen klaren naechsten Schritt",
    ],
    typischeAeusserungen: [
      "Ich habe seit Tagen Kopfschmerzen",
      "Mein Kind hat Fieber",
    ],
    responseJourney: {
      name: "Sofort-Triage",
      schritte: ["Notfall-Assessment", "Beruhigung", "Symptom-Strukturierung", "Handlungsoptionen"],
    },
  },
  {
    name: "Frische Diagnose",
    leitfrage: "Was bedeutet das fuer mich?",
    beduerfnis: "Orientierung & Kontrolle",
    emotion: "Schock, Informationshunger, Kontrollverlust",
    strategie: "Orientierung geben, naechste Schritte aufzeigen, nicht mit Informationen ueberfluten",
    zustand: "Ueberforderung, Bedeutungsfrage, Zukunftsoffenheit",
    handlungen: [
      "Zusammenhaenge sichtbar machen",
      "Relevanz bewerten",
      "Information verfuegbar machen",
      "Durch Situation fuehren",
      "Naechste Schritte klaeren",
    ],
    wirkungen: [
      "Die Situation bekommt Struktur",
      "Die Person gewinnt Orientierung",
    ],
    typischeAeusserungen: [
      "Mir wurde gerade Diabetes diagnostiziert",
      "Was ist Pflegegrad 2?",
    ],
    responseJourney: {
      name: "Orientierungs-Journey",
      schritte: ["Emotionale Validierung", "3 wichtigste Schritte in 48h", "Personalisierte Aufklaerung", "Langfrist-Perspektive"],
    },
  },
  {
    name: "Behandlungssuche",
    leitfrage: "Wer kann mir helfen?",
    beduerfnis: "Qualitaet & Effizienz",
    emotion: "Pragmatisch, loesungsorientiert, entschlossen",
    strategie: "Konkrete Anlaufstellen nennen, Wege aufzeigen, AOK-Services verlinken",
    zustand: "Handlungsdruck, Qualitaetsunsicherheit",
    handlungen: [
      "Information verfuegbar machen",
      "Optionen vergleichbar machen",
      "Relevanz bewerten",
      "Entscheidung vorbereiten",
      "Organisation uebernehmen",
    ],
    wirkungen: [
      "Entscheidung fuehlt sich fundiert an",
      "Aufwand und Recherche fallen weg",
    ],
    typischeAeusserungen: [
      "Welcher Arzt ist zustaendig?",
      "Wo finde ich einen Therapeuten?",
    ],
    responseJourney: {
      name: "Qualitaets-Vermittlung",
      schritte: ["Bedarfs-Assessment", "Qualitaetsbewertung", "Praktische Organisation", "Vorbereitung"],
    },
  },
  {
    name: "Leistungsklaerung",
    leitfrage: "Zahlt die AOK das?",
    beduerfnis: "Sicherheit & Pragmatismus",
    emotion: "Unsicherheit ueber Ansprueche, Gerechtigkeitsempfinden",
    strategie: "Allgemeine Leistungsinfos geben, keine individuellen Zusagen, Verweis an Beratung",
    zustand: "Kostenunsicherheit, Regelunklarheit",
    handlungen: [
      "Information verfuegbar machen",
      "Relevanz bewerten",
      "Zusammenhaenge sichtbar machen",
      "Naechste Schritte klaeren",
    ],
    wirkungen: [
      "Klarheit ueber Anspruch und Konsequenzen",
      "Vermeidung von Fehlentscheidungen",
    ],
    typischeAeusserungen: [
      "Wird Physiotherapie bezahlt?",
      "Habe ich Anspruch auf Pflegegeld?",
    ],
    responseJourney: {
      name: "Leistungs-Klarheit",
      schritte: ["Praezise Antworten mit Zahlen", "Alternative Wege", "Antrags-Unterstuetzung", "Kosten-Transparenz"],
    },
  },
  {
    name: "Langzeit-Management",
    leitfrage: "Wie lebe ich damit?",
    beduerfnis: "Autonomie & Stabilitaet",
    emotion: "Akzeptanz, Optimierungswunsch, manchmal Erschoepfung",
    strategie: "Alltagstaugliche Tipps, Selbstmanagement staerken, Entlastungsangebote aufzeigen",
    zustand: "Alltagsintegration, Durchhaltefrage",
    handlungen: [
      "Ueberblick herstellen",
      "Durch Situation fuehren",
      "Relevanz bewerten",
      "Naechste Schritte klaeren",
    ],
    wirkungen: [
      "Das Thema wird kontrollierbar",
      "Es entsteht Routine statt Dauerstress",
    ],
    typischeAeusserungen: [
      "Wie manage ich meinen Diabetes im Alltag?",
      "Tipps fuer die Pflege zu Hause",
    ],
    responseJourney: {
      name: "Langzeit-Begleitung",
      schritte: ["Alltags-Integration", "Motivations-Coaching", "Community-Anbindung", "Optimierung"],
    },
  },
  {
    name: "Angehoerigen-Sorge",
    leitfrage: "Wie helfe ich meinem Angehoerigen?",
    beduerfnis: "Verantwortung & Fuersorge",
    emotion: "Ueberforderung, Pflichtgefuehl, eigene Beduerfnisse zurueckgestellt",
    strategie: "Beide Perspektiven beruecksichtigen, Entlastung aufzeigen, nicht ueberfordern",
    zustand: "Verantwortungsgefuehl, Unsicherheit ueber Rolle",
    handlungen: [
      "Zusammenhaenge sichtbar machen",
      "Relevanz bewerten",
      "Information verfuegbar machen",
      "Durch Situation fuehren",
      "Organisation uebernehmen",
    ],
    wirkungen: [
      "Handlungsspielraum wird klar",
      "Ueberforderung wird reduziert",
    ],
    typischeAeusserungen: [
      "Meine Mutter braucht Pflege",
      "Wie beantrage ich Pflegezeit?",
    ],
    responseJourney: {
      name: "Familien-System-Betreuung",
      schritte: ["Angehoerigen-Entlastung", "Praktische Hilfen", "Kommunikation", "Professionelle Hilfe"],
    },
  },
  {
    name: "Praeventive Vorsorge",
    leitfrage: "Wie bleibe ich gesund?",
    beduerfnis: "Selbstverwirklichung",
    emotion: "Proaktiv, motiviert, informationssuchend",
    strategie: "Positiv verstaerken, konkrete AOK-Angebote nennen, niedrigschwellig halten",
    zustand: "Diffuse Motivation, geringe Dringlichkeit",
    handlungen: [
      "Relevanz bewerten",
      "Optionen vergleichbar machen",
      "Entscheidung vorbereiten",
      "Naechste Schritte klaeren",
      "Ueberblick herstellen",
    ],
    wirkungen: [
      "Praevention fuehlt sich sinnvoll und machbar an",
      "Motivation wird konkret",
    ],
    typischeAeusserungen: [
      "Welche Vorsorge steht mir zu?",
      "Was kann ich fuer meine Gesundheit tun?",
    ],
    responseJourney: {
      name: "Gesundheits-Coaching",
      schritte: ["Risiko-Assessment", "Individueller Plan", "Motivation", "Langfrist-Begleitung"],
    },
  },
]

export default function IntentionenPage() {
  return (
    <div className="mx-auto max-w-4xl py-12">
      {/* Header */}
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Intent-Taxonomie
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        7 Kernintentionen
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Jede Anfrage an den AOK-Assistenten laesst sich einer von sieben Kernintentionen zuordnen.
        Das 3-Ebenen-Modell verbindet den Zustand des Menschen (Intention) mit konkreten
        Denkaufgaben (Handlung) und messbaren Ergebnissen (Wirkung).
      </p>

      {/* 3-Ebenen-Modell */}
      <div className="mb-10 border bg-muted/30 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="size-4 text-primary" />
          <p className="text-sm font-semibold">Das 3-Ebenen-Framework</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <span className="mb-1.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">1</span>
            <p className="mt-1 text-sm font-semibold">Intention</p>
            <p className="text-sm text-muted-foreground">Warum kommt jemand zu SAVA? Der emotionale Zustand und das Grundbeduerfnis.</p>
          </div>
          <div>
            <span className="mb-1.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">2</span>
            <p className="mt-1 text-sm font-semibold">Handlung</p>
            <p className="text-sm text-muted-foreground">Was delegiert der Mensch an SAVA? Konkrete Denkaufgaben, die der Assistent uebernimmt.</p>
          </div>
          <div>
            <span className="mb-1.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">3</span>
            <p className="mt-1 text-sm font-semibold">Wirkung</p>
            <p className="text-sm text-muted-foreground">Was ist nach der Interaktion anders? Messbare Veraenderung beim Menschen.</p>
          </div>
        </div>
      </div>

      {/* 7 Intention-Karten */}
      <div className="flex flex-col gap-4">
        {intentionen.map((intent, index) => (
          <div key={intent.name} className="border bg-card p-5">
            {/* Header */}
            <div className="mb-3 flex items-baseline gap-3">
              <span className="text-xs font-bold text-primary tabular-nums">{index + 1}</span>
              <h2 className="text-base font-bold tracking-tight">{intent.name}</h2>
              <p className="text-sm italic text-muted-foreground">&ldquo;{intent.leitfrage}&rdquo;</p>
            </div>

            {/* Meta-Row */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Beduerfnis</p>
                <p className="text-sm">{intent.beduerfnis}</p>
              </div>
              <div>
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Emotion</p>
                <p className="text-sm">{intent.emotion}</p>
              </div>
              <div>
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Zustand</p>
                <p className="text-sm">{intent.zustand}</p>
              </div>
            </div>

            {/* Delegierte Handlungen */}
            <div className="mt-3 border-t border-dashed border-muted pt-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Delegierte Handlungen</p>
              <div className="flex flex-wrap gap-1.5">
                {intent.handlungen.map((h) => (
                  <span key={h} className="rounded-full bg-muted px-2 py-0.5 text-xs">{h}</span>
                ))}
              </div>
            </div>

            {/* Wirkung */}
            <div className="mt-3 border-t border-dashed border-muted pt-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Wirkung</p>
              <div className="space-y-0.5">
                {intent.wirkungen.map((w) => (
                  <p key={w} className="text-sm font-medium">
                    <ArrowRight className="mr-1.5 inline size-3 text-primary" />
                    {w}
                  </p>
                ))}
              </div>
            </div>

            {/* Typische Aeusserungen */}
            <div className="mt-3 border-t border-dashed border-muted pt-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Typische Aeusserungen</p>
              <div className="space-y-0.5">
                {intent.typischeAeusserungen.map((a) => (
                  <p key={a} className="text-sm italic text-muted-foreground">&ldquo;{a}&rdquo;</p>
                ))}
              </div>
            </div>

            {/* Response-Journey */}
            <div className="mt-3 border-t border-dashed border-muted pt-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Response-Journey</p>
              <p className="text-xs">
                <span className="font-bold">{intent.responseJourney.name}:</span>{" "}
                <span className="text-muted-foreground">{intent.responseJourney.schritte.join(" → ")}</span>
              </p>
            </div>

            {/* Antwort-Strategie */}
            <div className="mt-3 border-t border-dashed border-muted pt-3">
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Antwort-Strategie</p>
              <p className="text-sm">{intent.strategie}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Drei Prinzipien */}
      <div className="mt-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Grundprinzipien
        </p>
        <h2 className="headline-black mb-4 text-2xl">
          Drei wichtige Prinzipien
          <span className="text-primary">.</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border bg-card p-5">
            <p className="mb-1 text-sm font-semibold">Nicht exklusiv</p>
            <p className="text-sm text-muted-foreground">
              Eine Anfrage kann mehrere Intentionen enthalten. &ldquo;Meine Mutter braucht einen Pflegedienst.
              Was zahlt die AOK?&rdquo; ist gleichzeitig Leistungsklaerung und Angehoerigen-Sorge.
              Das System erkennt primaere und sekundaere Intention.
            </p>
          </div>
          <div className="border bg-card p-5">
            <p className="mb-1 text-sm font-semibold">Veraendern sich im Gespraech</p>
            <p className="text-sm text-muted-foreground">
              Ein Nutzer startet bei Akuter Sorge, wechselt zu Leistungsklaerung und dann
              zu Angehoerigen-Sorge. Das System muss den Wechsel erkennen und die Strategie anpassen.
            </p>
          </div>
          <div className="border bg-card p-5">
            <p className="mb-1 text-sm font-semibold">Nicht jeder Assistent bedient alle</p>
            <p className="text-sm text-muted-foreground">
              Ein Pflege-Assistent fokussiert auf Leistungsklaerung, Langzeit-Management und
              Angehoerigen-Sorge. Das Intentionsprofil wird pro Teilprojekt konfiguriert.
            </p>
          </div>
        </div>
      </div>

      {/* Sensor-Expert CTA */}
      <div className="mt-10 border border-primary/20 bg-primary/5 p-6">
        <p className="mb-1 text-sm font-semibold">Intent-Analyse ausprobieren</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Sensor-Experte erkennt Intentionen in Nutzeranfragen und schlaegt passende Antwort-Strategien vor.
        </p>
        <Link
          href="/assistant?expert=simulator"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Sensor-Experte oeffnen
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
