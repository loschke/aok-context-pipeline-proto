# Cluster-Pipeline — Methodik und Dokumentformat

## Ueberblick

Die Cluster-Pipeline transformiert N Webseiten eines Themenclusters in ein einzelnes, LLM-optimiertes Markdown-Dokument. 4 Schritte statt 8, Stunden statt Tage pro Cluster.

## Die 4 Schritte

### Schritt 1: Content-Extraktion
Identisch zur Baustein-Pipeline. Firecrawl scraped die Quellseiten.
- Input: URL-Liste (bis zu 50 URLs pro Cluster)
- Output: Ein Markdown-File pro Quellseite
- Werkzeug: Firecrawl SDK

### Schritt 2: Analyse und Themenstruktur
LLM analysiert alle Rohseiten und erstellt eine Gliederung (Outline).
- Input: Alle Rohseiten des Clusters
- Output: Strukturierter Gliederungsvorschlag als Markdown
- Kernaufgaben:
  - Nach Themen gruppieren (nicht nach Quellseite)
  - Duplikate erkennen
  - Luecken identifizieren
  - Gliederung mit H2-Abschnitten vorschlagen

### Schritt 3: Synthese zum Cluster-Dokument
LLM erzeugt aus Rohseiten + Gliederung das finale Dokument.
- Input: Alle Rohseiten + Gliederung aus Schritt 2
- Output: Ein Markdown-Dokument mit YAML-Frontmatter
- Kernaufgaben:
  - Informationen entlang der Gliederung zusammenfuehren
  - Marketing-Sprache entfernen
  - Duplikate eliminieren (beste Version behalten)
  - Konkrete Zahlen, Betraege, Fristen uebernehmen
  - Widersprueche markieren

### Schritt 4: Menschliche Pruefung und Freigabe
Projektteam/AOK pruefen das Dokument.
- Pruefpunkte: Korrektheit, Vollstaendigkeit, Halluzinationen, Struktur, Widersprueche
- Status im YAML-Frontmatter: entwurf → geprueft → freigegeben

## Dokumentformat

### YAML-Frontmatter (minimale Metadaten)

```yaml
---
cluster: pflege
titel: "Pflege — Vollstaendiger Context"
quellen:
  - url: "https://www.deine-gesundheitswelt.de/pflege/pflegegeld"
    crawl_datum: "2026-03-01"
  - url: "https://www.deine-gesundheitswelt.de/pflege/sachleistung"
    crawl_datum: "2026-03-01"
stand: "2026-03-01"
seitenanzahl_quelle: 24
status: entwurf
---
```

Nur Identifikation und Wartung. Kein volles Frontmatter-Schema wie bei Bausteinen.

### Strukturregeln

- **Ueberschriften-Hierarchie:** Max 3 Ebenen (H1 = Cluster, H2 = Thema, H3 = Unterthema)
- **Abschnittslaenge:** 200-500 Woerter pro H2-Abschnitt
- **Tabellen:** Fuer Betraege, Vergleiche, Stufungen immer Tabellen
- **Rechtsgrundlagen:** Als Blockquote am Ende des Abschnitts
- **FAQ-Abschnitt:** Am Ende fuer themenuebergreifende Fragen
- **Keine Redundanz:** Information nur einmal, bei Wiederholung "Siehe Abschnitt X"

### Qualitaetskriterien

- Kein Satz der nur Marketing ist ("Wir sind fuer Sie da")
- Jeder Absatz enthaelt mindestens einen konkreten Fakt
- Betraege und Zahlen immer mit Kontext (Pflegegrad, Voraussetzung, Stand)
- Keine Wiederholungen zwischen Abschnitten
- Bei widersprüchlichen Angaben: beide nennen und markieren

## Zielgroessen

| Cluster-Typ | Quellseiten | Dokumentgroesse | Tokens |
|---|---|---|---|
| Klein (z.B. Pubertaet) | 5-10 | 3.000-6.000 Woerter | 4.000-8.000 |
| Mittel (z.B. Zahngesundheit) | 10-20 | 6.000-12.000 Woerter | 8.000-16.000 |
| Gross (z.B. Pflege) | 20-40 | 12.000-20.000 Woerter | 16.000-27.000 |

**Grenze:** Ueber 30.000 Tokens ist kritisch — dann Baustein-Pipeline nutzen.

## Wann Cluster-Pipeline, wann Baustein-Pipeline?

| Anwendungsfall | Ansatz | Begruendung |
|---|---|---|
| Fokus-Assistent (ueberschaubares Thema) | Cluster | Thema passt in ein Dokument |
| PoC / schnelle Validierung | Cluster | In Stunden erstellbar |
| Pflege in voller Dimension (24+ Seiten) | Bausteine | Retrieval muss gezielt filtern |
| AOK-Superchat (alle Themen) | Bausteine | Kein Modell kann alles laden |
| Viele KI-Inseln, ein Wissenspool | Bausteine | Modellunabhaengig, kanaluebergreifend |
| Kleine/guenstige Modelle | Bausteine | Weniger Token-Last pro Anfrage |

## Hybride Wege

1. **Cluster als Startpunkt** — Schnell erstellen, Inhalt validieren, im PoC testen
2. **Atomarisierung bei Bedarf** — Wenn Cluster in Produktion geht oder auf kleinen Modellen laufen soll
3. **Cluster als Input fuer Baustein-Pipeline** — Validiertes Cluster-Dokument als bereinigter Input ab Schritt 2 der Baustein-Pipeline

## Token-Oekonomie (Vergleich)

Bei 30.000 Anfragen/Monat:

| | Cluster | Bausteine |
|---|---|---|
| Tokens pro Anfrage | ~30.000 | ~3.000 |
| Faktor | | 10x weniger |
| Geschaetzte Latenz | 8-20 Sekunden | 2-5 Sekunden |
