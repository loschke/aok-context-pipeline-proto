import Link from "next/link"
import { ArrowRight, Database, Radar, MessageCircle, Zap, Shield, Layers } from "lucide-react"

import { brand } from "@/config/brand"
import { BrandWordmark } from "@/components/layout/brand-wordmark"

/* ── Layer Colors (matching Leitfaden) ── */
const layers = {
  kompass: { bg: "bg-slate-50", accent: "text-slate-700", border: "border-slate-300", dot: "bg-slate-500", badge: "bg-slate-100 text-slate-800" },
  baustein: { bg: "bg-emerald-50", accent: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-800" },
  sensor: { bg: "bg-blue-50", accent: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500", badge: "bg-blue-100 text-blue-800" },
  kommunikation: { bg: "bg-amber-50", accent: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-800" },
}

/* ── Intentions Data ── */
const intentions = [
  { nr: "I1", name: "Akute Sorge", frage: "Bin ich krank?", emotion: "Angst, Dringlichkeit" },
  { nr: "I2", name: "Frische Diagnose", frage: "Was bedeutet das?", emotion: "Schock, Orientierungslosigkeit" },
  { nr: "I3", name: "Behandlungssuche", frage: "Wer kann helfen?", emotion: "Pragmatisch, zielorientiert" },
  { nr: "I4", name: "Leistungsklärung", frage: "Zahlt die AOK das?", emotion: "Unsicherheit, Anspruchsdenken" },
  { nr: "I5", name: "Langzeit-Management", frage: "Wie lebe ich damit?", emotion: "Akzeptanz, Optimierung" },
  { nr: "I6", name: "Angehörigen-Sorge", frage: "Wie helfe ich?", emotion: "Überforderung, Pflichtgefühl" },
  { nr: "I7", name: "Präventive Vorsorge", frage: "Wie bleibe ich gesund?", emotion: "Proaktiv, motiviert" },
]

/* ── Example Outputs ── */
const examples = [
  {
    intention: "Frische Diagnose",
    label: "I2",
    tonalitaet: "Orientierend, beruhigend",
    output: "Eine neue Diagnose kann sich überwältigend anfühlen. Der wichtigste erste Schritt: ein Gespräch mit deinem Hausarzt. Die AOK bietet das Diabetes-Programm DMP an, das dich langfristig begleitet.",
  },
  {
    intention: "Langzeit-Management",
    label: "I5",
    tonalitaet: "Partnerschaftlich, alltagsnah",
    output: "Mit den richtigen Routinen lässt sich Diabetes gut in den Alltag integrieren. Neben Bewegung und Ernährung unterstützt dich das AOK-DMP mit strukturierten Checks. Kennst du die Selbsthilfegruppen in deiner Region?",
  },
  {
    intention: "Leistungsklärung",
    label: "I4",
    tonalitaet: "Direkt, sachlich, präzise",
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
           Hero
           ════════════════════════════════════ */}
        <section className="flex flex-col justify-center px-6 pb-24 pt-12 sm:px-8 lg:px-20">
          <p className="micro-label mb-6 flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            {brand.name}
          </p>

          <h1 className="headline-black mb-6 max-w-4xl text-4xl leading-[1.08] tracking-tighter sm:text-5xl lg:text-6xl">
            <span className="text-primary">Dasselbe Thema.</span>
            <br />
            Verschiedene Menschen.
            <br />
            Verschiedene Antworten<span className="text-primary">.</span>
          </h1>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Die SAVA Context Pipeline trennt Wissen von Kommunikation. Ein Thema wird einmal gepflegt.
            Der Assistent erkennt, was der Mensch gerade braucht, und passt die Antwort an.
            Ein verbindliches Regelwerk hält alles in den richtigen Grenzen.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/api/auth/sign-in"
              className="inline-flex items-center gap-2 bg-foreground px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Jetzt starten
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#architektur"
              className="inline-flex items-center gap-2 border border-border px-7 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Architektur verstehen
            </a>
          </div>
        </section>

        {/* ════════════════════════════════════
           Das Problem
           ════════════════════════════════════ */}
        <section className="border-t bg-muted/50 px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-foreground" />
              Das Problem
            </p>
            <h2 className="headline-black mb-6 text-2xl tracking-tight sm:text-3xl">
              Ohne Pipeline: Für jede Situation ein eigener Text
            </h2>
            <p className="mb-8 max-w-2xl text-muted-foreground leading-relaxed">
              Ein Mensch mit frischer Diabetes-Diagnose braucht eine andere Antwort als jemand, der seit Jahren mit Diabetes lebt.
              Ohne Trennung von Inhalt und Kommunikation müsste jede Variante einzeln geschrieben und gepflegt werden.
              Das skaliert nicht.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-red-200 bg-red-50 p-5">
                <p className="mb-2 text-sm font-semibold text-red-800">Ohne Pipeline</p>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>Diabetes-Text für Angst-Situation</li>
                  <li>Diabetes-Text für Kosten-Frage</li>
                  <li>Diabetes-Text für Alltags-Management</li>
                  <li>Diabetes-Text für Angehörige</li>
                  <li className="text-red-400">... pro Thema x7 Varianten</li>
                </ul>
                <p className="mt-3 text-xs font-medium text-red-500">Inkonsistenz. Redundanz. Pflegehölle.</p>
              </div>
              <div className="border border-emerald-200 bg-emerald-50 p-5">
                <p className="mb-2 text-sm font-semibold text-emerald-800">Mit Pipeline</p>
                <ul className="space-y-1 text-sm text-emerald-700">
                  <li>Ein Baustein: Diabetes-Fakten</li>
                  <li>7 Intentionen: Erkennung zur Laufzeit</li>
                  <li>Kommunikation: Automatische Anpassung</li>
                </ul>
                <p className="mt-3 text-xs font-medium text-emerald-600">Konsistenz. Effizienz. Skalierbarkeit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           Architektur-Überblick
           ════════════════════════════════════ */}
        <section id="architektur" className="scroll-mt-8 border-t px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              Die Architektur
            </p>
            <h2 className="headline-black mb-6 text-2xl tracking-tight sm:text-3xl">
              Drei Schichten. Ein Fundament.
            </h2>
            <p className="mb-10 max-w-2xl text-muted-foreground leading-relaxed">
              Jede Schicht hat eine klare Verantwortung. Der Kompass durchzieht alle drei als
              verbindliches Regelwerk: Was darf der Assistent? Was darf er nicht? Welche Werte leiten
              sein Handeln?
            </p>

            {/* Drei Schichten */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className={`border ${layers.baustein.border} ${layers.baustein.bg} p-5 transition-lift`}>
                <Database className="mb-3 size-5 text-emerald-600" />
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Schicht 1</p>
                <p className="mt-1 text-lg font-bold text-emerald-900">Der Baustein</p>
                <p className="mt-2 text-sm text-emerald-800">Was ist wahr?</p>
                <p className="mt-1 text-xs text-emerald-600">Reine Fakten. Kein Ton. Kein Kontext. Einmal gepflegt, überall genutzt.</p>
              </div>
              <div className={`border ${layers.sensor.border} ${layers.sensor.bg} p-5 transition-lift`}>
                <Radar className="mb-3 size-5 text-blue-600" />
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Schicht 2</p>
                <p className="mt-1 text-lg font-bold text-blue-900">Die Intention</p>
                <p className="mt-2 text-sm text-blue-800">Was braucht der Mensch gerade?</p>
                <p className="mt-1 text-xs text-blue-600">Erkennung des emotionalen und situativen Kontexts aus der Anfrage.</p>
              </div>
              <div className={`border ${layers.kommunikation.border} ${layers.kommunikation.bg} p-5 transition-lift`}>
                <MessageCircle className="mb-3 size-5 text-amber-600" />
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Schicht 3</p>
                <p className="mt-1 text-lg font-bold text-amber-900">Die Kommunikation</p>
                <p className="mt-2 text-sm text-amber-800">Wie muss es klingen?</p>
                <p className="mt-1 text-xs text-amber-600">Tonalität, Tiefe und Format. Angepasst an Intention und Situation.</p>
              </div>
            </div>

            {/* Kompass als Querschicht */}
            <div className={`mt-4 flex items-center gap-4 border-2 ${layers.kompass.border} ${layers.kompass.bg} p-4`}>
              <Shield className="size-6 shrink-0 text-slate-600" />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fundament</p>
                <p className="text-base font-bold text-slate-900">Der Kompass — Werte, Regeln, Grenzen</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Durchzieht alle Schichten. Definiert was der Assistent darf, was er nie darf, welche Quellen er nutzt und wie er sich verhält.
                </p>
              </div>
              <div className="hidden shrink-0 sm:flex sm:gap-1.5">
                <span className="inline-block size-2 rounded-full bg-emerald-400" title="Baustein" />
                <span className="inline-block size-2 rounded-full bg-blue-400" title="Intention" />
                <span className="inline-block size-2 rounded-full bg-amber-400" title="Kommunikation" />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           Layer 0: Der Kompass
           ════════════════════════════════════ */}
        <section className={`border-t ${layers.kompass.bg} px-6 py-20 sm:px-8 lg:px-20`}>
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className={`inline-block size-1.5 rounded-full ${layers.kompass.dot}`} />
              Fundament
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Der Kompass
            </h2>
            <p className="mb-4 text-lg text-slate-800">
              Die Verfassung des Assistenten. Was er darf. Was er nie darf. Woran er sich misst.
            </p>
            <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Bevor der Assistent antwortet, gelten Regeln. Der Kompass ist kein separater Schritt,
              sondern das Betriebssystem, auf dem alles läuft. Er steuert, welche Quellen der Baustein
              nutzen darf, wie der Sensor Grenzsituationen behandelt und welche Formulierungen die
              Kommunikation nie verwenden darf.
            </p>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Linke Spalte: Werte + Quellen */}
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-600">5 Kernwerte</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { wert: "Fachliche Korrektheit", desc: "Nur Informationen aus der geprüften Wissensbasis. Keine Spekulation." },
                    { wert: "Ehrlichkeit", desc: "Der Assistent ist eine KI. Er sagt, wenn er etwas nicht weiß." },
                    { wert: "Echte Hilfsbereitschaft", desc: "Konkrete Informationen geben, wenn vorhanden. Nicht übervorsichtig." },
                    { wert: "Respekt vor Autonomie", desc: "Informieren und empfehlen, nicht bevormunden." },
                    { wert: "Fürsorge", desc: "Die emotionale Situation in jeder Antwort berücksichtigen." },
                  ].map((v) => (
                    <li key={v.wert} className="flex gap-2">
                      <span className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span><strong>{v.wert}</strong> — {v.desc}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wider text-slate-600">Quellen & Wissensbasis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Der Assistent antwortet ausschließlich auf Basis der strukturierten Wissensbausteine.
                  Keine Internetsuche, kein allgemeines Sprachmodell-Wissen. Was nicht in der Wissensbasis
                  steht, wird nicht beantwortet, sondern an die persönliche Beratung verwiesen.
                </p>
              </div>

              {/* Rechte Spalte: Hard Constraints */}
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-600">5 Hard Constraints — nie verletzbar</h3>
                <div className="space-y-3">
                  {[
                    { nr: "1", titel: "Keine individuellen Leistungszusagen", desc: "Allgemeine Info erlaubt. Aber nie: \"Sie haben Anspruch auf...\"" },
                    { nr: "2", titel: "Keine Diagnosen oder Therapieempfehlungen", desc: "Keine Symptome bewerten, keine Therapien empfehlen." },
                    { nr: "3", titel: "Keine personenbezogenen Daten", desc: "Keine Speicherung über den Konversationskontext hinaus." },
                    { nr: "4", titel: "Keine Beeinflussung medizinischer Entscheidungen", desc: "Informieren über Leistungen, nicht bewerten." },
                    { nr: "5", titel: "Notruf-Verweis bei akuter Gefahr", desc: "Bei Notlage, Suizidgedanken, Gewalt: sofort 112 oder Telefonseelsorge." },
                  ].map((c) => (
                    <div key={c.nr} className="flex gap-3 border border-slate-200 bg-white p-3">
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                        {c.nr}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{c.titel}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prüfsteine */}
            <div className="mt-8 border-2 border-slate-300 bg-white p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-600">Prüfsteine für Grenzfälle</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Kompetente-Beraterin-Test</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Würde eine erfahrene AOK-Beraterin das so sagen? Wäre sie hilfreicher? Wäre sie vorsichtiger?
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Doppelzeitungs-Test</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Würde die Antwort als &ldquo;gefährliche Fehlinformation&rdquo; oder als &ldquo;unnötige Informationsverweigerung&rdquo;
                    in der Zeitung stehen? Beides vermeiden.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">1.000-Versicherte-Regel</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Wenn 1.000 Menschen diese Frage stellen, hat die große Mehrheit eine legitime Frage.
                    Antworte für die Mehrheit, nicht den Ausnahmefall.
                  </p>
                </div>
              </div>
            </div>

            {/* Kompass durchzieht alle Schichten */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="border border-emerald-200 bg-emerald-50 p-3">
                <p className="flex items-center gap-2 text-xs font-semibold">
                  <Shield className="size-3 text-slate-500" />
                  <span className="text-emerald-800">Kompass im Baustein</span>
                </p>
                <p className="mt-1 text-xs text-emerald-600">Nur fachlich geprüfte Quellen. Keine Marketing-Sprache. Haftungshinweise wo nötig.</p>
              </div>
              <div className="border border-blue-200 bg-blue-50 p-3">
                <p className="flex items-center gap-2 text-xs font-semibold">
                  <Shield className="size-3 text-slate-500" />
                  <span className="text-blue-800">Kompass in der Intention</span>
                </p>
                <p className="mt-1 text-xs text-blue-600">Bei Akuter Sorge: Empathie zuerst. Notruf-Verweis bei Gefahr. Nie verharmlosen.</p>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-3">
                <p className="flex items-center gap-2 text-xs font-semibold">
                  <Shield className="size-3 text-slate-500" />
                  <span className="text-amber-800">Kompass in der Kommunikation</span>
                </p>
                <p className="mt-1 text-xs text-amber-600">Keine individuellen Zusagen. Verständliche Sprache. Grenzen ehrlich benennen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           Layer 1: Der Baustein
           ════════════════════════════════════ */}
        <section className={`border-t ${layers.baustein.bg} px-6 py-20 sm:px-8 lg:px-20`}>
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className={`inline-block size-1.5 rounded-full ${layers.baustein.dot}`} />
              Schicht 1
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Der Baustein
            </h2>
            <p className="mb-8 text-lg text-emerald-800">
              Reiner Inhalt. Ein Baustein weiß nicht, wer ihn liest.
            </p>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Erklärung */}
              <div>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  Ein Baustein ist eine atomare Wissenseinheit. Er beantwortet genau eine Frage vollständig,
                  ohne dass zusätzlicher Kontext nötig ist. Keine Tonalität. Keine Empathie.
                  Nur fachlich geprüfte Fakten.
                </p>

                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-700">Vier Eigenschaften</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span><strong>Eigenständig</strong> — verständlich ohne den Quellartikel</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span><strong>Informationsdicht</strong> — jeder Satz hat Substanz, kein Marketing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span><strong>Eindeutig typisiert</strong> — genau ein Typ, der korrekt ist</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span><strong>Vollständig im Kontext</strong> — Metadaten gefüllt für Auffindbarkeit</span>
                  </li>
                </ul>

                <h3 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wider text-emerald-700">Metadaten = Retrieval-Infrastruktur</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Felder wie <code className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800">zielgruppe</code>,{" "}
                  <code className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800">kontext_tags</code> und{" "}
                  <code className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800">typ</code> helfen,
                  den richtigen Baustein zur Laufzeit zu finden. Sie sind keine Intentions-Zuordnung.
                  Der Baustein bleibt neutral — die Kommunikation liegt woanders.
                </p>
              </div>

              {/* Beispiel */}
              <div className="overflow-hidden border border-emerald-200 bg-white">
                <div className="border-b border-emerald-100 bg-emerald-50/50 px-4 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Beispiel: Baustein</p>
                </div>
                <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-emerald-950"><code>{`titel: "Diabetes mellitus Typ 2"
typ: erkrankung
cluster: stoffwechsel
kategorie: chronische-erkrankungen
stand: "2026-03-01"
zielgruppe:
  - versicherte
  - angehoerige
kontext_tags:
  bereich: innere-medizin
  chronisch: true

## Inhalt

- Chronische Stoffwechselerkrankung
- Diagnose: HbA1c > 6,5%
- Behandlung: Ernährung, Bewegung,
  ggf. Metformin
- AOK-Leistungen: DMP Diabetes,
  Ernährungsberatung,
  Blutzuckermessgeräte`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           Layer 2: Die Intentionen
           ════════════════════════════════════ */}
        <section className={`border-t ${layers.sensor.bg} px-6 py-20 sm:px-8 lg:px-20`}>
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className={`inline-block size-1.5 rounded-full ${layers.sensor.dot}`} />
              Schicht 2
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Die Intentionen
            </h2>
            <p className="mb-4 text-lg text-blue-800">
              Das Grundbedürfnis hinter jeder Frage erkennen.
            </p>
            <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Der Sensor analysiert jede Nutzeranfrage und erkennt zwei Dinge gleichzeitig:
              die Intention (den emotionalen und situativen Kontext) und das Thema (den inhaltlichen Gegenstand).
              7 Kernintentionen decken das Spektrum von akuter Krise bis langfristiger Gesundheitsoptimierung ab.
            </p>

            {/* Intention Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {intentions.map((i) => (
                <div key={i.nr} className="border border-blue-200 bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {i.nr.replace("I", "")}
                    </span>
                    <span className="text-sm font-bold text-blue-900">{i.name}</span>
                  </div>
                  <p className="text-sm font-medium text-blue-700">&ldquo;{i.frage}&rdquo;</p>
                  <p className="mt-1 text-xs text-blue-500">{i.emotion}</p>
                </div>
              ))}
              {/* Why-Card */}
              <div className="flex flex-col justify-center border border-blue-100 bg-blue-100/50 p-4">
                <p className="text-sm font-semibold text-blue-800">Warum 7?</p>
                <p className="mt-1 text-xs leading-relaxed text-blue-600">
                  Abgeleitet aus der Analyse typischer Krankenkassen-Interaktionen. Jede Intention beschreibt ein
                  Grundbedürfnis, das die Kommunikationsstrategie bestimmt.
                </p>
              </div>
            </div>

            {/* Erkennung */}
            <div className="mt-8 border border-blue-200 bg-white p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-700">Wie erkennt der Sensor die Intention?</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold text-blue-600">Eingabe</p>
                  <p className="mt-1 rounded bg-blue-50 p-2 text-sm italic text-blue-800">
                    &ldquo;Mir wurde gerade Diabetes diagnostiziert, was bedeutet das für mich?&rdquo;
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-600">Erkannte Intention</p>
                  <p className="mt-1 rounded bg-blue-50 p-2 text-sm text-blue-800">
                    <strong>I2 — Frische Diagnose</strong>
                    <br />
                    <span className="text-xs">Schock, Orientierungsbedarf</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-600">Erkanntes Thema</p>
                  <p className="mt-1 rounded bg-blue-50 p-2 text-sm text-blue-800">
                    <strong>Diabetes mellitus</strong>
                    <br />
                    <span className="text-xs">Baustein-Suche gestartet</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           Layer 3: Die Kommunikation
           ════════════════════════════════════ */}
        <section className={`border-t ${layers.kommunikation.bg} px-6 py-20 sm:px-8 lg:px-20`}>
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <span className={`inline-block size-1.5 rounded-full ${layers.kommunikation.dot}`} />
              Schicht 3
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Die Kommunikation
            </h2>
            <p className="mb-4 text-lg text-amber-800">
              Dieselben Fakten. Drei verschiedene Stimmen.
            </p>
            <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Die Intention Engine bekommt zwei Inputs: die erkannte Intention und die Rohdaten aus dem Baustein.
              Daraus entsteht eine situationsgerechte Antwort. Drei Parameter steuern das Ergebnis.
            </p>

            {/* Kommunikationsparameter */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-amber-200 bg-white p-4">
                <p className="text-sm font-bold text-amber-900">Tonalität</p>
                <p className="mt-1 text-xs text-amber-600">Beruhigend, sachlich, motivierend, partnerschaftlich — abhängig von der emotionalen Lage.</p>
              </div>
              <div className="border border-amber-200 bg-white p-4">
                <p className="text-sm font-bold text-amber-900">Informationstiefe</p>
                <p className="mt-1 text-xs text-amber-600">Minimal bei Überforderung, maximal bei Fakten-Hunger. Der Mensch bestimmt das Tempo.</p>
              </div>
              <div className="border border-amber-200 bg-white p-4">
                <p className="text-sm font-bold text-amber-900">Proaktivität</p>
                <p className="mt-1 text-xs text-amber-600">Aktives Hinweisen auf verwandte Leistungen vs. abwarten. Bei Krisen hoch, bei Routine niedrig.</p>
              </div>
            </div>

            {/* Situationskontext */}
            <div className="mb-8 border border-amber-200 bg-white p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-700">Situation beeinflusst Kommunikation</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Neben der Intention berücksichtigt die Kommunikationsschicht auch die äußere Situation des Nutzers.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Mobil unterwegs", desc: "Kurze, scanbare Antworten. Listen statt Fließtext. Wichtigstes zuerst." },
                  { label: "Am Desktop", desc: "Ausführlicher, mit Tabellen und Vergleichen. Mehr Kontext möglich." },
                  { label: "Unter Stress", desc: "Beruhigender Ton. Ein nächster Schritt. Keine Informationsflut." },
                  { label: "Recherche-Modus", desc: "Alle Details. Rechtsgrundlagen. Verknüpfungen zu verwandten Themen." },
                ].map((s) => (
                  <div key={s.label} className="rounded bg-amber-50 p-3">
                    <p className="text-xs font-semibold text-amber-800">{s.label}</p>
                    <p className="mt-1 text-xs text-amber-600">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intention x Kommunikation Matrix */}
            <div className="overflow-x-auto border border-amber-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-100 bg-amber-50/50">
                    <th className="px-4 py-2.5 font-semibold text-amber-800">Intention</th>
                    <th className="px-4 py-2.5 font-semibold text-amber-800">Tonalität</th>
                    <th className="px-4 py-2.5 font-semibold text-amber-800">Tiefe</th>
                    <th className="px-4 py-2.5 font-semibold text-amber-800">Proaktivität</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  <tr><td className="px-4 py-2 font-medium">I1 Akute Sorge</td><td className="px-4 py-2">Beruhigend, empathisch</td><td className="px-4 py-2">Minimal</td><td className="px-4 py-2">Hoch</td></tr>
                  <tr><td className="px-4 py-2 font-medium">I2 Frische Diagnose</td><td className="px-4 py-2">Strukturiert, sachlich-warm</td><td className="px-4 py-2">Mittel</td><td className="px-4 py-2">Mittel</td></tr>
                  <tr><td className="px-4 py-2 font-medium">I3 Behandlungssuche</td><td className="px-4 py-2">Sachlich, kompetent</td><td className="px-4 py-2">Hoch</td><td className="px-4 py-2">Mittel</td></tr>
                  <tr><td className="px-4 py-2 font-medium">I4 Leistungsklärung</td><td className="px-4 py-2">Direkt, klar</td><td className="px-4 py-2">Präzise</td><td className="px-4 py-2">Niedrig</td></tr>
                  <tr><td className="px-4 py-2 font-medium">I5 Langzeit-Mgmt.</td><td className="px-4 py-2">Partnerschaftlich</td><td className="px-4 py-2">Anpassbar</td><td className="px-4 py-2">Gering</td></tr>
                  <tr><td className="px-4 py-2 font-medium">I6 Angehörige</td><td className="px-4 py-2">Unterstützend</td><td className="px-4 py-2">Mittel</td><td className="px-4 py-2">Hoch</td></tr>
                  <tr><td className="px-4 py-2 font-medium">I7 Prävention</td><td className="px-4 py-2">Motivierend</td><td className="px-4 py-2">Mittel</td><td className="px-4 py-2">Mittel</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           Das Zusammenspiel
           ════════════════════════════════════ */}
        <section className="border-t px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <Zap className="size-3" />
              Das Zusammenspiel
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Ein Baustein. Drei Intentionen. Drei Antworten.
            </h2>
            <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Hier wird das Prinzip greifbar. Derselbe Diabetes-Baustein, drei verschiedene
              Intentionen, drei völlig verschiedene Antworten. Die Fakten sind identisch.
              Nur die Kommunikation ändert sich.
            </p>

            {/* Flow-Visualisierung */}
            <div className="mb-10">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-0">
                <div className={`flex items-center gap-2 rounded-full border ${layers.baustein.border} ${layers.baustein.bg} px-4 py-2`}>
                  <Database className="size-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-800">Baustein: Diabetes</span>
                </div>
                <div className="hidden h-px w-8 bg-border sm:block" />
                <div className="block text-center text-xs text-muted-foreground sm:hidden">+</div>
                <div className={`flex items-center gap-2 rounded-full border ${layers.sensor.border} ${layers.sensor.bg} px-4 py-2`}>
                  <Radar className="size-4 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-800">Sensor: Intention erkennen</span>
                </div>
                <div className="hidden h-px w-8 bg-border sm:block" />
                <div className="block text-center text-xs text-muted-foreground sm:hidden">=</div>
                <div className={`flex items-center gap-2 rounded-full border ${layers.kommunikation.border} ${layers.kommunikation.bg} px-4 py-2`}>
                  <MessageCircle className="size-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-800">Situationsgerechter Output</span>
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
              {examples.map((ex) => (
                <div key={ex.label} className="flex flex-col border border-border bg-white">
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
                    <span className={`inline-flex items-center rounded-full ${layers.sensor.badge} px-2 py-0.5 text-xs font-bold`}>
                      {ex.label}
                    </span>
                    <span className="text-sm font-semibold">{ex.intention}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="mb-1 text-xs text-muted-foreground">
                      Ton: <span className="font-medium text-foreground">{ex.tonalitaet}</span>
                    </p>
                    <div className="mt-2 flex-1 rounded bg-muted/30 p-3">
                      <p className="text-sm leading-relaxed">{ex.output}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quintessenz */}
            <div className="mt-10 border-l-4 border-primary bg-muted/50 p-6">
              <p className="text-sm font-bold">Der Kompass setzt die Grenzen.</p>
              <p className="text-sm font-bold">Der Baustein liefert die Wahrheit.</p>
              <p className="text-sm font-bold">Der Sensor liefert den Kontext.</p>
              <p className="text-sm font-bold">Die Intention Engine macht daraus Kommunikation.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Fachinhalt wird zentral aktualisiert — alle Intentionen profitieren sofort.
                Neue Intentionen erfordern keinen neuen Content, nur neue Engine-Regeln.
                Fachliche Prüfung und kommunikative Prüfung sind klar getrennt.
                Und in jedem Schritt gelten dieselben verbindlichen Regeln.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           CTA
           ════════════════════════════════════ */}
        <section className="border-t bg-foreground px-6 py-16 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="headline-black mb-4 text-2xl tracking-tight text-background sm:text-3xl">
              Pipeline ausprobieren
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm text-background/60">
              In der Workbench kannst du den gesamten Prozess durchspielen: Webinhalte extrahieren,
              Bausteine erzeugen, Qualität prüfen und die Intention Engine testen.
            </p>
            <Link
              href="/api/auth/sign-in"
              className="inline-flex items-center gap-2 bg-background px-7 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Jetzt starten
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════
           Bonus: Headless Content
           ════════════════════════════════════ */}
        <section className="border-t px-6 py-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="micro-label mb-4 flex items-center gap-2">
              <Layers className="size-3" />
              Weitergedacht
            </p>
            <h2 className="headline-black mb-2 text-2xl tracking-tight sm:text-3xl">
              Bausteine sind Headless Content
            </h2>
            <p className="mb-4 text-lg text-muted-foreground">
              Einmal aufbereitet. Überall einsetzbar. Nicht nur für den Assistenten.
            </p>
            <p className="mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Die Trennung von Inhalt und Kommunikation hat einen Nebeneffekt: Bausteine sind strukturierte,
              fachlich geprüfte Rohdaten ohne Kanal-Bindung. Das macht sie zur idealen Grundlage
              für ein KI-gestütztes Multi-Kanal-Content-System.
            </p>

            {/* Vom Baustein zum Kanal */}
            <div className="mb-8 grid gap-4 lg:grid-cols-2">
              {/* So funktioniert es */}
              <div className="border border-border p-5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">So funktioniert es</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">1</span>
                    <div>
                      <p className="text-sm font-semibold">Baustein als Single Source of Truth</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">Fachredaktion pflegt Fakten einmal. Qualitätsgesichert, strukturiert, versioniert.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">2</span>
                    <div>
                      <p className="text-sm font-semibold">KI generiert kanalgerechte Varianten</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">Aus einem Diabetes-Baustein wird ein Social-Post, ein Newsletter-Absatz, eine App-Notification oder ein Webseitentext.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">3</span>
                    <div>
                      <p className="text-sm font-semibold">Redakteure steuern und freigeben</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">KI liefert Entwürfe. Die Redaktion prüft, passt an, gibt frei. Schneller als Neuschreiben, sicherer als Copy-Paste.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kanäle */}
              <div className="border border-border p-5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Ein Baustein, viele Kanäle</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { kanal: "Website", ton: "Ausführlich, SEO-optimiert", format: "Ratgeber-Artikel" },
                    { kanal: "App-Push", ton: "Kurz, handlungsorientiert", format: "1-2 Sätze + CTA" },
                    { kanal: "Newsletter", ton: "Persönlich, einladend", format: "Teaser + Link" },
                    { kanal: "Social Media", ton: "Nahbar, aktivierend", format: "Karussell oder Short" },
                    { kanal: "Chatbot", ton: "Situationsgerecht (Intention)", format: "Dialogisch" },
                    { kanal: "Print-Flyer", ton: "Kompakt, überfliegbar", format: "Fakten-Box" },
                  ].map((k) => (
                    <div key={k.kanal} className="rounded bg-muted/50 p-2.5">
                      <p className="text-xs font-semibold">{k.kanal}</p>
                      <p className="text-xs text-muted-foreground">{k.ton}</p>
                      <p className="mt-0.5 text-xs italic text-muted-foreground/70">{k.format}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kernaussage */}
            <div className="border-l-4 border-primary bg-muted/50 p-6">
              <p className="text-sm font-bold">
                Die Pipeline baut nicht nur ein Assistenten-Gedächtnis. Sie baut eine Infrastruktur für die gesamte Gesundheitskommunikation.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Wenn die Fachredaktion einen Baustein aktualisiert, profitieren alle Kanäle sofort.
                Kein Abgleich zwischen Webseite, App und Newsletter. Kein veralteter Social-Post
                neben aktueller Webseite. Eine Quelle der Wahrheit. Viele Stimmen.
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
