# Kollaborations-Workflow: Dienstleister + AOK

> Version 0.1 — 2026-03-01
> Status: Entwurf zur internen Abstimmung

---

## Ausgangslage

Die Content-to-Context Pipeline ist technisch validiert. Im Pflege-Cluster wurden 10 Seiten in 73 Wissensbausteine transformiert. Der Prozess ist stabil, die Qualitaet der Bausteine durch Stichproben bestaetigt.

Naechster Schritt: Skalierung auf ca. 1.000 Seiten der AOK Gesundheitswelt. Das geht nicht ohne AOK-Mitarbeit. Die AOK wird aber nicht tief in die Methodik der Kontextualisierung einsteigen. Der Workflow muss so designed sein, dass AOK konkrete, abgegrenzte Aufgaben bekommt, die ohne methodisches Vorwissen funktionieren.

**Kernprinzip:** Wir bereiten alles vor, AOK prueft und ergaenzt. Keine offenen Aufgaben, nur Checklisten und Entscheidungsvorlagen.

---

## 1. Cluster-Strategie

### Empfehlung: Themenbasiert nach bestehender Website-Struktur

Die AOK Gesundheitswelt ist bereits thematisch organisiert. Jedes Thema hat eine Hub-Seite mit Unterseiten. Diese Struktur eignet sich als natuerliche Cluster-Grenze.

**Warum themenbasiert und nicht nach Lebensphasen:**

- Die Website ist thematisch aufgebaut (Pflege, Schwangerschaft, Vorsorge, Ernaehrung, etc.)
- Jedes Thema hat eine Hub-Seite mit klar abgegrenzten Unterseiten
- AOK-Fachredakteure sind thematisch organisiert, nicht nach Lebensphasen
- Lebensphasen-Clustering (z.B. "werdende Eltern") wuerde Inhalte aus verschiedenen Website-Bereichen mischen und die Zustaendigkeiten verwischen
- Die Hub-Seiten liefern eine natuerliche Uebersicht ueber den Cluster-Umfang

### Groessenordnung

| Kennzahl | Schaetzung |
|----------|------------|
| Anzahl Cluster | 15–25 |
| Seiten pro Cluster | 10–80 |
| Batches pro Cluster | 3–15 |
| Bausteine pro Cluster | 40–400 |

**Referenzwert:** Der Pflege-Cluster hat 17 Seiten und wird voraussichtlich ~120–150 Bausteine ergeben (73 nach 10 Seiten, 7 verbleibend).

### AOK-Aufgabe: Cluster-Inventar

AOK liefert pro Cluster eine URL-Liste mit:

- Alle Seiten, die zum Thema gehoeren
- Titel jeder Seite
- Zustaendiger Fachredakteur
- Letzte Aktualisierung (falls bekannt)
- Hinweis auf sensible Inhalte (Rechtsaenderungen, Haftungsthemen)

Template: [`docs/templates/cluster-url-template.md`](templates/cluster-url-template.md)

---

## 2. Phasen-Modell pro Cluster

Jeder Cluster durchlaeuft 4 Phasen. AOK hat in jeder Phase eine klar definierte Aufgabe.

```
Phase A              Phase B              Phase C              Phase D
Cluster-Setup        Batch-Verarbeitung   Cluster-Review       Freigabe
(einmalig)           (wiederholt)         (einmalig)           (einmalig)

AOK: URL-Liste       AOK: Dialog-Test     AOK: Pruefung        AOK: Freigabe
DL: Struktur +       DL: Extraktion +     DL: Review-Paket     DL: Integration
    Pilot-Batch           Konsolidierung        erstellen
    Taxonomie             Test-Assistent
```

### Phase A: Cluster-Setup (einmalig pro Cluster)

| Wer | Aufgabe |
|-----|---------|
| **AOK** | URL-Liste des Clusters liefern (Template ausfuellen) |
| **AOK** | Fachlichen Ansprechpartner fuer diesen Cluster benennen |
| **AOK** | Sensible Inhalte markieren (Rechtsaenderungen, Haftungsthemen) |
| **Dienstleister** | Hub-Seite analysieren, Cluster-Struktur dokumentieren |
| **Dienstleister** | Batches bilden (nach inhaltlicher Naehe, 5–7 Seiten pro Batch) |
| **Dienstleister** | Pilot-Batch (2–3 Seiten) verarbeiten |
| **Dienstleister** | Themenstruktur-Entwurf erstellen |

**Uebergabe an AOK:** Themenstruktur als einfache Liste. Pro Kategorie: Name, 1-Satz-Beschreibung, 2–3 Beispiele. AOK prueft auf Vollstaendigkeit und benennt fehlende Themen.

Template: [`docs/templates/taxonomie-freigabe-template.md`](templates/taxonomie-freigabe-template.md)

**Aufwand AOK Phase A:** 2–4h (URL-Liste zusammenstellen + Themenstruktur pruefen)

### Phase B: Batch-Verarbeitung (wiederholt pro Batch)

