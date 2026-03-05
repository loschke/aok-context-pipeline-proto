import Link from "next/link"
import { ArrowRight, Lightbulb, Shield } from "lucide-react"

// --- Data ---

const kommunikationshaltung = [
  {
    name: "Transparent mit Empfehlung",
    beschreibung:
      "Alternativen zeigen und klare Einordnung geben. Nicht nur 'Es gibt A, B und C', sondern 'Fuer Ihre Situation ist A die naheliegendste Option.' Der Assistent nimmt die Recherche ab, nicht die Entscheidung.",
  },
  {
    name: "Auf Augenhoehe",
    beschreibung:
      "Nicht belehrend, nicht herablassend. Fachbegriffe erklaeren, ohne zu dozieren. Fragen ernst nehmen, auch wenn sie einfach wirken. Keine uebermaessigen Entschuldigungen fuer Grenzen.",
  },
  {
    name: "Sachlich, nicht kalt",
    beschreibung:
      "Kein Chatbot mit Emojis und kein Paragraphen-Automat. Sachlich bei Leistungsfragen, ruhig bei Ueberforderung, motivierend bei Praevention. Ton passt sich an, Substanz bleibt.",
  },
]

const sublayer = [
  {
    nummer: 1,
    name: "Unternehmenslayer",
    frage: "Was darf gesagt werden?",
    beschreibung: "Harte Constraints, die unabhaengig von Intention oder Situation gelten. Das nicht verhandelbare Fundament.",
    aspekte: [
      { label: "Fachlich & rechtlich korrekt", detail: "Aussagen muessen stimmen. SGB, Satzung, Regelungen." },
      { label: "Vertraulich & sicher", detail: "Schutz aller persoenlichen Daten. Keine ungesicherte Weitergabe." },
      { label: "Standardisiert", detail: "Gleiche Faktenfrage = gleiche Faktenantwort. Konsistenz." },
    ],
  },
  {
    nummer: 2,
    name: "Intentionslayer",
    frage: "Was wird kommuniziert?",
    beschreibung: "Die erkannte Intention steuert, WAS der Assistent sagt und WIE er es gewichtet. Tonalitaet, Informationstiefe und Proaktivitaet werden pro Intention konfiguriert.",
    aspekte: [
      { label: "Tonalitaet", detail: "Beruhigend bei Sorge, sachlich bei Leistungsfragen, motivierend bei Praevention." },
      { label: "Informationstiefe", detail: "Minimal bei Ueberforderung, maximal bei Fakten-Hunger." },
      { label: "Proaktivitaet", detail: "Aktiv auf verwandte Leistungen hinweisen oder abwarten." },
    ],
  },
  {
    nummer: 3,
    name: "Delivery-Layer",
    frage: "Wie wird es ausgeliefert?",
    beschreibung: "Die Antwort wird an die konkrete Situation angepasst: Geraet, Kanal, kognitive Kapazitaet und Sprachregister des Nutzers.",
    aspekte: [
      { label: "Kognitive Kapazitaet", detail: "Niedrig (Stress) = radikal kuerzen. Mittel = portionieren. Hoch = vollstaendig." },
      { label: "Format", detail: "Quick-Scan vs. Deep-Dive, abhaengig von Kanal und Anfragekomplexitaet." },
      { label: "Sprachregister", detail: "Default: Alltagssprache. Fachsprache nur wenn konfiguriert oder Nutzer sie verwendet." },
    ],
  },
]

