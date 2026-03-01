# Taxonomie: Pflege-Cluster

> Konsolidiert aus 34 Bausteinen (3 Pilot-Seiten) + Hub-Struktur
> Erstellt: 2026-03-01

---

## Konsolidierungsprozess

### Freie Kategorien aus Schritt 2

| Freie Kategorie | Haeufigkeit | Aktion |
|-----------------|-------------|--------|
| Geldleistungen | 5x | → `geldleistungen` |
| Sachleistungen | 5x | → `sachleistungen` |
| Kombinierte Leistungen | 3x | → `kombinationsleistungen` |
| Kombinierbarkeit | 1x | Synonym → `kombinationsleistungen` |
| Leistungsbetraege | 3x | → `leistungsbetraege` |
| Antragstellung | 4x | → `antragstellung` |
| Leistungsvoraussetzungen | 3x | → `anspruch-und-voraussetzungen` |
| Beratungspflicht | 2x | → `pflichten-und-auflagen` |
| Unterstuetzungsangebote | 3x | → `beratung-und-unterstuetzung` |

### Synonyme aufgeloest

- "Kombinierbarkeit" = "Kombinierte Leistungen" → `kombinationsleistungen`
- "Leistungsvoraussetzungen" → `anspruch-und-voraussetzungen` (breiter gefasst, deckt auch Pflegegrade ab)
- "Unterstuetzungsangebote" → `beratung-und-unterstuetzung` (einheitlicher Name fuer Beratung, Kurse, Tools)

---

## Finale Taxonomie

14 Kategorien, gruppiert in 4 Bereiche. Ausgelegt auf den gesamten Pflege-Cluster (17 Seiten), nicht nur die 3 Pilot-Seiten.

### Bereich: Leistungsarten

| # | Kategorie-Slug | Bezeichnung | Beschreibung |
|---|----------------|-------------|-------------|
| 1 | `geldleistungen` | Geldleistungen | Pflegegeld, direkte Zahlungen an Pflegebeduerftige/Pflegepersonen |
| 2 | `sachleistungen` | Sachleistungen | Ambulante Pflege durch professionelle Pflegedienste |
| 3 | `kombinationsleistungen` | Kombinationsleistungen | Kombination von Geld- und Sachleistung, prozentuale Verrechnung |
| 4 | `entlastung-und-betreuung` | Entlastung und Betreuung | Entlastungsbetrag, Betreuungsleistungen, Alltagsunterstuetzung |
| 5 | `leistungsbetraege` | Leistungsbetraege | Konkrete Betraege, Hoechstsaetze, Berechnungsbeispiele |

### Bereich: Verfahren und Regeln

| # | Kategorie-Slug | Bezeichnung | Beschreibung |
|---|----------------|-------------|-------------|
| 6 | `anspruch-und-voraussetzungen` | Anspruch und Voraussetzungen | Pflegegrade, Berechtigung, Bedingungen fuer Leistungsbezug |
| 7 | `antragstellung` | Antragstellung | Antrags- und Genehmigungsverfahren, Formulare, Fristen |
| 8 | `pflichten-und-auflagen` | Pflichten und Auflagen | Beratungspflicht, Nachweispflichten, Konsequenzen bei Verstoessen |

### Bereich: Versorgungsformen

| # | Kategorie-Slug | Bezeichnung | Beschreibung |
|---|----------------|-------------|-------------|
| 9 | `hilfsmittel` | Hilfsmittel | Technische Pflegehilfsmittel, Verbrauchshilfsmittel, Wohnumfeldverbesserung |
| 10 | `wohnformen` | Wohnformen | Ambulant betreute Wohngruppen, betreutes Wohnen |
| 11 | `stationaere-versorgung` | Stationaere Versorgung | Vollstationaere Pflege, Kurzzeitpflege, Verhinderungspflege, Tages-/Nachtpflege |
| 12 | `palliativversorgung` | Palliativversorgung | Palliativpflege, Hospiz, spezialisierte Beratung |

### Bereich: Beratung und Services

| # | Kategorie-Slug | Bezeichnung | Beschreibung |
|---|----------------|-------------|-------------|
| 13 | `beratung-und-unterstuetzung` | Beratung und Unterstuetzung | Pflegeberatung, Pflegekurse, Familiencoach, externe Tools |
| 14 | `service-und-zugang` | Service und Zugang | Pflegenavigator, Pflegedienstsuche, Online-Antraege, Pflegekonto |

---

## Abgrenzung zu Hub-Gruppen

Die Hub-Seite gruppiert nach **Pflege-Setting** (wo wird gepflegt). Die Taxonomie gruppiert nach **Inhalt** (was ist die Information). Beide Dimensionen sind orthogonal:

| Hub-Gruppe | Mapping auf Taxonomie-Kategorien |
|------------|----------------------------------|
| Pflege zu Hause | `geldleistungen`, `sachleistungen`, `kombinationsleistungen`, `entlastung-und-betreuung`, `hilfsmittel` |
| Ambulant betreute Wohngruppe | `wohnformen` |
| Pflege im Heim | `stationaere-versorgung` |
| Palliativpflege | `palliativversorgung` |

Das Hub-Setting wird spaeter als Kontext-Tag (`setting: haeuslich | ambulant | stationaer | palliativ`) am Baustein erfasst, nicht als Kategorie.

---

## Hinweise fuer Re-Kategorisierung (Schritt 4-6)

- `leistungsbetraege` ist querschnittlich — ein Baustein kann sowohl einer Leistungsart als auch `leistungsbetraege` zugeordnet werden. Entscheidung: **Primaerkategorie ist die Leistungsart**, Betraege werden als Eigenschaft des Bausteins behandelt, nicht als eigene Kategorie.
- Daraus folgt: `leistungsbetraege` wird in der Re-Kategorisierung aufgeloest. Betrags-Bausteine werden der jeweiligen Leistungsart zugeordnet. **Effektive Kategorien: 13.**
