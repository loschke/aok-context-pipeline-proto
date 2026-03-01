import { CheckCircle } from "lucide-react"

export default function QualitaetPage() {
  return (
    <div className="mx-auto max-w-3xl py-12">
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Qualitaetssicherung
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Qualitaetssicherung
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Bausteine gegen definierte Kriterien pruefen, bevor sie in den
        Kontext-Speicher des AI-Assistenten uebernommen werden.
      </p>

      <div className="space-y-4">
        {[
          {
            title: "Faktische Korrektheit",
            desc: "Stimmen die Inhalte mit den AOK-Quellen ueberein? Keine veralteten Informationen?",
          },
          {
            title: "Vollstaendigkeit",
            desc: "Deckt der Baustein das Thema ausreichend ab? Fehlen wichtige Aspekte?",
          },
          {
            title: "Verfassungs-Konformitaet",
            desc: "Haelt der Baustein die Hard Constraints ein? Keine Diagnosen, keine Leistungszusagen?",
          },
          {
            title: "Kontext-Anreicherung",
            desc: "Sind alle 5 Dimensionen befuellt? Metadaten vollstaendig?",
          },
          {
            title: "Zielgruppen-Passung",
            desc: "Ist die Sprache fuer die Zielgruppe angemessen? Verstaendlich ohne Fachjargon?",
          },
          {
            title: "Duplikat-Pruefung",
            desc: "Gibt es Ueberschneidungen mit bestehenden Bausteinen? Redundanzen?",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-4 border bg-card p-5">
            <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="mb-1 text-sm font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