const steuerParameter = [
  {
    name: "Tonalitaet",
    beschreibung: "Der emotionale Grundton der Antwort. Abhaengig von der emotionalen Lage des Nutzers.",
    auspraegungen: ["Beruhigend, empathisch", "Strukturiert, sachlich-warm", "Sachlich, kompetent", "Direkt, klar", "Partnerschaftlich", "Unterstuetzend, wertschaetzend", "Motivierend, einladend"],
  },
  {
    name: "Informationstiefe",
    beschreibung: "Wie viel Information pro Antwort. Der Mensch bestimmt das Tempo, die Intention gibt den Default.",
    auspraegungen: ["Minimal — Ein Satz, ein naechster Schritt", "Mittel — Kernfakten + wichtigste Verweise", "Hoch — Vollstaendige Details, Rechtsgrundlagen, Hintergruende", "Praezise — Exakte Zahlen und Fakten, nichts drumherum"],
  },
  {
    name: "Proaktivitaet",
    beschreibung: "Ob der Assistent aktiv auf verwandte Themen hinweist oder nur antwortet, was gefragt wurde.",
    auspraegungen: ["Hoch — Verwandte Leistungen nennen, Follow-ups anbieten", "Mittel — Naheliegendes erwaehnen, nicht draengen", "Gering — Nur beantworten, was gefragt wurde"],
  },
  {
    name: "Ausgabemedium",
    beschreibung: "Der Kanal, ueber den die Antwort den Nutzer erreicht. Situation, Geraet und Informationstyp bestimmen das Medium.",
    auspraegungen: ["Chat (Desktop) — Strukturiert, mit Tabellen und Verweisen", "Chat (Mobil/Sprache) — Kurz, scanbar, Kernzahlen", "Push-Nachricht — 1-2 Saetze, ein Handlungsimpuls", "Audio/Vorlese — Gesprochener Ton, linear", "PDF/Dokument — Druckfaehig, vollstaendig", "Wizard — Einzelne Schritte, interaktiv"],
  },
]

const parameterMatrix = [
  { intention: "I1 Akute Sorge", tonalitaet: "Beruhigend, empathisch", tiefe: "Minimal", proaktivitaet: "Hoch", medium: "Chat, Push, Audio" },
  { intention: "I2 Frische Diagnose", tonalitaet: "Strukturiert, sachlich-warm", tiefe: "Mittel", proaktivitaet: "Mittel", medium: "Chat, PDF, Wizard" },
  { intention: "I3 Behandlungssuche", tonalitaet: "Sachlich, kompetent", tiefe: "Hoch", proaktivitaet: "Mittel", medium: "Chat, Uebersicht, PDF" },
  { intention: "I4 Leistungsklaerung", tonalitaet: "Direkt, klar", tiefe: "Praezise", proaktivitaet: "Niedrig", medium: "Chat, PDF" },
  { intention: "I5 Langzeit-Management", tonalitaet: "Partnerschaftlich", tiefe: "Anpassbar", proaktivitaet: "Gering", medium: "Push, Audio, Chat" },
  { intention: "I6 Angehoerigen-Sorge", tonalitaet: "Unterstuetzend", tiefe: "Mittel", proaktivitaet: "Hoch", medium: "PDF, Wizard, Chat" },
  { intention: "I7 Praeventive Vorsorge", tonalitaet: "Motivierend", tiefe: "Mittel", proaktivitaet: "Mittel", medium: "Push, Audio, Uebersicht" },
]

const ausgabeMedien = [
  { name: "Chat (Desktop)", wannSinnvoll: "Standard bei direkten Fragen im Assistenten", format: "Strukturierter Text, Listen, Tabellen, Verweise. Ausfuehrlich moeglich." },
  { name: "Chat (Mobil/Sprache)", wannSinnvoll: "Unterwegs, Sprachnotiz, schnelle Frage zwischendurch", format: "Kurz, scanbar. Kernzahlen zuerst, Angebot zur Vertiefung." },
  { name: "Push-Nachricht", wannSinnvoll: "Erinnerungen, Fristen, proaktive Hinweise auf neue Leistungen", format: "1-2 Saetze, ein konkreter Impuls, Handlungsaufforderung." },
  { name: "Audio/Vorlese", wannSinnvoll: "Pendeln, Haushalt, Seheinschraenkung", format: "Gesprochener Ton, linearer Aufbau, keine visuellen Elemente." },
  { name: "PDF/Dokument", wannSinnvoll: "Arztbesuch, Behoerdengang, Checklisten zum Ausdrucken", format: "Druckfaehig, vollstaendig, mit Rechtsgrundlagen und Quellenverweisen." },
  { name: "Wizard", wannSinnvoll: "Erstantrag, komplexer Prozess, Schritt-fuer-Schritt-Fuehrung", format: "Einzelne Schritte, interaktiv, ein Screen pro Entscheidung." },
]

