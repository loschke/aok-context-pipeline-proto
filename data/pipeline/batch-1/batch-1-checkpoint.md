# Batch 1 Checkpoint: Pflege zu Hause (Rest)

> Abgeschlossen: 2026-03-01
> 7 Seiten verarbeitet, 7 Zielformat-Dateien erzeugt

---

## Batch-Zusammenfassung

| Metrik | Wert |
|--------|------|
| Seiten gescraped | 7 |
| Roh-Bausteine extrahiert | 51 |
| Duplikate entfernt (Familiencoach) | 3 |
| Duplikate zusammengefuehrt (PG1, Pflegenavigator) | 3 |
| Bausteine nach Konsolidierung | 45 |
| Pilot-Bausteine aktualisiert | 3 (PG/PS-09, PS-09 → Pflegenavigator, ALL-FC) |
| Zielformat-Dateien (Batch 1) | 7 |
| **Gesamtkorpus nach Batch 1** | **73 Bausteine, 15 Dateien** |

---

## Kategorien-Belegung (kumulativ)

| Kategorie | Pilot | Batch 1 | Gesamt |
|-----------|-------|---------|--------|
| geldleistungen | 8 | - | 8 |
| sachleistungen | 6 | - | 6 |
| kombinationsleistungen | 4 | - | 4 |
| **entlastung-und-betreuung** | 0 | **5** | **5** |
| anspruch-und-voraussetzungen | 3 | - | 3 |
| antragstellung | 4 | - | 4 |
| pflichten-und-auflagen | 2 | - | 2 |
| **hilfsmittel** | 0 | **31** | **31** |
| **stationaere-versorgung** | 0 | **7** | **7** |
| beratung-und-unterstuetzung | 1 | 7 | 8 |
| service-und-zugang | 1 | - | 1 |
| wohnformen | 0 | 0 | 0 |
| palliativversorgung | 0 | 0 | 0 |

**11 von 13 Kategorien belegt.** Fehlend: wohnformen (Batch 3), palliativversorgung (Batch 3).

---

## Duplikat-Muster (bestaetigt)

1. **Familiencoach Pflege** erscheint auf 6 von 10 bisher verarbeiteten Seiten. Boilerplate-Status bestaetigt. Ein Baustein (ALL-FC) mit 6 Quellen.

2. **Pflegegrad-1-Entlastungsbetrag** erscheint in leicht variierter Form auf Pflegegeld, Pflegesachleistung und Tages-/Nachtpflege. Ein konsolidierter Baustein (PG/PS-09, erweitert).

3. **Pflegenavigator** erscheint auf 4 Seiten fuer unterschiedliche Suchzwecke. Ein konsolidierter Service-Baustein.

---

## Neue Taxonomie-Kategorien

Keine neuen Kategorien noetig. Die bestehende 13-Kategorien-Taxonomie deckt alle Batch-1-Inhalte ab.

---

## Stichproben-Review

### Stichprobe 1: Entlastungsbetrag (entlastung-und-betreuung)

Neue Kategorie, erstmals belegt. Pruefpunkte:
- Betrag 131 Euro: korrekt (Original: "bis 131 Euro im Monat")
- Alle Pflegegrade: korrekt (Original: "Pflegebedürftigen aller Pflegegrade")
- Uebertragbarkeit 30.06.: korrekt (Original: "bis zum 30.06. des Folgejahres")
- Nachbarschaftshilfe/PiA: korrekt (Original erwaehnt PiA als Anerkennungsstelle)
- Rechtsgrundlage § 45b SGB XI: korrekt

### Stichprobe 2: Wohnumfeldverbessernde Massnahmen (hilfsmittel)

Komplexeste Seite mit 11 Roh-Bausteinen. Pruefpunkte:
- Zuschuss 4.180 Euro: korrekt (Original: "bis zu 4.180 Euro")
- Wohngruppe 16.720 Euro: korrekt (Original: "bis zu 16.720 Euro")
- Antrag VOR Baubeginn: korrekt (Original: "bevor Beginn der Umbaumaßnahme")
- Beihilfe-Ausschluss: korrekt (Original erwaehnt Beihilfe/Heilfuersorge)
- PiA-Beratung: korrekt (Adresse und Telefon stimmen)

### Stichprobe 3: Tages- und Nachtpflege (stationaere-versorgung)

Neue Kategorie. Pruefpunkte:
- Hoechstbetraege: PG2 721, PG3 1.357, PG4 1.685, PG5 2.085: korrekt
- Befoerderung inklusive: korrekt (Original: "umfasst auch die notwendige Beförderung")
- Pflegegeld wird weitergezahlt: korrekt (Original: "weiterhin wie gewohnt")
- PG1 kein Anspruch: korrekt (in PG/PS-09 konsolidiert)

---

## Dateien (Batch 1)

```
data/pipeline/batch-1/
├── scraping/
│   ├── entlastungsbetrag-raw.md
│   ├── pflegehilfsmittel-raw.md
│   ├── tages-und-nachtpflege-raw.md
│   ├── hausnotrufsystem-raw.md
│   ├── technische-pflegehilfsmittel-raw.md
│   ├── wohnumfeldverbessernde-massnahmen-raw.md
│   └── pflegekurs-raw.md
├── bausteine/
│   └── batch-1-bausteine.md          (51 Roh-Bausteine)
├── konsolidierung/
│   └── duplikate-report.md            (6 Duplikate in 4 Gruppen)
├── output/
│   ├── entlastungsbetrag.md           (Zielformat)
│   ├── pflegehilfsmittel-zum-verbrauch.md
│   ├── tages-und-nachtpflege.md
│   ├── hausnotrufsystem.md
│   ├── technische-pflegehilfsmittel.md
│   ├── wohnumfeldverbessernde-massnahmen.md
│   └── pflegekurs-hilfe-beim-helfen.md
└── batch-1-checkpoint.md              (dieses Dokument)
```

Aktualisierte Pilot-Dateien:
- `schritt-7/pflegegrad-1-alternative.md` (um Tages-/Nachtpflege erweitert)
- `schritt-7/pflegedienstsuche.md` (zu Pflegenavigator erweitert)
- `schritt-7/familiencoach-pflege.md` (3 neue Quellen)

---

## Naechster Schritt

**Batch 2: Pflege im Heim + Uebergreifend** — 4 Seiten (Vollstationaer, Verhinderung, Kurzzeit, Pflegegrade)

Erwartung:
- Kategorie `stationaere-versorgung` wird weiter gefuellt
- Verhinderungspflege und Kurzzeitpflege haben Relationen zu Pflegegeld (Weiterzahlung)
- Pflegegrade-Seite liefert Grundlagen fuer `anspruch-und-voraussetzungen`
