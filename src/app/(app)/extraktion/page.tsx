import { Globe } from "lucide-react"

export default function ExtraktionPage() {
  return (
    <div className="mx-auto max-w-3xl py-12">
      <p className="micro-label mb-4 flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Content Extraktion
      </p>
      <h1 className="headline-black mb-2 text-4xl">
        Content Extraktion
        <span className="text-primary">.</span>
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Webinhalte aus der AOK Gesundheitswelt extrahieren, bereinigen und als Rohmaterial
        fuer die Pipeline bereitstellen.
      </p>

      <div className="space-y-4">
        <div className="flex items-start gap-4 border bg-card p-5">
          <Globe className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="mb-1 text-sm font-semibold">Schritt 1: Firecrawl Scraping</p>
            <p className="text-sm text-muted-foreground">
              URLs aus dem Themencluster crawlen. Accordions aufklappen, Navigation entfernen,
              Rohtext als Markdown extrahieren.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 border bg-card p-5">
          <Globe className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="mb-1 text-sm font-semibold">Schritt 2: Bereinigung</p>
            <p className="text-sm text-muted-foreground">
              Marketing-Noise entfernen, Informationsdichte erhoehen, Struktur beibehalten.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 border bg-card p-5">
          <Globe className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="mb-1 text-sm font-semibold">Schritt 3: Rohbausteine</p>
            <p className="text-sm text-muted-foreground">
              Freie Kategorisierung der extrahierten Inhalte in erste Baustein-Kandidaten.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