const situationen = [
  { situation: "Mobil unterwegs", anpassung: "Kurze, scanbare Antworten. Listen statt Fliesstext.", medium: "Push, Audio, Chat (kompakt)" },
  { situation: "Am Desktop", anpassung: "Ausfuehrlicher, mit Tabellen und Vergleichen.", medium: "Chat, PDF, Uebersicht" },
  { situation: "Unter Stress", anpassung: "Beruhigender Ton. Ein naechster Schritt. Keine Informationsflut.", medium: "Chat (kurz), Audio" },
  { situation: "Recherche-Modus", anpassung: "Alle Details. Rechtsgrundlagen. Verknuepfungen.", medium: "Chat (ausfuehrlich), PDF, Uebersicht" },
]

const standardVerhalten = [
  { verhalten: "Haftungshinweis bei Betraegen", beschreibung: "Bei konkreten Euro-Betraegen Hinweis, dass individuelle Ansprueche abweichen koennen", deaktivierbar: "AOK" },
  { verhalten: "Verweis an Fachberatung", beschreibung: "Bei Fragen, die individuelle Beratung erfordern, Verweis an zustaendige Stelle", deaktivierbar: "AOK" },
  { verhalten: "Aktualitaetshinweis", beschreibung: "Bei volatilen Daten (Betraege, Fristen) den Stand angeben", deaktivierbar: "AOK" },
  { verhalten: "Alltagssprache als Standard", beschreibung: "Fachbegriffe erklaeren oder in Alltagssprache uebersetzen", deaktivierbar: "Versicherter" },
  { verhalten: "Quellenverweis", beschreibung: "Bei Leistungsinformationen die Rechtsgrundlage angeben", deaktivierbar: "AOK" },
]

const erweitertesVerhalten = [
  { verhalten: "Fachsprache ohne Erklaerung", beschreibung: "Medizinische und rechtliche Begriffe ohne Vereinfachung", aktivierbar: "Versicherter oder AOK" },
  { verhalten: "Proaktive Zusatzinfos", beschreibung: "Aktiv verwandte Themen anbieten, auch wenn nicht gefragt", aktivierbar: "AOK (pro Cluster)" },
  { verhalten: "Detaillierte Prozesse", beschreibung: "Schritt-fuer-Schritt mit Formularen und Dokumenten", aktivierbar: "AOK (pro Cluster)" },
  { verhalten: "Persoenlichere Ansprache", beschreibung: "Informellerer Ton, z.B. fuer Praevention", aktivierbar: "AOK (pro Cluster)" },
]

// --- Component ---

