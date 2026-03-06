# Cluster-Dokument vs. Atomare Bausteine

Zwei Ansaetze der Context-Aufbereitung im Vergleich.

## Ausgangslage

AOK-Webseiten muessen so aufbereitet werden, dass ein LLM verlaesslich daraus antworten kann. Darueber sind sich alle einig. Die Frage ist: Wie granular?

### Ansatz A: Cluster-Dokument

Ein gut strukturiertes Dokument pro Themenbereich. Das Modell durchsucht den gesamten Text und findet selbst, was relevant ist.

### Ansatz B: Atomare Bausteine

Kleine, eigenstaendige Wissenseinheiten mit Metadaten. Retrieval liefert nur die relevanten Bausteine — das Modell bekommt praezisen Context.

## Ansatz A im Detail: Cluster-Dokument

Ein Markdown-Dokument pro Thema. Gut strukturiert, mit Ueberschriften, aber als zusammenhaengender Text.

Beispielstruktur:

```markdown
# Pflege-Cluster

## Pflegegeld
Pflegegeld wird bei haeuslicher Pflege durch Angehoerige gezahlt.
PG 2: 332 EUR | PG 3: 573 EUR | PG 4: 765 EUR | PG 5: 947 EUR
Rechtsgrundlage: § 37 SGB XI

## Pflegesachleistung
Bei Pflege durch einen Dienst...
PG 2: 761 EUR | PG 3: 1.432 EUR

## Kombinationsleistung
Pflegegeld und Sachleistung koennen anteilig kombiniert werden...
```

Eigenschaften:

- Gesamtes Dokument wird ins Context Window geladen (~15.000-40.000 Tokens pro Cluster)
- Modell durchsucht und findet selbst die relevanten Abschnitte — keine Retrieval-Logik noetig
- Erstellung in Stunden statt Tagen (LLM fasst zusammen, Redaktion prueft)

## Ansatz B im Detail: Atomare Bausteine

Eigenstaendige Wissenseinheiten mit Frontmatter-Metadaten. Jeder Baustein beantwortet genau eine Frage.

Beispielstruktur:

```yaml
---
titel: "Pflegegeld"
typ: FAKT
cluster: pflege
zielgruppe: [pflegebeduerft., angeh.]
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
  setting: "haeuslich"
relationen:
  - alternative_zu: sachleistung
stand: "2026-03-01"
---
PG 2: 332 EUR | PG 3: 573 EUR
PG 4: 765 EUR | PG 5: 947 EUR
```

Eigenschaften:

- Retrieval laedt nur 2-5 relevante Bausteine (~1.000-4.000 Tokens pro Anfrage)
- Metadaten ermoeglichen gezielte Suche (Zielgruppe, Pflegegrad, Typ) — Retrieval-System noetig
- Erstellung aufwaendiger: 8-Schritte-Pipeline (Tage statt Stunden, dafuer wartbarer)

## Trade-off-Matrix

### Aufwand, Wartung, Retrieval

| Achse | Cluster-Dokument | Atomare Bausteine |
|---|---|---|
| Erstellungsaufwand | Niedrig. LLM fasst zusammen, Redaktion prueft. Stunden pro Cluster. | Hoch. 8-Schritte-Pipeline, Taxonomie, Metadaten. Tage pro Cluster. |
| Wartbarkeit | Manuell durchsuchbar. Welcher Absatz enthaelt den Betrag? Kein Tracking von Aktualitaet. | Systematisch wartbar. Feld 'stand' und 'volatilitaet' ermoeglichen automatisches Flagging veralteter Inhalte. |
| Retrieval | Nicht noetig (bei 1 Cluster). Ganzes Dokument laden. Bei mehreren Clustern: Dokument-Level-Retrieval moeglich. | Praezise steuerbar. Metadaten-Filter + semantische Suche. Laedt nur was relevant ist. |

### Token-Last, Modellabhaengigkeit, Multi-Use

