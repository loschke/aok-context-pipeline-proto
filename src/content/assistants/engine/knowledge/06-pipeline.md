# Contextualisierung: Zwei Ansaetze

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

## Zwei Ansaetze im Ueberblick

Die SAVA Engine nutzt zwei Contextualisierungsansaetze. Sie schliessen sich nicht aus — sie ergaenzen sich.

| Aspekt | Cluster-Pipeline | Baustein-Pipeline |
|--------|------------------|-------------------|
| Output | Ein Markdown-Dokument pro Cluster | Viele kleine Dateien mit Frontmatter |
| Schritte | 4 (Extraktion → Analyse → Synthese → Review) | 8 (Extraktion → ... → QS) |
| Granularitaet | Thematisch (1 Abschnitt = 1 Unterthema) | Atomar (1 Baustein = 1 Frage) |
| Metadaten | Minimale Header-Metadaten | Volles Frontmatter-Schema (5 Dimensionen) |
| Retrieval | Full Context Loading (alles laden) | Metadaten-Filter + Vektorsuche |
| Aufwand | Stunden pro Cluster | Tage pro Cluster |
| Token-Last | 15.000-40.000 pro Anfrage | 1.000-4.000 pro Anfrage |
| Modellabhaengigkeit | Braucht grosses Context Window | Funktioniert auch mit kleinen Modellen |
| Einsatz | PoC, Fokus-Assistenten, Validierung | Produktion, Multi-Modell, KI-Inseln |

## Ansatz A: Cluster-Pipeline (4 Schritte)

Ein gut strukturiertes Markdown-Dokument pro Themenbereich. Das Modell durchsucht den gesamten Text und findet selbst, was relevant ist.

### Schritt 1: Content-Extraktion
Firecrawl scraped die Quellseiten. Ergebnis: Ein Markdown-File pro Quellseite.

### Schritt 2: Analyse und Themenstruktur
LLM analysiert alle Rohseiten und erstellt eine Gliederung. Gruppierung nach Themen (nicht nach Quellseiten), Duplikate erkennen, Luecken markieren.

### Schritt 3: Synthese zum Cluster-Dokument
LLM erzeugt aus Rohseiten + Gliederung das finale Dokument. Marketing entfernen, Duplikate eliminieren, Fakten zusammenfuehren, YAML-Frontmatter mit minimalen Metadaten.

### Schritt 4: Menschliche Pruefung
Projektteam/AOK pruefen: Inhaltliche Korrektheit, Vollstaendigkeit, keine Halluzinationen, Widersprueche aufloesen.

### Dokumentformat

```yaml
---
cluster: pflege
titel: "Pflege — Vollstaendiger Context"
quellen:
  - url: "https://www.deine-gesundheitswelt.de/pflege/pflegegeld"
    crawl_datum: "2026-03-01"
stand: "2026-03-01"
status: entwurf | geprueft | freigegeben
---
```

Struktur: H1 = Cluster, H2 = Thema, H3 = Unterthema. Max 3 Ebenen. 200-500 Woerter pro H2. Tabellen fuer Betraege. FAQ-Abschnitt am Ende.

### Zielgroessen

| Cluster-Typ | Quellseiten | Dokumentgroesse | Tokens |
|---|---|---|---|
| Klein (Pubertaet) | 5-10 | 3.000-6.000 Woerter | 4.000-8.000 |
| Mittel (Zahngesundheit) | 10-20 | 6.000-12.000 Woerter | 8.000-16.000 |
| Gross (Pflege) | 20-40 | 12.000-20.000 Woerter | 16.000-27.000 |

Ueber 30.000 Tokens ist die Grenze — dann Baustein-Pipeline nutzen.

## Ansatz B: Baustein-Pipeline (8 Schritte)

Kleine, eigenstaendige Wissenseinheiten mit Frontmatter-Metadaten. Jeder Baustein beantwortet genau eine Frage. Retrieval liefert nur die relevanten Bausteine.

### Schritt 1: Content-Extraktion
Firecrawl scraped AOK-Webseiten. Ergebnis: Roher Seiteninhalt als Markdown.

### Schritt 2: Baustein-Extraktion (Pass 1)
LLM zerlegt den Rohtext in atomare Wissensbausteine. Freie Kategorisierung. 8 Bausteintypen: FAKT, EMPFEHLUNG, ANLEITUNG, FAQ, CHECKLISTE, VERGLEICH, GLOSSAR, NAVIGATION.

### Schritt 3: Taxonomie-Konsolidierung
Kategorien aus Pass 1 werden vereinheitlicht. 6 Qualitaetskriterien.

### Schritt 4: Re-Kategorisierung (Pass 2)
Bausteine werden gegen die konsolidierte Taxonomie zugeordnet.

### Schritt 5: Gruppierung und Duplikat-Erkennung
Echte Duplikate vs. ergaenzende Perspektiven unterscheiden.

### Schritt 6: Konsolidierung
Duplikate zusammenfuehren, Luecken fuellen.

### Schritt 7: Context-Anreicherung
Jeder Baustein wird mit den 5 Kontextdimensionen angereichert (Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe). Frontmatter und Relationen.

### Schritt 8: QS durch AOK
Fachredaktion prueft Inhalt, Betraege, Vorsichtshinweise.

### Automatisierung

| Schritte | Automatisierungsgrad | Wer |
|----------|---------------------|-----|
| 1-6 | Ueberwiegend automatisiert | Pipeline Workbench (LLM) |
| 7 | LLM-Entwurf + Anreicherung | Projektteam + Fachexpertise |
| 8 | Manuell | AOK-Fachredaktion |

## Welcher Ansatz passt wann?

| Anwendungsfall | Ansatz | Warum |
|---|---|---|
| Fokus-Assistent (z.B. Pubertaet) | Cluster | Thema passt in ein Dokument, ein Kanal, ein Modell |
| Pflege in voller Dimension | Bausteine | 24+ Seiten, dutzende Leistungen, Retrieval muss filtern |
| AOK-Superchat (alle Themen) | Bausteine | Kein Modell kann alle Cluster gleichzeitig laden |
| Viele KI-Inseln, ein Wissenspool | Bausteine | Eine Quelle, viele Nutzer, modellunabhaengig |
| PoC / Validierung | Cluster | Schnell erstellbar, gut zum Testen |

## Hybride Wege

Beide Ansaetze koexistieren:

1. **Cluster-Dokumente als Startpunkt** — Schnell erstellbar, validiert den Inhalt, funktioniert im PoC
2. **Atomarisierung wo noetig** — Wenn ein Cluster in Produktion geht, auf kleinen Modellen laufen soll, oder von mehreren KI-Inseln genutzt wird
3. **Cluster als Input fuer Baustein-Pipeline** — In einer Ausbaustufe kann das validierte Cluster-Dokument als bereinigter Input fuer die Baustein-Pipeline dienen (ab Schritt 2)

## Token-Oekonomie

Annahme: 30.000 Anfragen/Monat, ~500 Output-Tokens pro Antwort.

| | Cluster | Bausteine |
|---|---|---|
| Tokens pro Anfrage | 30.000 | 3.000 |
| Tokens pro Monat | 900M | 90M |
| Kosten pro Monat (nur Input) | ~$4.500 | ~$450 |
| Differenz | | 90% weniger Input-Kosten |

## Proof of Concept

Der Pflege-Cluster wurde mit der Baustein-Pipeline verarbeitet: 10 Seiten ergaben 73 Bausteine. 15 davon sind als Knowledge Base im Pflegeberater-Prototyp live und funktionieren.
