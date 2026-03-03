# Skalierungsstrategie — Kurzfassung

## Referenzwerte aus dem Pilot

Der Pflege-Pilot (3 Seiten) hat gezeigt:

| Metrik | Pilot (3 Seiten) | Hochrechnung (17 Seiten) |
|--------|-------------------|--------------------------|
| Roh-Bausteine | 34 (~11/Seite) | ~190 |
| Nach Konsolidierung | 28 | ~140-150 |
| Duplikat-Gruppen | 3 | ~15-25 |
| Themenstruktur-Kategorien | 8 von 13 genutzt | Alle 13 belegt |

## Batch-Verarbeitung

Statt Seite-fuer-Seite wird in Hub-Gruppen-Batches verarbeitet. Jede Hub-Gruppe ist ein inhaltlich zusammenhaengender Block (5-7 Seiten), der gemeinsam gescraped, extrahiert und konsolidiert wird.

Pro Batch gibt es einen Checkpoint mit:
- Batch-Zusammenfassung (Anzahl Bausteine, Kategorien, Duplikate)
- Zusammenfuehrungs-Vorschlaege
- Stichproben-Review
- Test-Assistent mit kumulativer Knowledge Base

## Groessenordnung fuer die Gesamtskalierung

| Kennzahl | Schaetzung |
|----------|------------|
| Cluster gesamt | 15-25 |
| Seiten pro Cluster | 10-80 |
| Batches pro Cluster | 3-15 |
| Wissensbausteine pro Cluster | 40-400 |

## Aufwand pro Cluster (mittlere Groesse ~40 Seiten)

| Rolle | Phase A | Phase B | Phase C | Phase D | Gesamt |
|-------|---------|---------|---------|---------|--------|
| Dienstleister | 8-12h | 18-36h | 8-12h | 2-4h | 34-62h |
| AOK | 2-4h | 1-2h | 8-16h | 0,5-1h | 13-24h |

## Skalierungseffekt

Ab Cluster 3 werden Folgecluster ca. 30% schneller, weil:
- Prompts sind kalibriert und wiederverwendbar
- Boilerplate-Muster sind bekannt
- Querschnitt-Bausteine existieren bereits
- Themenstruktur-Muster uebertragen sich

## Gesamtprojekt (~20 Cluster)

| Rolle | Pro Cluster (Schnitt) | Gesamt | Mit Skalierungseffekt |
|-------|----------------------|--------|-----------------------|
| Dienstleister | ~45h | ~900h | ~700h |
| AOK | ~17h | ~340h | ~270h |
