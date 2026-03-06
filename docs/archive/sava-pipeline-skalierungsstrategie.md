# Skalierungsstrategie SAVA Pipeline — Pflege-Cluster komplett

> Erstellt: 2026-03-01
> Basis: Pilot-Ergebnisse (3 Seiten, 34 Roh-Bausteine → 28 konsolidiert → 8 Zielformat-Dateien)

---

## Erkenntnisse aus dem Pilot

| Metrik | Pilot (3 Seiten) | Hochrechnung (17 Seiten) |
|--------|-------------------|--------------------------|
| Roh-Bausteine | 34 (~11/Seite) | ~190 |
| Nach Konsolidierung | 28 | ~140-150 (hoehere Duplikat-Rate bei mehr Ueberschneidung) |
| Duplikat-Gruppen | 3 | ~15-25 (Familiencoach, Pflegegrad-1, Beratungspflicht etc.) |
| Taxonomie-Kategorien | 8 von 13 genutzt | Alle 13 belegt |
| Output-Dateien | 8 | ~30-40 |

**Beobachtete Muster:**
- "Gut zu wissen"-Bloecke erzeugen viele redaktionelle Links aber wenig inhaltliche Substanz
- Familiencoach, Pflegegrad-1-Alternative, Pflegedienst-Suche sind Boilerplate-Duplikate ueber viele Seiten
- Die Hub-Gruppen bilden natuerliche Verarbeitungs-Batches

---

## Strategie: Batch-Verarbeitung nach Hub-Gruppen

### Prinzip

Statt Seite-fuer-Seite wird in **Hub-Gruppen-Batches** verarbeitet. Jede Hub-Gruppe ist ein inhaltlich zusammenhaengender Block, der gemeinsam gescraped, extrahiert und konsolidiert wird.

### Batches fuer den Pflege-Cluster

| Batch | Hub-Gruppe | Seiten | Status |
|-------|------------|--------|--------|
| 0 (Pilot) | Pflege zu Hause (Teil 1) | 3 (Pflegegeld, Sachleistung, Kombi) | Fertig |
| 1 | Pflege zu Hause (Rest) | 7 (Entlastung, Hilfsmittel, Tages/Nacht, Hausnotruf, Techn. Hilfsmittel, Wohnumfeld, Pflegekurs) | Offen |
| 2 | Pflege im Heim + Uebergreifend | 4 (Vollstationaer, Verhinderung, Kurzzeit, Pflegegrade) | Offen |
| 3 | Ambulant + Palliativ | 3 (Wohngruppe, Palliativ, Video-Palliativ) | Offen |

### Aenderungen gegenueber dem Pilot

**Scraping:** Batch-Scrape aller URLs der Gruppe in einem Call.

**Extraktion:** Alle Seiten des Batches auf einmal extrahieren. Bestehende Taxonomie (13 Kategorien) direkt anwenden. Keine Taxonomie-Konsolidierung noetig.

**Konsolidierung:** Duplikat-Check gegen den bestehenden Baustein-Korpus, nicht nur innerhalb des Batches. Bekannte Boilerplate-Duplikate werden automatisch erkannt.

**Anreicherung:** Relationen gegen den wachsenden Gesamtkorpus aufbauen.

### Checkpoint-Modell

Statt Checkpoint pro Pipeline-Schritt: **Ein Checkpoint pro Batch**, nach Abschluss aller Schritte.

Der Checkpoint umfasst:
1. Batch-Zusammenfassung: Wie viele Bausteine, welche Kategorien, Duplikate
2. Neue Taxonomie-Kategorien (falls noetig)
3. Zusammenfuehrungs-Vorschlaege fuer Duplikate
4. Stichproben-Review: 2-3 fertige Bausteine im Zielformat
5. Test-Assistent: Bausteine als Knowledge Base bereitstellen (kumulativ)

### Test-Assistent pro Batch

Nach jedem Batch werden die fertigen Bausteine als Knowledge Base in einen Chat-Assistenten geladen. Der Assistent wird unter `src/content/assistants/{cluster}/` angelegt:

```
src/content/assistants/{cluster}/
├── config.json           <- Metadaten (Name, Emoji, Beschreibung, Suggestions)
├── system.md             <- Systemprompt (basiert auf Verfassung, cluster-spezifisch)
└── knowledge/
    ├── 01-baustein.md    <- Pilot-Batch
    ├── 02-baustein.md
    ├── ...
    ├── 09-baustein.md    <- Batch 1 (kumulativ ergaenzt)
    └── ...               <- Batch N (kumulativ ergaenzt)
```

**Kumulativ:** Jeder Batch ergaenzt die Knowledge Base. Nach Batch 1 hat der Assistent die Pilot-Bausteine + Batch-1-Bausteine. Nach Batch 2 alle drei. So werden auch Querbezuege zwischen Batches getestet.

**Zweck:** AOK-Fachpersonen testen im Dialog, ob der Assistent Betraege korrekt nennt, Einschraenkungen kommuniziert und Zusammenhaenge zwischen Leistungen herstellt. Kein formales Review, sondern Realitaetscheck.

**Aufwand:** Assistenten-Setup ist rein dateisystembasiert (keine Code-Aenderung). Knowledge-Dateien werden 1:1 kopiert. Nummerierte Prefixe steuern die Reihenfolge.

Menschliche Pruefung nur bei: neuen Kategorien, unklaren Zusammenfuehrungen, auffaelligen Mustern.

---

## Skalierung auf weitere Cluster (80+ Seiten)

### Pro Cluster

1. Hub-Seite scrapen → Cluster-Struktur + URL-Liste
2. Taxonomie: Cluster-eigene Taxonomie erstellen (Pilot-Ansatz: erste 2-3 Seiten, dann stabilisieren)
3. Batches nach Hub-Gruppen durchlaufen
4. Cross-Cluster-Relationen als finaler Pass

### Cluster-uebergreifend

- Gemeinsame Querschnitt-Kategorien (`antragstellung`, `service-und-zugang`, `beratung-und-unterstuetzung`) werden wiederverwendet
- Cluster-spezifische Kategorien bleiben lokal
- Service-Bausteine werden einmal erfasst und per Relation referenziert

### Aufwand pro Cluster

| Phase | Aufwand |
|-------|---------|
| Hub-Scrape + Struktur | 1 Session |
| Pilot-Batch + Taxonomie | 1 Session |
| Folge-Batches (je 5-7 Seiten) | 1 Session pro Batch |
| Cross-Batch Dedup + QS | 1 Session |

Pflege-Cluster (17 Seiten): ~4-5 Sessions total (inkl. Pilot)
Grosser Cluster (80 Seiten): ~12-15 Sessions

---

## QS-Entscheidung

Pilot-QS (Schritt 8) wird uebersprungen. QS erfolgt einmalig nach Abschluss des gesamten Pflege-Clusters.

---

## Dateistruktur fuer Batches

```
data/pipeline/
├── schritt-1/          (Pilot: Hub + 3 Seiten)
├── schritt-2/          (Pilot: Bausteine)
├── schritt-3/          (Taxonomie — gilt fuer alle Batches)
├── schritt-4-6/        (Pilot: Konsolidierung)
├── schritt-7/          (Pilot: Zielformat-Dateien)
├── batch-1/
│   ├── scraping/       (7 Roh-Markdown + Links)
│   ├── bausteine/      (Extrahierte Bausteine)
│   ├── konsolidierung/ (Duplikat-Report, konsolidierte Liste)
│   └── output/         (Zielformat-Dateien)
├── batch-2/
│   └── ...
└── batch-3/
    └── ...
```
