# AOK-Stilanalyse: So schreibt die Gesundheitswelt heute

Analyse der aktuellen AOK-Sachsen-Anhalt-Artikel auf deine-gesundheitswelt.de. Diese Stilanalyse dient als Referenz fuer die Content-Generierung.

## Seitenstruktur (wiederkehrendes Muster)

Jede Leistungsseite folgt demselben Aufbau:

1. **H1:** Leistungsname ("Pflegegeld", "Entlastungsbetrag")
2. **Titelbild:** Situationsfoto (Pfleger mit Seniorin, Mann schiebt Rollstuhl)
3. **H2: "Was ist [Leistung]?"** — Definition in 2-3 Saetzen
4. **H2: "In welchem Rahmen uebernimmt die AOK Sachsen-Anhalt die Leistung?"** — Betraege, Voraussetzungen
5. **H2: "Wie beantrage ich die Leistung?"** — Schritt-fuer-Schritt
6. **H2: "Haeufige Fragen und Antworten zur Leistung"** — FAQ-Accordion
7. **Infobox: "Wussten Sie schon, dass..."** — Zusatzinfo, Cross-Selling
8. **Teaser: "Weitere Leistungen"** — 3 verwandte Leistungen als Karten
9. **Footer-CTA:** "Jetzt bei der AOK Sachsen-Anhalt versichern"

## Sprachstil

### Ansprache
- Durchgehend **Sie-Form** ("Sie haben Anspruch auf...", "Reichen Sie uns bitte ein...")
- Direkte Ansprache, nicht unpersoenlich ("Ihre Pflegekasse" statt "Die Pflegekasse")
- AOK als "wir" ("Wir uebernehmen...", "Bei uns beantragen")

### Tonalitaet
- **Sachlich-freundlich** — informativ ohne trocken zu sein
- **Hilfsbereit** — "Unsere Kollegen im Kundencenter sind Ihnen gern behilflich"
- **Nicht emotional** — keine Empathie-Saetze, keine Betroffenheitsrhetorik
- **Leicht werblich** — "Wussten Sie schon, dass...", CTA-orientiert

### Satzbau
- Eher kurze Saetze (10-20 Woerter)
- Hauptsatz-Stil, wenig Verschachtelung
- Aufzaehlungen und Listen haeufig
- Fachbegriffe werden erklaert ("Von Pflegesachleistung spricht man, wenn...")

### Typische Formulierungen
- "Die Pflegekasse der AOK Sachsen-Anhalt zahlt..."
- "Pflegebeduerftige des Pflegegrades 2 bis 5 haben Anspruch auf..."
- "Den Antrag koennen Sie ganz einfach in der Meine Gesundheitswelt ausfuellen"
- "Das Ausdrucken und Unterschreiben entfallen"
- "Unsere Kollegen im Kundencenter oder am Servicetelefon sind Ihnen gern behilflich"

## Was gut funktioniert (beibehalten)

- Klare Seitenstruktur — Nutzer wissen sofort, wo sie was finden
- FAQ-Bereich — adressiert echte Nutzerfragen
- "Wussten Sie schon" — gutes Element fuer Cross-Selling
- Verwandte Leistungen als Karten — foerdert Navigation
- Direktlinks zu "Meine Gesundheitswelt" — senkt Huerde zur Antragstellung

## Was verbessert werden kann (Mehrwert durch Content-Generator)

| Aktuell | Verbesserung | Warum |
|---|---|---|
| Eine Seite fuer alle Zielgruppen | Zielgruppenspezifische Varianten | Angehoerige haben andere Fragen als Pflegebeduerftige |
| Betraege im Fliesstext | Betraege in Tabellen | GEO: Tabellen werden als Snippets uebernommen |
| H2s als Kategorien ("In welchem Rahmen...") | H2s als Nutzerfragen ("Wie viel Pflegegeld gibt es?") | GEO: Frage-Ueberschriften matchen besser |
| Keine Rechtsgrundlagen sichtbar | § 37 SGB XI etc. sichtbar | GEO: Autoritaetssignal |
| Kein Stand-Datum sichtbar | "Stand: Maerz 2026" prominent | GEO: Aktualitaetssignal |
| FAQ im Accordion (oft nicht gescraped) | FAQ als offener HTML-Block | GEO: AI-Systeme koennen Accordions nicht lesen |
| Keine strukturierten Daten | Schema.org FAQ, HowTo Markup | GEO: Direkte Snippet-Uebernahme |
| Gleicher Text fuer Desktop und Mobil | Kurzversion fuer mobile Ansicht | UX: Mobile Nutzer brauchen andere Textlaenge |

## AOK-Seitentypen

| Typ | Aufbau | Beispiele |
|---|---|---|
| **Leistungsseite** | Was ist? → Rahmen → Antrag → FAQ → Verwandte | Pflegegeld, Sachleistung, Entlastung |
| **Ratgeber-Artikel** | Problem → Loesung → Tipps → Verwandte | Demenz im Alltag, Pflege zu Hause |
| **Service-Seite** | Angebot → Inhalt → Teilnahme | Pflegekurs, FamilienCoach |
| **Uebersichtsseite** | Cluster-Intro → Themen-Kacheln → CTA | Pflege-Hauptseite |

## Stilregeln fuer den Content-Generator

Beim Generieren von AOK-Content diese Regeln beachten:

1. **Sie-Form beibehalten** (ausser bei explizit jungem Zielpublikum)
2. **AOK als "wir"** wo sinnvoll ("Wir uebernehmen die Kosten...")
3. **Keine Empathie-Floskeln** ("Wir verstehen, dass das schwer ist...") — stattdessen sachlich helfen
4. **Betraege immer mit "bis zu"** wenn es Hoechstbetraege sind
5. **"Meine Gesundheitswelt"** als etablierten Begriff fuer das Online-Portal nutzen
6. **Servicetelefon** konkret nennen, nicht nur "rufen Sie uns an"
7. **Kein Marketingsprech** ("Profitieren Sie von...", "Ihr Vorteil:") — stattdessen direkt informieren