| Achse | Cluster-Dokument | Atomare Bausteine |
|---|---|---|
| Token-Last pro Anfrage | 15.000-40.000. Gesamtes Cluster geladen, auch irrelevante Abschnitte. | 1.000-4.000. Nur relevante Bausteine. Faktor 5-10x weniger. |
| Modellabhaengigkeit | Hoch. Braucht grosses Context Window und gute Suchfaehigkeit im langen Text. | Gering. Kurzer, praeziser Context. Funktioniert auch mit kleineren, guenstigeren Modellen. |
| Multi-Use / KI-Inseln | Ein Kanal, ein Modell. Dokument ist auf ein bestimmtes Setting optimiert. Wiederverwendung erfordert Anpassung. | Viele Kanaele, viele Modelle. Derselbe Baustein funktioniert im Chat, Push, Formular-Assistent — modellunabhaengig. |

## Token-Oekonomie: Die Rechnung

Annahme: 30.000 Anfragen/Monat, ~500 Output-Tokens pro Antwort. Nur Input-Token-Kosten verglichen — Output bleibt gleich.

Modell-Beispiel: Claude Opus 4.6 ($5 / 1M Input-Tokens, Stand Maerz 2026)

| | Ansatz A: Cluster | Ansatz B: Bausteine |
|---|---|---|
| Tokens pro Anfrage | 30.000 | 3.000 |
| Tokens pro Monat | 900M | 90M |
| Kosten pro Monat (nur Input) | $4.500 | $450 |
| Differenz | | 90% weniger Input-Kosten |

## Performance: Latenz

Mehr Context = mehr Verarbeitungszeit. Das spuert der Nutzer direkt.

| | Cluster-Dokument | Atomare Bausteine |
|---|---|---|
| Geschaetzte Latenz | 8-20 Sekunden | 2-5 Sekunden |
| Ursache | 30.000 Tokens verarbeiten braucht Zeit. Bei den Modellen, die ueber deutsche Provider verfuegbar sind, ist das spuerbar. | 3.000 Tokens Context. Deutlich weniger Verarbeitungsaufwand. |
| Anmerkung | Time-to-first-Token skaliert mit der Context-Laenge. | + Retrieval-Latenz (~200-500ms), aber Netto trotzdem schneller. |

## Welcher Ansatz passt wann?

Konkrete Beispiele aus dem AOK-Kontext. Was gebaut wird, bestimmt den Ansatz.

| Anwendungsfall | Beschreibung | Ansatz |
|---|---|---|
| Fokus-Assistent: Pubertaet | Ueberschaubares Themenfeld, ein Kanal, ein Modell. | Cluster-Dokument — Thema passt komplett in ein Dokument |
| Pflegeberatung in voller Dimension | 24+ Seiten, dutzende Leistungen, verschiedene Pflegegrade und Zielgruppen. | Atomare Bausteine — Retrieval muss gezielt filtern koennen |
| AOK-Superchat auf der Website | Alle Themen: Pflege, Schwangerschaft, Zahngesundheit, Praevention. | Atomare Bausteine — Kein Modell kann alle Cluster gleichzeitig laden |
| Viele KI-Inseln, ein Wissenspool | Chat, Formular-Assistent, Push-Engine, Beratungshilfe — verschiedene Funktionen, verschiedene Modelle, selbes Wissen. | Atomare Bausteine — Eine Quelle, viele Nutzer, modellunabhaengig |

## Hybride Wege

Beide Ansaetze schliessen sich nicht aus. Sie koennen koexistieren und aufeinander aufbauen.

1. **Cluster-Dokumente als Startpunkt** — Schnell erstellbar. Validiert den Inhalt. Funktioniert im PoC. Gibt der Redaktion ein Format, das sie kennt.

2. **Atomarisierung wo noetig** — Wenn ein Cluster in Produktion geht, auf kleineren Modellen laufen soll oder von mehreren KI-Inseln genutzt wird — dann lohnt sich die Pipeline.

3. **Beide Pipelines parallel betreiben** — Eine Pipeline erstellt Cluster-Dokumente (schnell, gut fuer Validierung). Eine zweite atomarisiert fuer Produktion. Dieselben Quellen, zwei Outputs.

## Kernaussage

Der richtige Ansatz haengt nicht von der Theorie ab. Sondern von den Rahmenbedingungen.
