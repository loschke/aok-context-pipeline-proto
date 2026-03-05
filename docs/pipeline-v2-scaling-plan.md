# Pipeline-v2 Scaling Plan

## Aktueller Stand (Demo-Setup)

Fuer die Demo wurden die Limits grosszuegig hochgesetzt:

| Parameter | Vorher | Jetzt |
|-----------|--------|-------|
| maxOutputTokens | 8.192 (enrich: 16.384) | 48.000 (alle Steps) |
| maxDuration | 120s | 300s (Vercel Pro Max) |
| sourceFiles-Limit | 20 | 50 |

Das funktioniert fuer Cluster mit 20-40 Quellen, skaliert aber nicht unbegrenzt: Bei sehr grossen Clustern wird der Input-Kontext zu lang und die Response-Zeit zu hoch.

## Naechster Schritt: Batch-Processing

Fuer den Produktivbetrieb sollte die Pipeline Batch-Processing unterstuetzen:

### Ansatz

1. **Chunking im Frontend**: Quelldateien in Batches von 10-15 aufteilen
2. **Sequenzielle API-Calls**: Jeder Batch wird einzeln an den Extract-Endpoint geschickt
3. **Merge-Step**: Ergebnisse aus allen Batches werden zusammengefuehrt
4. **Idempotenz**: Jeder Batch schreibt in eine eigene Datei (`cluster-bausteine-batch-1.md` etc.)

### Vorteile

- Kein Kontext-Limit-Problem mehr
- Einzelne Batches koennen bei Fehler wiederholt werden
- Fortschrittsanzeige pro Batch moeglich
- maxOutputTokens kann wieder reduziert werden

### Betroffene Steps

Nur **Step 2 (Extract)** und **Step 6 (Enrich)** brauchen Batching, da sie pro Quelldatei arbeiten. Die Zwischen-Steps (Taxonomize, Recategorize, Group, Consolidate) arbeiten auf aggregierten Ergebnissen und bleiben Single-Call.

### Implementierung

1. `usePipelineV2` Hook um Batch-Logik erweitern
2. Extract-Route: Batch-Index als Parameter, Output-Datei mit Batch-Suffix
3. Neuer Merge-Endpoint oder Client-seitiges Zusammenfuehren
4. Progress-Tracking: `completedBatches / totalBatches` statt nur Spinner
