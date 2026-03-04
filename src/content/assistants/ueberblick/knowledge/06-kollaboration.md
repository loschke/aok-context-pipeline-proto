# Kollaborations-Workflow: Dienstleister + AOK

## Kernprinzip

Wir bereiten alles vor, AOK prueft und ergaenzt. Keine offenen Aufgaben, nur Checklisten und Entscheidungsvorlagen.

## Cluster-Strategie

Themenbasiert nach Website-Struktur (nicht Lebensphasen). Die AOK Gesundheitswelt ist bereits thematisch organisiert. Fachredakteure arbeiten thematisch.

| Kennzahl | Schaetzung |
|----------|------------|
| Anzahl Cluster | 15–25 |
| Seiten pro Cluster | 10–80 |
| Batches pro Cluster | 3–15 |
| Bausteine pro Cluster | 40–400 |

Referenzwert: Pflege-Cluster hat 17 Seiten und ergibt ~120–150 Bausteine.

## 4-Phasen-Modell pro Cluster

```
Phase A              Phase B              Phase C              Phase D
Cluster-Setup        Batch-Verarbeitung   Cluster-Review       Freigabe
(einmalig)           (wiederholt)         (einmalig)           (einmalig)

AOK: URL-Liste       AOK: Dialog-Test     AOK: Pruefung        AOK: Freigabe
DL: Struktur +       DL: Extraktion +     DL: Review-Paket     DL: Integration
    Pilot-Batch           Konsolidierung        erstellen
    Themenstruktur        Test-Assistent
```

### Phase A: Cluster-Setup

AOK liefert URL-Liste, benennt Fach-Ansprechpartner, markiert sensible Inhalte. Dienstleister analysiert Hub-Seite, bildet Batches (5–7 Seiten), verarbeitet Pilot-Batch, erstellt Themenstruktur-Entwurf.

**AOK-Aufwand: 2–4h**

### Phase B: Batch-Verarbeitung (wiederholt)

Dienstleister: Scraping, Extraktion, Duplikat-Erkennung, Konsolidierung, Anreicherung, Batch-Checkpoint. Test-Assistent wird kumulativ aufgebaut — jeder Batch ergaenzt die Knowledge Base.

AOK: Dialog-Test mit dem Test-Assistenten. Schneller Realitaetscheck, kein formales Review.

**AOK-Aufwand: 1–2h pro Batch**

### Phase C: Cluster-Review

Dienstleister erstellt Review-Paket (6 Bestandteile: Cluster-Uebersicht, Inhaltspruefung pro Baustein, Vorsichtshinweise, Betrags-Tabelle, Dialog-Test-Erkenntnisse, fehlende Themen).

AOK prueft anhand vorbereiteter Checklisten. Das ist das groesste AOK-Arbeitspaket.

**AOK-Aufwand: 8–16h pro Cluster**

### Phase D: Freigabe

Dienstleister liefert finales Cluster-Paket. AOK gibt formale Freigabe.

**AOK-Aufwand: 0,5–1h**

## Aufwandsschaetzung

### Pro Cluster (mittlere Groesse: ~40 Seiten)

| Rolle | Phase A | Phase B | Phase C | Phase D | Gesamt |
|-------|---------|---------|---------|---------|--------|
| Dienstleister | 8–12h | 18–36h | 8–12h | 2–4h | 34–62h |
| AOK | 2–4h | 1–2h | 8–16h | 0,5–1h | 13–24h |

### Gesamtprojekt (~20 Cluster)

| Rolle | Pro Cluster | Gesamt | Mit Skalierungseffekt (-30% ab Cluster 3) |
|-------|------------|--------|--------------------------------------------|
| Dienstleister | ~45h | ~900h | ~700h |
| AOK | ~17h | ~340h | ~270h |

## Kommunikation gegenueber AOK

AOK bekommt keine Methodik-Begriffe. Uebersetzung:

| Intern | Gegenueber AOK |
|--------|----------------|
| Context Chunks | Wissensbausteine |
| Taxonomie | Themenstruktur |
| Relationen | Verknuepfungen |
| Haftungskontext | Vorsichtshinweise |
| QS | Inhaltspruefung |
| Volatilitaet | Aenderungshaeufigkeit |
| Validierung | Freigabe |
| Eskalationspfade | Verweis an persoenliche Beratung |
