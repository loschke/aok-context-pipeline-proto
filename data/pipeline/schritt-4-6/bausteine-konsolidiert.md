# Bausteine konsolidiert: Re-Kategorisierung + Duplikat-Aufloesung

> Basis: 34 Bausteine aus Schritt 2 (3 Pilot-Seiten)
> Taxonomie: 13 Kategorien aus Schritt 3
> Erstellt: 2026-03-01

---

## Re-Kategorisierung

Alle 34 Bausteine gegen die finale Taxonomie zugeordnet. IDs: PG = Pflegegeld, PS = Pflegesachleistung, KL = Kombinationsleistung.

### Kategorie: `geldleistungen` (7 Bausteine)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| PG-01 | LEISTUNG | Definition Pflegegeld (Geldleistung ab PG2, haeuslich, private Pflegeperson) | pflegegeld |
| PG-02 | FAKT | Pflegegeld-Betraege nach Pflegegrad (347-990 Euro) | pflegegeld |
| PG-04 | FAKT | Verwendungszweck Pflegegeld (freie Verfuegung) | pflegegeld |
| PG-05 | FAKT | Direktueberweisung an Pflegeperson moeglich | pflegegeld |
| PG-10 | FAKT | Weiterzahlung bei Krankenhaus/Reha (8 Wochen) | pflegegeld |
| PG-11 | FAKT | Halbes Pflegegeld bei Kurzzeitpflege (8 Wochen) | pflegegeld |
| PG-12 | FAKT | Halbes Pflegegeld bei Verhinderungspflege (8 Wochen) | pflegegeld |
| PG-13 | FAKT | Pflegegeld ist steuerfrei | pflegegeld |

### Kategorie: `sachleistungen` (5 Bausteine)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| PS-01 | LEISTUNG | Definition Pflegesachleistung (ambulanter Dienst, ab PG2) | pflegesachleistung |
| PS-02 | FAKT | Sachleistungs-Hoechstbetraege nach Pflegegrad (796-2.299 Euro) | pflegesachleistung |
| PS-03 | FAKT | Leistungsumfang (Koerperpflege, Betreuung, Haushalt) | pflegesachleistung |
| PS-05 | FAKT | Abrechnung durch Pflegedienst direkt mit Pflegekasse | pflegesachleistung |
| PS-08 | FAKT | Umwidmung: bis 40% fuer Alltagsunterstuetzung | pflegesachleistung |

### Kategorie: `kombinationsleistungen` (4 Bausteine)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| KL-01 | LEISTUNG | Definition Kombinationsleistung (Sach+Geld kombiniert, ab PG2) | kombinationsleistung |
| KL-02 | FAKT | Berechnungsprinzip (prozentuale Verrechnung) | kombinationsleistung |
| KL-03 | FAKT | Beispielrechnung PG3 (70% Sach → 30% Geld = 179,70 Euro) | kombinationsleistung |
| KL-06 | FAKT | Auszahlungszeitpunkt abhaengig von Rechnungseinreichung | kombinationsleistung |

### Kategorie: `anspruch-und-voraussetzungen` (3 Bausteine)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| PG-06 | FAKT | Definition "haeusliche Umgebung" (eigener Haushalt, Pflegeperson, WG) | pflegegeld |
| KL-04 | FAKT | Anspruch Kombinationsleistung (ab PG2, Angehoerige + Pflegedienst) | kombinationsleistung |
| PG/PS-09 | FAKT | Pflegegrad 1: Kein Pflegegeld/Sachleistung, aber 131 Euro Entlastungsbetrag | **zusammengefuehrt** |

### Kategorie: `antragstellung` (4 Bausteine)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| PG-03 | PROZESS | Beantragung Pflegegeld (online, monatliche Vorauszahlung) | pflegegeld |
| PS-04 | PROZESS | Beantragung Pflegesachleistung (online/Kundencenter) | pflegesachleistung |
| KL-05 | PROZESS | Beantragung Kombinationsleistung (Sachleistung ankreuzen) | kombinationsleistung |
| PG-14 | PROZESS | Erstantrag bei zunehmendem Hilfebedarf (MD-Begutachtung) | pflegegeld |

### Kategorie: `pflichten-und-auflagen` (2 Bausteine)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| PG-07 | FAKT | Beratungspflicht (halbjaehrlich, zu Hause, Pflegekasse zahlt) | pflegegeld |
| PG-08 | WARNUNG | Kuerzung bei Nichtinanspruchnahme der Beratung | pflegegeld |

### Kategorie: `sachleistungen` (Tipps)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| PS/KL-10 | TIPP | Pflegedienst-Umfang jederzeit aenderbar (Pflegevertrag anpassen) | **zusammengefuehrt** |

### Kategorie: `service-und-zugang` (1 Baustein)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| PS-09 | TIPP | Pflegedienstsuche ueber AOK-Gesundheitsnavigator und Landesportal | pflegesachleistung |

### Kategorie: `beratung-und-unterstuetzung` (1 Baustein)

| ID | Typ | Inhalt (Kurzfassung) | Quelle |
|----|-----|----------------------|--------|
| ALL-FC | VERWEIS | Familiencoach Pflege (kostenfrei, auch Nicht-Versicherte) | **zusammengefuehrt** |

---

## Zusammenfassung nach Konsolidierung

| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Bausteine gesamt | 34 | 28 |
| Duplikate entfernt | — | 3 Gruppen → 6 Bausteine weniger |
| Kategorien genutzt | 9 frei vergebene | 8 von 13 Taxonomie-Kategorien |

Nicht genutzte Kategorien (erwartbar, da Pilot nur 3 Seiten): `entlastung-und-betreuung`, `hilfsmittel`, `wohnformen`, `stationaere-versorgung`, `palliativversorgung`
