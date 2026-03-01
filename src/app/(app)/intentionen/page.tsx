import Link from "next/link"
import { ArrowRight } from "lucide-react"

const intentionen = [
  {
    name: "Akute Sorge",
    leitfrage: "Bin ich krank?",
    beduerfnis: "Sicherheit & Erleichterung",
    emotion: "Angst, Unsicherheit, Dringlichkeit",
    strategie: "Beruhigen ohne zu verharmlosen, Handlungsoptionen aufzeigen, bei Notfall sofort verweisen",
  },
  {
    name: "Frische Diagnose",
    leitfrage: "Was bedeutet das fuer mich?",
    beduerfnis: "Orientierung & Kontrolle",
    emotion: "Schock, Informationshunger, Kontrollverlust",
    strategie: "Orientierung geben, naechste Schritte aufzeigen, nicht mit Informationen ueberfluten",
  },
  {
    name: "Behandlungssuche",
    leitfrage: "Wer kann mir helfen?",
    beduerfnis: "Qualitaet & Effizienz",
    emotion: "Pragmatisch, loesungsorientiert",
    strategie: "Konkrete Anlaufstellen nennen, Wege aufzeigen, AOK-Services verlinken",
  },
  {
    name: "Leistungsklaerung",
    leitfrage: "Zahlt die AOK das?",
    beduerfnis: "Sicherheit & Pragmatismus",
    emotion: "Unsicherheit ueber Ansprueche, Gerechtigkeitsempfinden",
    strategie: "Allgemeine Leistungsinfos geben, keine individuellen Zusagen, Verweis an Beratung",
  },
  {
    name: "Langzeit-Management",
    leitfrage: "Wie lebe ich damit?",
    beduerfnis: "Autonomie & Stabilitaet",
    emotion: "Akzeptanz, Optimierungswunsch, manchmal Erschoepfung",
    strategie: "Alltagstaugliche Tipps, Selbstmanagement staerken, Entlastungsangebote aufzeigen",
  },
  {
    name: "Angehoerigen-Sorge",
    leitfrage: "Wie helfe ich meinem Angehoerigen?",
    beduerfnis: "Verantwortung & Fuersorge",
    emotion: "Ueberforderung, Pflichtgefuehl, eigene Beduerfnisse zurueckgestellt",
    strategie: "Beide Perspektiven beruecksichtigen, Entlastung aufzeigen, nicht ueberfordern",
  },
  {
    name: "Praeventive Vorsorge",
    leitfrage: "Wie bleibe ich gesund?",
    beduerfnis: "Selbstverwirklichung",
    emotion: "Proaktiv, motiviert, informationssuchend",
    strategie: "Positiv verstaerken, konkrete AOK-Angebote nennen, niedrigschwellig halten",
  },
]

export default function IntentionenPage() {
  return (
    <div className="mx-auto max-w-3xl py-12">
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
        Sie bestimmen Tonalitaet, Informationstiefe und Antwort-Strategie.
      </p>

      <div className="flex flex-col gap-4">
        {intentionen.map((intent, index) => (
          <div key={intent.name} className="border bg-card p-5">
            <div className="mb-3 flex items-baseline gap-3">
              <span className="text-xs font-bold text-primary tabular-nums">{index + 1}</span>
              <h2 className="text-base font-bold tracking-tight">{intent.name}</h2>
              <p className="text-sm italic text-muted-foreground">&ldquo;{intent.leitfrage}&rdquo;</p>
            </div>
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
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Antwort-Strategie</p>
                <p className="text-sm">{intent.strategie}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-primary/20 bg-primary/5 p-6">
        <p className="mb-1 text-sm font-semibold">Intent-Analyse ausprobieren</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Sensor-Experte erkennt Intentionen in Nutzeranfragen und schlaegt passende Antwort-Strategien vor.
        </p>
        <Link
          href="/assistant?expert=sensor"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Sensor-Experte oeffnen
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
