# Content-to-Context Pipeline: Die 8 Schritte

## Kernthese: Content ist nicht Context

Website-Content ist fuer Google und Menschen optimiert: SEO-Keywords, Marketing-Sprache, fragmentierte Informationen ueber mehrere Seiten verteilt, Accordion-Inhalte die im Scraping verloren gehen koennen.

LLMs brauchen etwas anderes: strukturierten, informationsdichten Context mit Metadaten fuer praezises Retrieval.

| Problem bei Website-Content | Auswirkung auf LLM |
|---|---|
| Niedrige Informationsdichte | LLM muss durch Marketing-Filler suchen |
| Fragmentiertes Wissen | Gleiche Info auf 5 Seiten, unterschiedlich formuliert |
| Fehlende Relationen | LLM erkennt nicht, dass Pflegegeld und Sachleistung zusammengehoeren |
| Marketing-Rauschen | "Wir sind fuer Sie da!" ist kein verwertbarer Fakt |
| Accordion-Inhalte | Wichtige Details versteckt, beim Scraping oft verloren |

## Die 8 Schritte

### Schritt 1: Content-Extraktion
Firecrawl scraped AOK-Webseiten. Ergebnis: Roher Seiteninhalt als Markdown.
- Werkzeug: Firecrawl SDK (Search, Scrape, Crawl, Map)
- Input: URL-Liste oder Sitemap
- Output: Markdown pro Seite
- Automatisierungsgrad: Voll automatisiert

### Schritt 2: Baustein-Extraktion (Pass 1)
LLM zerlegt den Rohtext in atomare Wissensbausteine. Freie Kategorisierung. Jeder Baustein beantwortet genau eine Frage vollstaendig.
- 8 Bausteintypen: FAKT, EMPFEHLUNG, ANLEITUNG, FAQ, CHECKLISTE, VERGLEICH, GLOSSAR, NAVIGATION
- Entscheidungshilfe: "Koennte jemand genau diese Information suchen?" → Eigener Baustein
- Automatisierungsgrad: Ueberwiegend automatisiert (LLM)

### Schritt 3: Taxonomie-Konsolidierung
Kategorien aus Pass 1 werden vereinheitlicht. Ziel: Konsistente Themenstruktur fuer den gesamten Cluster.
- 6 Qualitaetskriterien: Trennscharf, Vollstaendig, Granular genug, Nicht zu granular, Nutzernah, Konsistent
- Automatisierungsgrad: LLM-Vorschlag + menschliche Validierung

### Schritt 4: Re-Kategorisierung (Pass 2)
Bausteine werden gegen die konsolidierte Taxonomie geprueft und zugeordnet.
- Automatisierungsgrad: Ueberwiegend automatisiert (LLM)

### Schritt 5: Gruppierung und Duplikat-Erkennung
Aehnliche Bausteine werden identifiziert. Wichtig: Echte Duplikate vs. ergaenzende Perspektiven unterscheiden.
- "Pflegegeld ab PG2" auf 3 Seiten = Duplikat → zusammenfuehren
- "Pflegegeld-Kuerzung bei versaeumtem Beratungseinsatz" = eigene Perspektive → behalten
- Automatisierungsgrad: LLM-Vorschlag + menschliche Entscheidung

### Schritt 6: Konsolidierung
Duplikate zusammenfuehren, Luecken fuellen, Informationen ergaenzen.
- Automatisierungsgrad: LLM + menschliche Pruefung

### Schritt 7: Context-Anreicherung und Struktur-Aufbau
Jeder Baustein wird mit den 5 Kontextdimensionen angereichert (Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe). Frontmatter wird generiert, Relationen werden definiert.
- Automatisierungsgrad: LLM-Entwurf + menschliche Anreicherung (braucht Fachwissen)

### Schritt 8: QS durch AOK
Fachredaktion prueft Inhalt, Betraege, Vorsichtshinweise. Formale Freigabe.
- Automatisierungsgrad: Manuell (AOK-Team)

## Automatisierung vs. Human-in-the-Loop

| Schritte | Automatisierungsgrad | Wer |
|----------|---------------------|-----|
| 1-6 | Ueberwiegend automatisiert | Pipeline Workbench (LLM) |
| 7 | LLM-Entwurf + Anreicherung | Projektteam + Fachexpertise |
| 8 | Manuell | AOK-Fachredaktion |

## Proof of Concept

Der Pflege-Cluster wurde mit dieser Pipeline verarbeitet: 10 Seiten ergaben 73 Bausteine. 15 davon sind als Knowledge Base im Pflegeberater-Prototyp live und funktionieren.