| Wer | Aufgabe |
|-----|---------|
| **Dienstleister** | Scraping und Extraktion |
| **Dienstleister** | Duplikat-Erkennung und Konsolidierung |
| **Dienstleister** | Anreicherung (Rechtsgrundlagen, Verknuepfungen, Vorsichtshinweise) |
| **Dienstleister** | Batch-Checkpoint erstellen (Zusammenfassung, Stichproben, offene Fragen) |
| **Dienstleister** | Test-Assistent bereitstellen (Bausteine als Knowledge Base) |
| **AOK** | Dialog-Test: Fragen an den Test-Assistenten stellen, Interpretation pruefen |

**Test-Assistent pro Batch:** Nach Abschluss eines Batches werden die fertigen Wissensbausteine als Knowledge Base fuer einen Chat-Assistenten bereitgestellt. AOK-Fachpersonen koennen im Dialog testen, ob der Assistent die Inhalte korrekt interpretiert und wiedergibt. Das ist kein formales Review (das kommt in Phase C), sondern ein schneller Realitaetscheck: Stimmen Betraege? Werden Einschraenkungen korrekt kommuniziert? Fehlen wichtige Zusammenhaenge?

Der Test-Assistent wird kumulativ: Jeder Batch ergaenzt die bestehende Knowledge Base, sodass der Assistent mit jedem Batch besser wird und auch Querbezuege zwischen Batches getestet werden koennen.

Offene fachliche Fragen werden gesammelt und gebuendelt im Review-Paket vorgelegt.

### Phase C: Cluster-Review (einmalig nach letztem Batch)

| Wer | Aufgabe |
|-----|---------|
| **Dienstleister** | Review-Paket erstellen (siehe Abschnitt 3) |
| **Dienstleister** | Erkenntnisse aus Dialog-Tests zusammenfassen (Fehlinterpretationen, Luecken, auffaellige Antworten) |
| **AOK** | Inhaltspruefung anhand vorbereiteter Checklisten |
| **AOK** | Vorsichtshinweise pruefen, fehlende Eskalationsregeln ergaenzen |
| **AOK** | Betraege und Rechtsgrundlagen auf Aktualitaet pruefen |
| **Dienstleister** | Feedback einarbeiten, finale Bausteine erstellen |

Template: [`docs/templates/review-paket-template.md`](templates/review-paket-template.md)

**Aufwand AOK Phase C:** 8–16h pro Cluster (abhaengig von Cluster-Groesse). Das ist das groesste AOK-Arbeitspaket.

### Phase D: Freigabe und Uebergabe

| Wer | Aufgabe |
|-----|---------|
| **Dienstleister** | Finales Cluster-Paket: alle Bausteine, Themenstruktur, Verknuepfungen |
| **AOK** | Formale Freigabe des Clusters fuer den Assistenten |
| **Dienstleister** | Integration in Assistenten-Wissensbasis |

**Aufwand AOK Phase D:** 0,5–1h (formale Freigabe)

---

## 3. AOK Review-Paket

Das Review-Paket ist das zentrale Uebergabe-Dokument. Es muss so aufbereitet sein, dass AOK ohne methodisches Vorwissen pruefen kann.

### Inhalt

**1. Cluster-Uebersicht (1 Seite)**

- Verarbeitete Seiten mit Links auf die Originale
- Anzahl Wissensbausteine gesamt
- Verteilung auf Themenbereiche

**2. Inhaltspruefung (pro Baustein)**

Jeder Baustein wird in normalem Deutsch dargestellt, kein technisches Format. Pro Baustein:

- Titel und Inhalt
- Quelle (Original-URL)
- 4 Prueffragen:
  - Inhaltlich korrekt?
  - Aktuell (Betraege, Fristen)?
  - Vollstaendig oder fehlt etwas Wichtiges?
  - Gibt es Einschraenkungen, die nicht erwaehnt sind?
- Platz fuer Korrekturen und Ergaenzungen

**3. Vorsichtshinweise (pro Themenbereich)**

- Vorgeschlagener Hinweis
- Frage: Reicht das oder muss strenger formuliert werden?
- Frage: Bei welchen Themen soll der Assistent an persoenliche Beratung verweisen?

**4. Betrags-Tabelle**

Alle Geldbetraege aus dem Cluster auf einen Blick:

| Leistung | Betrag | Rechtsgrundlage | Stand |
|----------|--------|-----------------|-------|
| ... | ... | ... | ... |

AOK markiert: korrekt / veraltet / anders

**5. Dialog-Test-Erkenntnisse**

Zusammenfassung aus den Batch-Tests: Welche Fragen hat der Assistent gut beantwortet, wo gab es Fehlinterpretationen oder Luecken? Falls AOK waehrend der Dialog-Tests Auffaelligkeiten notiert hat, werden diese hier gebuendelt aufgefuehrt.

**6. Fehlende Themen**

Offene Frage an AOK: "Welche wichtigen Themen fehlen in diesem Cluster, die nicht auf der Website stehen?"

---

## 4. Kommunikation gegenueber AOK

### Framing

Nicht "Kontextualisierung" oder "Context Engineering". Stattdessen:

> "Wir bereiten Ihre Website-Inhalte so auf, dass der Assistent sie korrekt und vollstaendig wiedergeben kann. Dafuer extrahieren wir die Fakten, strukturieren sie und reichern sie mit Zusatzinformationen an. Rechtsgrundlagen, Vorsichtshinweise, Zielgruppen. Ihre Aufgabe: Pruefen, ob die Fakten stimmen, und uns sagen, wo wir vorsichtiger formulieren muessen."

### Begriffe

| Intern (Methodik) | Gegenueber AOK |
|-------------------|----------------|
| Context Chunks | Wissensbausteine |
| Taxonomie | Themenstruktur |
| Relationen | Verknuepfungen |
| Haftungskontext | Vorsichtshinweise |
| QS | Inhaltspruefung |
| Volatilitaet | Aenderungshaeufigkeit |
| Validierung | Freigabe |
| Kontext-Anreicherung | Zusatzinformationen ergaenzen |
| Eskalationspfade | Verweis an persoenliche Beratung |

### Grundregeln

- AOK bekommt keine offenen Aufgaben, nur Checklisten mit Ja/Nein und Freitextfeldern
- Jede Uebergabe hat einen geschaetzten Zeitaufwand
- Fachbegriffe der Methodik tauchen in keinem AOK-Dokument auf
- Jedes AOK-Dokument ist selbsterklaerend, ohne Verweis auf andere Dokumente

---

## 5. Aufwandsschaetzung

### Pro Cluster (mittlere Groesse: ~40 Seiten)

| Rolle | Phase A | Phase B | Phase C | Phase D | Gesamt |
|-------|---------|---------|---------|---------|--------|
| **Dienstleister** | 8–12h | 18–36h | 8–12h | 2–4h | 34–62h |
| **AOK** | 2–4h | 1–2h | 8–16h | 0,5–1h | 13–24h |

### Gesamtprojekt (~20 Cluster)

| Rolle | Pro Cluster (Schnitt) | Gesamt | Mit Skalierungseffekt |
|-------|----------------------|--------|-----------------------|
| **Dienstleister** | ~45h | ~900h | ~700h |
| **AOK** | ~17h | ~340h | ~270h |

### Skalierungseffekt

Ab Cluster 3 werden Folgecluster schneller, weil:

- Prompts sind kalibriert und wiederverwendbar
- Boilerplate-Muster (z.B. Familiencoach, Pflegenavigator) sind bekannt
- Querschnitt-Bausteine existieren bereits
- Themenstruktur-Muster uebertragen sich

Realistischer Faktor: -30% ab Cluster 3.

### AOK-Aufwand aufgeschluesselt

| Phase | Aufgabe | Aufwand pro Cluster |
|-------|---------|---------------------|
| A | URL-Liste zusammenstellen | 1–2h |
| A | Themenstruktur pruefen | 1–2h |
| B | Dialog-Test pro Batch (3–5 Testfragen) | 1–2h |
| C | Inhaltspruefung (Checklisten) | 6–12h |
| C | Betrags-Tabelle pruefen | 1–2h |
| C | Fehlende Themen benennen | 0,5–1h |
| D | Formale Freigabe | 0,5–1h |

---

## 6. Pipeline-Abdeckung

Pruefung: Alle 8 Schritte der Content-to-Context-Methodik sind im Workflow abgedeckt.

| Pipeline-Schritt | Methodik-Ref | Workflow-Phase | Verantwortung |
|-----------------|-------------|----------------|---------------|
| 1. Content-Extraktion | Firecrawl Scraping | Phase B | Dienstleister |
| 2. Baustein-Extraktion (Pass 1) | Freie Kategorisierung | Phase B | Dienstleister |
| 3. Taxonomie-Konsolidierung | Kategorien vereinheitlichen | Phase A (Pilot) | Dienstleister + AOK (Review) |
| 4. Re-Kategorisierung (Pass 2) | Bausteine zuordnen | Phase B | Dienstleister |
| 5. Gruppierung + Duplikat-Erkennung | Ueberlappungen finden | Phase B | Dienstleister |
| 6. Konsolidierung | Duplikate zusammenfuehren | Phase B | Dienstleister |
| 7. Kontext-Anreicherung | 5 Dimensionen | Phase B | Dienstleister |
| 8. QS durch AOK | Inhaltspruefung | Phase C | AOK (Checklisten) |

---

## Anhang: Templates

| Template | Zweck | Pfad |
|----------|-------|------|
| Cluster-URL-Template | AOK fuellt URL-Liste pro Cluster | [`templates/cluster-url-template.md`](templates/cluster-url-template.md) |
| Review-Paket-Template | Checklisten fuer AOK Inhaltspruefung | [`templates/review-paket-template.md`](templates/review-paket-template.md) |
| Themenstruktur-Freigabe | AOK prueft Themenstruktur-Entwurf | [`templates/taxonomie-freigabe-template.md`](templates/taxonomie-freigabe-template.md) |

Alle Templates sind mit dem Pflege-Cluster als Beispiel vorbefuellt.
