# Pflege-Cluster: URL-Struktur

> Extrahiert aus der Hub-Seite: https://www.deine-gesundheitswelt.de/krankheit-behandlung-und-pflege/pflege-wir-sind-an-ihrer-seite
> Crawl-Datum: 2026-03-01

## Basis-URL

`https://www.deine-gesundheitswelt.de/krankheit-behandlung-und-pflege/`

---

## Leistungsseiten nach Gruppen

### Pflege zu Hause (10 Seiten)

| # | Titel | Pfad |
|---|-------|------|
| 1 | Pflegegeldleistung | `/pflegegeld` |
| 2 | Pflegesachleistung | `/pflegesachleistungen` |
| 3 | Kombinationsleistung | `/kombinationsleistung` |
| 4 | Betreuungs- und Entlastungsleistungen | `/entlastungsbetrag` |
| 5 | Pflegehilfsmittel zum Verbrauch | `/pflegehilfsmittel-zum-verbrauch` |
| 6 | Tages- und Nachtpflege | `/tages-und-nachtpflege` |
| 7 | Hausnotrufsystem | `/hausnotrufsystem` |
| 8 | Technische Pflegehilfsmittel | `/technische-pflegehilfsmittel` |
| 9 | Wohnumfeldverbessernde Massnahmen | `/wohnumfeldverbessernde-massnahmen` |
| 10 | Pflegekurs "Hilfe beim Helfen" | `/pflegekurs-hilfe-beim-helfen` |

### Ambulant betreute Wohngruppe (1 Seite)

| # | Titel | Pfad |
|---|-------|------|
| 11 | Ambulant betreute Wohngruppe | `/ambulant-betreute-wohngruppe` |

### Pflege in einer Pflegeeinrichtung (3 Seiten)

| # | Titel | Pfad |
|---|-------|------|
| 12 | Vollstationaere Pflege | `/vollstationaere-pflege` |
| 13 | Verhinderungspflege | `/verhinderungspflege` |
| 14 | Kurzzeitpflege | `/kurzzeitpflege` |

### Palliativpflege (2 Seiten)

| # | Titel | Pfad |
|---|-------|------|
| 15 | Palliativpflege | `/palliativpflege` |
| 16 | Videoberatung zur Palliativversorgung | `/videoberatung-zur-palliativversorgung` |

### Uebergreifend (auf Hub-Seite erwaehnt, nicht gruppiert)

| # | Titel | Pfad |
|---|-------|------|
| 17 | Pflegegrade | `/pflegegrade` |

---

## Service-Links (keine Content-Seiten)

| Titel | URL | Typ |
|-------|-----|-----|
| Videoberatung buchen | `https://videocall.deine-gesundheitswelt.de/aoksan/videoberatung` | Extern |
| Pflegenavigator | `/service/pflegesuche` | Intern |
| Formularcenter | `https://gk.deine-gesundheitswelt.de/mein-formularcenter` | Extern |
| Meine Gesundheitswelt | `/service/onlineservice-meine-gesundheitswelt` | Intern |

---

## Zusammenfassung

- **17 Leistungsseiten** im Pflege-Cluster (inkl. Pflegegrade)
- **4 Gruppen** laut Hub-Struktur + 1 uebergreifend
- Groesste Gruppe: Pflege zu Hause (10 Seiten)
- **Pilot-Empfehlung:** Pflegegeld (#1), Pflegesachleistung (#2), Kombinationsleistung (#3) — inhaltlich eng verknuepft, ideal fuer Duplikat-Erkennung und Relationen