export default function KommunikationPage() {
  return (
    <div className="mx-auto max-w-4xl py-12">
      {/* Header */}
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Die Stimme des Assistenten
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Kommunikations-Layer
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Der Agent Context liefert das Was. Hier geht es um das Wie: Tonalitaet,
        Informationstiefe, Kanalanpassung und Format. Gesteuert durch drei Sublayer
        und vier Parameter, die jede Antwort an die Situation des Menschen anpassen.
      </p>

      {/* Kommunikationshaltung */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="size-4 text-primary" />
          <p className="text-sm font-semibold">Kommunikationshaltung (Verfassung)</p>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Drei Grundsaetze, bevor irgendein Parameter greift. Sie kommen aus der
          Assistenten-Verfassung und sind nicht verhandelbar.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {kommunikationshaltung.map((h) => (
            <div key={h.name} className="border bg-card p-4">
              <p className="mb-1 text-sm font-bold">{h.name}</p>
              <p className="text-sm text-muted-foreground">{h.beschreibung}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Drei Sublayer */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Architektur
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Drei Sublayer
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Die Kommunikationsschicht hat drei Layer, die aufeinander aufbauen.
          Jeder Layer beantwortet eine andere Frage und hat andere Verantwortliche.
        </p>

        <div className="flex flex-col gap-4">
          {sublayer.map((layer) => (
            <div key={layer.nummer} className="border bg-card p-5">
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-xs font-bold text-primary tabular-nums">{layer.nummer}</span>
                <h3 className="text-base font-bold tracking-tight">{layer.name}</h3>
                <p className="text-sm italic text-muted-foreground">&ldquo;{layer.frage}&rdquo;</p>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">{layer.beschreibung}</p>
              <div className="border-t border-dashed border-muted pt-3">
                <div className="space-y-2">
                  {layer.aspekte.map((a) => (
                    <div key={a.label}>
                      <p className="text-sm">
                        <span className="font-semibold">{a.label}</span>
                        <span className="text-muted-foreground"> — {a.detail}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vier Steuerparameter */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Steuerung
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Vier Parameter
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Jede Antwort des Assistenten wird durch vier Parameter gesteuert.
          Die Intention gibt den Default, die Situation kann ihn ueberschreiben.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {steuerParameter.map((param, i) => (
            <div key={param.name} className="border bg-card p-4">
              <div className="mb-2 flex items-baseline gap-2">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="text-sm font-bold">{param.name}</p>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{param.beschreibung}</p>
              <div className="border-t border-dashed border-muted pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {param.auspraegungen.map((a) => (
                    <span key={a} className="rounded-full bg-muted px-2 py-0.5 text-xs">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parameter-Matrix */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Konfiguration
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Parameter-Matrix
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Der operative Kern: Welche Parameter gelten fuer welche Intention?
          Die Matrix definiert den Default. Die Situation kann einzelne Werte ueberschreiben.
        </p>

        <div className="overflow-x-auto border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Intention</th>
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tonalitaet</th>
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tiefe</th>
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Proaktivitaet</th>
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Medium</th>
              </tr>
            </thead>
            <tbody>
              {parameterMatrix.map((row) => (
                <tr key={row.intention} className="border-b last:border-b-0">
                  <td className="p-3 font-medium">{row.intention}</td>
                  <td className="p-3 text-muted-foreground">{row.tonalitaet}</td>
                  <td className="p-3 text-muted-foreground">{row.tiefe}</td>
                  <td className="p-3 text-muted-foreground">{row.proaktivitaet}</td>
                  <td className="p-3 text-muted-foreground">{row.medium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ausgabemedien */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Kanaele
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Ausgabemedien
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Dieselbe Antwort kann auf voellig unterschiedlichen Wegen ankommen.
          Die Fakten bleiben identisch. Nur Laenge, Ton, Struktur und Format aendern sich.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {ausgabeMedien.map((m) => (
            <div key={m.name} className="border bg-card p-4">
              <p className="mb-1 text-sm font-bold">{m.name}</p>
              <p className="mb-2 text-xs text-muted-foreground">{m.wannSinnvoll}</p>
              <div className="border-t border-dashed border-muted pt-2">
                <p className="text-sm text-muted-foreground">{m.format}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Situations-Anpassung */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Situationskontext
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Situations-Anpassung
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Neben der Intention beeinflusst auch die aeussere Situation die Kommunikation.
          Dasselbe Thema, komplett anders geliefert.
        </p>

        <div className="mb-4 overflow-x-auto border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Situation</th>
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Anpassung</th>
                <th className="p-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Bevorzugtes Medium</th>
              </tr>
            </thead>
            <tbody>
              {situationen.map((s) => (
                <tr key={s.situation} className="border-b last:border-b-0">
                  <td className="p-3 font-medium">{s.situation}</td>
                  <td className="p-3 text-muted-foreground">{s.anpassung}</td>
                  <td className="p-3 text-muted-foreground">{s.medium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Beispiel */}
        <div className="border bg-muted/30 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="size-4 text-primary" />
            <p className="text-sm font-semibold">Gleiches Thema, drei Situationen</p>
          </div>
          <p className="mb-4 text-sm italic text-muted-foreground">
            &ldquo;Meine Mutter hat Pflegegrad 2. Welche Leistungen stehen ihr zu?&rdquo;
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border bg-card p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Desktop-Chat</p>
              <p className="text-xs text-muted-foreground">
                Ausfuehrliche strukturierte Antwort mit Betraegen in Tabelle,
                Verweisen auf verwandte Leistungen (Kombinationsleistung, Entlastungsbetrag)
                und Haftungshinweis.
              </p>
            </div>
            <div className="border bg-card p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Sprachnotiz unterwegs</p>
              <p className="text-xs text-muted-foreground">
                &ldquo;Bei Pflegegrad 2 gibt es Pflegegeld (332 EUR/Monat) oder Sachleistung
                (761 EUR/Monat). Soll ich dir spaeter eine vollstaendige Uebersicht schicken?&rdquo;
              </p>
            </div>
            <div className="border bg-card p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Push am naechsten Tag</p>
              <p className="text-xs text-muted-foreground">
                &ldquo;Tipp: Bei Pflegegrad 2 steht euch auch ein Entlastungsbetrag von
                125 EUR/Monat zu. Schon genutzt?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Konfigurierbare Verhaltensweisen */}
      <div className="mb-10">
        <p className="micro-label mb-4 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Konfiguration
        </p>
        <h2 className="headline-black mb-2 text-2xl">
          Konfigurierbare Verhaltensweisen
          <span className="text-primary">.</span>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Neben den harten Constraints gibt es Verhaltensweisen, die per Default an oder aus sind.
          Die AOK als Operator oder der Versicherte als Nutzer koennen sie anpassen.
        </p>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Default an</p>
          <div className="flex flex-col gap-2">
            {standardVerhalten.map((v) => (
              <div key={v.verhalten} className="flex items-start justify-between gap-4 border bg-card p-3">
                <div>
                  <p className="text-sm font-medium">{v.verhalten}</p>
                  <p className="text-xs text-muted-foreground">{v.beschreibung}</p>
                </div>
                <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-800">
                  Deaktivierbar: {v.deaktivierbar}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Default aus</p>
          <div className="flex flex-col gap-2">
            {erweitertesVerhalten.map((v) => (
              <div key={v.verhalten} className="flex items-start justify-between gap-4 border bg-card p-3">
                <div>
                  <p className="text-sm font-medium">{v.verhalten}</p>
                  <p className="text-xs text-muted-foreground">{v.beschreibung}</p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Aktivierbar: {v.aktivierbar}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Abgrenzung */}
      <div className="mb-10 border bg-muted/30 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="size-4 text-primary" />
          <p className="text-sm font-semibold">Einordnung in die Gesamtarchitektur</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Der Kommunikations-Layer formt die Antwort. Was inhaltlich drinsteht, kommt aus dem{" "}
          <Link href="/agent-context" className="font-medium text-primary hover:underline">Agent Context</Link>.
          Welches Beduerfnis bedient wird, erkennt der Sensor ({" "}
          <Link href="/intentionen" className="font-medium text-primary hover:underline">Intentionen</Link>).
          Wie das Wissen entsteht, beschreibt die{" "}
          <Link href="/contextualisierung" className="font-medium text-primary hover:underline">Contextualisierung</Link>.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 border border-primary/20 bg-primary/5 p-6">
        <p className="mb-1 text-sm font-semibold">Kommunikation in Aktion sehen</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Der Intention Simulator zeigt transparent, wie die Pipeline eine Anfrage verarbeitet —
          inklusive der Kommunikationsparameter und Medienauswahl in Schritt 4 und 5.
        </p>
        <Link
          href="/assistant?expert=simulator"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Intention Simulator oeffnen
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
