import Link from "next/link"
import { ArrowRight, Database, Radar, MessageCircle, Shield, Layers, ChevronRight, Workflow, BrainCircuit, BotMessageSquare } from "lucide-react"

import { brand } from "@/config/brand"
import { BrandWordmark } from "@/components/layout/brand-wordmark"

/* ── Layer Colors ── */
const layers = {
  kompass: { border: "border-slate-300", bg: "bg-slate-50", dot: "bg-slate-500" },
  context: { border: "border-emerald-200", bg: "bg-emerald-50", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-800" },
  sensor: { border: "border-blue-200", bg: "bg-blue-50", dot: "bg-blue-500", badge: "bg-blue-100 text-blue-800" },
  kommunikation: { border: "border-amber-200", bg: "bg-amber-50", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-800" },
}

/* ── 7 Intentionen ── */
const intentionen = [
  { nr: 1, name: "Akute Sorge", frage: "Bin ich krank?", kurztext: "Angst, Dringlichkeit. Der Mensch braucht sofort Orientierung und Beruhigung." },
  { nr: 2, name: "Frische Diagnose", frage: "Was bedeutet das?", kurztext: "Schock, Überforderung. Einordnung und erste Schritte statt Informationsflut." },
  { nr: 3, name: "Behandlungssuche", frage: "Wer kann helfen?", kurztext: "Pragmatisch, zielorientiert. Konkrete Anlaufstellen und Vergleichsmöglichkeiten." },
  { nr: 4, name: "Leistungsklärung", frage: "Zahlt die AOK das?", kurztext: "Anspruchsdenken, Unsicherheit. Klare Fakten, keine individuellen Zusagen." },
  { nr: 5, name: "Langzeit-Management", frage: "Wie lebe ich damit?", kurztext: "Akzeptanz, Alltag. Partnerschaftliche Begleitung und praktische Routinen." },
  { nr: 6, name: "Angehörigen-Sorge", frage: "Wie helfe ich?", kurztext: "Überforderung, Pflichtgefühl. Entlastungsangebote und Orientierung." },
  { nr: 7, name: "Präventive Vorsorge", frage: "Wie bleibe ich gesund?", kurztext: "Proaktiv, motiviert. Angebote aufzeigen, nicht belehren." },
]

/* ── Beispiel-Outputs: Gleicher Context, verschiedene Intentionen ── */
const beispiele = [
  {
    intention: "Frische Diagnose",
    label: "I2",
    ton: "Orientierend, beruhigend",
    output: "Eine neue Diagnose kann sich überwältigend anfühlen. Der wichtigste erste Schritt: ein Gespräch mit deinem Hausarzt. Die AOK bietet das Diabetes-Programm DMP an, das dich langfristig begleitet.",
  },
  {
    intention: "Langzeit-Management",
    label: "I5",
    ton: "Partnerschaftlich, alltagsnah",
    output: "Mit den richtigen Routinen lässt sich Diabetes gut in den Alltag integrieren. Neben Bewegung und Ernährung unterstützt dich das AOK-DMP mit strukturierten Checks. Kennst du die Selbsthilfegruppen in deiner Region?",
  },
  {
    intention: "Leistungsklärung",
    label: "I4",
    ton: "Direkt, sachlich, präzise",
    output: "Die AOK übernimmt im Rahmen des DMP Diabetes: Vorsorgeuntersuchungen, Ernährungsberatung und bei Bedarf Blutzuckermessgeräte. Für deinen konkreten Anspruch wende dich an deine AOK-Geschäftsstelle.",
  },
]

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Viewport Frame */}
      <div
        className="pointer-events-none fixed inset-0 z-50 border-[5px] border-primary"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-8">
        <BrandWordmark />
        <Link
          href="/api/auth/sign-in"
          className="micro-label transition-colors hover:text-foreground"
        >
          Anmelden
        </Link>
      </header>

      <main>
        {/* ════════════════════════════════════
           1. Hero — SAVA Engine Workbench
           ════════════════════════════════════ */}
        <section className="flex flex-col justify-center px-6 pb-24 pt-12 sm:px-8 lg:px-20">
          <p className="micro-label mb-6 flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            {brand.name} Workbench
          </p>

          <h1 className="headline-black mb-6 max-w-4xl text-4xl leading-[1.08] tracking-tighter sm:text-5xl lg:text-6xl">
            <span className="text-primary">Die Werkbank</span>
            <br />
            fuer die SAVA Engine<span className="text-primary">.</span>
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Die SAVA Engine ist das agentische System hinter dem AOK-Assistenten —
            Intentionen, Kompass, Context, Kommunikation. Diese Workbench liefert die Werkzeuge,
            um die Engine zu bauen, zu befuellen und zu konfigurieren.
          </p>

          {/* Workbench Modules */}
          <div className="mb-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded border p-3">
              <Workflow className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Context Pipeline</p>
                <p className="text-xs text-muted-foreground">Content in strukturierte Wissensbausteine transformieren</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded border p-3">
              <BotMessageSquare className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Engine-Experten</p>
                <p className="text-xs text-muted-foreground">Chat-Assistenten fuer Methodik und Konzeption</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded border p-3">
              <BrainCircuit className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Engine-Referenz</p>
                <p className="text-xs text-muted-foreground">Intentionen, Kompass, Kommunikation dokumentiert</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/api/auth/sign-in"
              className="inline-flex items-center gap-2 bg-foreground px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Workbench starten
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#intentionen"
              className="inline-flex items-center gap-2 border border-border px-7 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Wie funktioniert die Engine?
            </a>
          </div>
        </section>

        {/* ════════════════════════════════════
           2. Die 7 Intentionen — Warum Menschen zur AOK kommen
           ════════════════════════════════════ */}
        <section id="intentionen" className={`scroll-mt-8 border-t ${layers.sensor.bg} px-6 py-20 sm:px-8 lg:px-20`}>
          <div className="mx-auto max-w-5xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className={`inline-block size-1.5 rounded-full ${layers.sensor.dot}`} />
              7 Grundbedürfnisse
            </p>
            <h2 className="headline-black mb-4 text-2xl tracking-tight sm:text-3xl">
              Jede Anfrage hat ein Bedürfnis dahinter
            </h2>
            <p className="mb-10 max-w-2xl leading-relaxed text-muted-foreground">
              Ob jemand gerade eine Diagnose erhalten hat oder seit Jahren mit einer Erkrankung lebt —
              das Grundbedürfnis bestimmt, welche Art von Antwort hilft. Wir haben 7 Kernintentionen
              identifiziert, die das gesamte Spektrum abdecken.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {intentionen.map((i) => (
                <div key={i.nr} className="border border-blue-200 bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {i.nr}
                    </span>
                    <span className="text-sm font-bold text-blue-900">{i.name}</span>
                  </div>
                  <p className="text-sm font-medium text-blue-700">&ldquo;{i.frage}&rdquo;</p>
                  <p className="mt-2 text-xs leading-relaxed text-blue-600">{i.kurztext}</p>
                </div>
              ))}
              <Link
                href="/intentionen"
                className="group flex flex-col justify-center border border-blue-100 bg-blue-100/50 p-4 transition-colors hover:bg-blue-100"
              >
                <p className="text-sm font-semibold text-blue-800">Tiefer einsteigen</p>
                <p className="mt-1 text-xs leading-relaxed text-blue-600">
                  3-Ebenen-Framework, delegierte Handlungen, Response-Journeys und mehr.
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-700 transition-all group-hover:gap-2">
                  Zur Intentionen-Referenz <ArrowRight className="size-3" />
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           3. Das Problem — Warum ein System nötig ist
           ════════════════════════════════════ */}
        <section className="border-t bg-muted/50 px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-foreground" />
              Das Problem
            </p>
            <h2 className="headline-black mb-6 text-2xl tracking-tight sm:text-3xl">
              7 Bedürfnisse × Hunderte Themen = nicht manuell lösbar
            </h2>
            <p className="mb-8 max-w-2xl text-muted-foreground leading-relaxed">
              Diabetes allein müsste in 7 Varianten existieren: beruhigend für die Angst-Situation,
              sachlich für die Kosten-Frage, partnerschaftlich für den Alltag.
              Und das für jedes Gesundheitsthema, jede Leistung, jeden Prozess.
              Das skaliert nicht mit redaktioneller Handarbeit.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-red-200 bg-red-50 p-5">
                <p className="mb-2 text-sm font-semibold text-red-800">Ohne System</p>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>Pro Thema × 7 Intentionen = eigener Text</li>
                  <li>Jede Änderung muss überall nachgezogen werden</li>
                  <li>Ton und Fakten vermischt — schwer prüfbar</li>
                </ul>
                <p className="mt-3 text-xs font-medium text-red-500">Inkonsistenz. Redundanz. Pflegehölle.</p>
              </div>
              <div className="border border-emerald-200 bg-emerald-50 p-5">
                <p className="mb-2 text-sm font-semibold text-emerald-800">Mit SAVA Engine</p>
                <ul className="space-y-1 text-sm text-emerald-700">
                  <li>Fakten einmal aufbereiten, als Context speichern</li>
                  <li>Intention automatisch erkennen</li>
                  <li>Antwort situationsgerecht zusammenbauen</li>
                </ul>
                <p className="mt-3 text-xs font-medium text-emerald-600">Ein Thema pflegen. Alle Bedürfnisse bedienen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           4. Der Weg — Von der Frage zur Antwort
           ════════════════════════════════════ */}
        <section className="border-t px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              Der Weg
            </p>
            <h2 className="headline-black mb-4 text-2xl tracking-tight sm:text-3xl">
              Von der Frage zur situationsgerechten Antwort
            </h2>
            <p className="mb-10 max-w-2xl leading-relaxed text-muted-foreground">
              Ein Mensch stellt eine Frage. Die SAVA Engine durchläuft vier Stationen,
              bevor eine Antwort entsteht. Jede Station hat eine klare Aufgabe.
            </p>

            {/* Vier Stationen */}
            <div className="space-y-4">
              {/* Station 1: Intention erkennen */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
                    <Radar className="size-5 text-blue-600" />
                  </div>
                  <div className="mt-2 h-full w-px bg-border" />
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Station 1 — Sensor</p>
                  <p className="mt-1 text-lg font-bold">Intention erkennen</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    &ldquo;Mir wurde gerade Diabetes diagnostiziert, was bedeutet das für mich?&rdquo;
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      I2 — Frische Diagnose
                    </span>
                    <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      Thema: Diabetes mellitus
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Die Engine analysiert nicht nur das Thema, sondern das Bedürfnis dahinter: Orientierung nach einem Schock.
                  </p>
                </div>
              </div>

              {/* Station 2: Context abrufen */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                    <Database className="size-5 text-emerald-600" />
                  </div>
                  <div className="mt-2 h-full w-px bg-border" />
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Station 2 — Context</p>
                  <p className="mt-1 text-lg font-bold">Wissen und Tools zusammenstellen</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Die Engine sucht die passenden Wissensbausteine: Was ist Diabetes? Welche AOK-Programme gibt es?
                    Welche Tools sind relevant — DMP-Finder, Arztsuche, Ernährungsrechner?
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Context enthält nur Fakten. Kein Ton, keine Empathie. Das kommt später.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href="/contextualisierung" className="group inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900">
                      Wie Context entsteht <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link href="/agent-context" className="group inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900">
                      Wie Context zur Laufzeit funktioniert <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Station 3: Kompass prüfen */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-slate-100">
                    <Shield className="size-5 text-slate-600" />
                  </div>
                  <div className="mt-2 h-full w-px bg-border" />
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Durchgehend — Kompass</p>
                  <p className="mt-1 text-lg font-bold">Regeln und Grenzen einhalten</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Bevor etwas formuliert wird, gelten Regeln. Der Kompass ist die Verfassung des Assistenten:
                    Keine Diagnosen stellen. Keine Leistungszusagen machen. Bei akuter Gefahr sofort auf 112 verweisen.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Der Kompass ist kein eigener Schritt. Er durchzieht alle Stationen als verbindliches Regelwerk.
                  </p>
                </div>
              </div>

              {/* Station 4: Kommunikation formen */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-amber-100">
                    <MessageCircle className="size-5 text-amber-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Station 3 — Kommunikation</p>
                  <p className="mt-1 text-lg font-bold">Antwort situationsgerecht formen</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Jetzt kommen Intention und Context zusammen. Die Kommunikationsschicht entscheidet:
                    Welcher Ton passt? Wie viel Information verträgt der Mensch gerade?
                    Soll der Assistent proaktiv auf verwandte Leistungen hinweisen?
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Für I2 (Frische Diagnose) heißt das: beruhigender Ton, mittlere Tiefe, ein klarer nächster Schritt.
                  </p>
                  <div className="mt-3">
                    <Link href="/kommunikation" className="group inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900">
                      Wie Kommunikation gesteuert wird <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           5. Das Ergebnis — Gleicher Context, verschiedene Antworten
           ════════════════════════════════════ */}
        <section className="border-t bg-muted/50 px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              Das Ergebnis
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Ein Diabetes-Context. Drei Bedürfnisse. Drei Antworten.
            </h2>
            <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Dieselben Fakten. Derselbe Kompass. Aber die Intention bestimmt,
              wie die Antwort klingt, wie tief sie geht und was sie hervorhebt.
            </p>

            {/* Flow-Visualisierung */}
            <div className="mb-10">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-0">
                <div className={`flex items-center gap-2 rounded-full border ${layers.context.border} ${layers.context.bg} px-4 py-2`}>
                  <Database className="size-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-800">Context: Diabetes</span>
                </div>
                <div className="hidden h-px w-8 bg-border sm:block" />
                <div className="block text-center text-xs text-muted-foreground sm:hidden">+</div>
                <div className={`flex items-center gap-2 rounded-full border ${layers.sensor.border} ${layers.sensor.bg} px-4 py-2`}>
                  <Radar className="size-4 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-800">Intention erkennen</span>
                </div>
                <div className="hidden h-px w-8 bg-border sm:block" />
                <div className="block text-center text-xs text-muted-foreground sm:hidden">=</div>
                <div className={`flex items-center gap-2 rounded-full border ${layers.kommunikation.border} ${layers.kommunikation.bg} px-4 py-2`}>
                  <MessageCircle className="size-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-800">Antwort formen</span>
                </div>
              </div>
              <div className="mt-2 flex justify-center">
                <div className={`flex items-center gap-2 rounded-full border-2 border-dashed ${layers.kompass.border} px-4 py-1.5`}>
                  <Shield className="size-3 text-slate-500" />
                  <span className="text-xs text-slate-500">Kompass: Regeln gelten in jedem Schritt</span>
                </div>
              </div>
            </div>

            {/* Drei Beispiel-Outputs */}
            <div className="grid gap-4 lg:grid-cols-3">
              {beispiele.map((ex) => (
                <div key={ex.label} className="flex flex-col border border-border bg-white">
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
                    <span className={`inline-flex items-center rounded-full ${layers.sensor.badge} px-2 py-0.5 text-xs font-bold`}>
                      {ex.label}
                    </span>
                    <span className="text-sm font-semibold">{ex.intention}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="mb-1 text-xs text-muted-foreground">
                      Ton: <span className="font-medium text-foreground">{ex.ton}</span>
                    </p>
                    <div className="mt-2 flex-1 rounded bg-muted/30 p-3">
                      <p className="text-sm leading-relaxed">{ex.output}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quintessenz */}
            <div className="mt-10 border-l-4 border-primary bg-white p-6">
              <p className="text-sm font-bold">
                Wissen wird einmal aufbereitet. Die Engine erkennt das Bedürfnis. Und formt daraus eine Antwort,
                die zum Menschen passt — nicht nur zum Thema.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Neue Themen erfordern neuen Context, aber keine neue Kommunikationslogik.
                Neue Bedürfnisse erfordern neue Engine-Regeln, aber keinen neuen Content.
                Fachliche Korrektheit und kommunikative Anpassung bleiben sauber getrennt.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           6. CTA
           ════════════════════════════════════ */}
        <section className="border-t bg-foreground px-6 py-16 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="headline-black mb-4 text-2xl tracking-tight text-background sm:text-3xl">
              Die Engine braucht Werkzeuge
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm text-background/60">
              Context-Cluster anlegen, die Pipeline durchlaufen, mit Experten iterieren
              und die Qualitaet der Wissensbausteine pruefen. Alles in einer Arbeitsumgebung.
            </p>
            <Link
              href="/api/auth/sign-in"
              className="inline-flex items-center gap-2 bg-background px-7 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Workbench starten
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════
           7. Weitergedacht: Headless Content
           ════════════════════════════════════ */}
        <section className="border-t px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <Layers className="size-3" />
              Weitergedacht
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Contexts sind Headless Content
            </h2>
            <p className="mb-4 text-lg text-muted-foreground">
              Einmal aufbereitet. Überall einsetzbar. Nicht nur für den Assistenten.
            </p>
            <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Weil Fakten und Kommunikation getrennt sind, lassen sich dieselben Contexts
              für jeden Kanal nutzen: Website, Newsletter, Social Media, Push-Benachrichtigung.
              Die KI generiert kanalgerechte Varianten. Die Redaktion prüft und gibt frei.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { kanal: "Website", format: "Ratgeber" },
                { kanal: "App-Push", format: "1-2 Sätze" },
                { kanal: "Newsletter", format: "Teaser" },
                { kanal: "Social", format: "Karussell" },
                { kanal: "Chatbot", format: "Dialog" },
                { kanal: "Print", format: "Fakten-Box" },
              ].map((k) => (
                <div key={k.kanal} className="rounded bg-muted/50 p-3 text-center">
                  <p className="text-xs font-semibold">{k.kanal}</p>
                  <p className="text-xs text-muted-foreground">{k.format}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-l-4 border-primary bg-muted/50 p-6">
              <p className="text-sm font-bold">
                Die Pipeline baut nicht nur ein Assistenten-Gedächtnis. Sie baut eine Infrastruktur für die gesamte Gesundheitskommunikation.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Ein Context wird aktualisiert — alle Kanäle profitieren sofort.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <p className="micro-label">
            {brand.name} — {brand.description}
          </p>
          <p className="micro-label">&copy; 2026</p>
        </div>
      </footer>
    </div>
  )
}
