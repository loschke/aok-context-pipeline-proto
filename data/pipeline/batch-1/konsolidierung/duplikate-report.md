# Batch 1: Duplikat-Report

> 51 Bausteine aus Batch 1 geprueft gegen:
> - 28 bestehende Pilot-Bausteine (Batch 0)
> - Untereinander innerhalb Batch 1
> Erstellt: 2026-03-01

---

## Duplikat-Gruppe 1: Familiencoach Pflege (Boilerplate)

**Betroffene Bausteine:** PH-08, TN-10, PK-06

**Bestehender Baustein:** ALL-FC (aus Pilot, bereits konsolidiert aus PG-15, PS-11, KL-08)

**Befund:** Identischer Inhalt auf drei weiteren Seiten. Gleicher Text, gleiche URL (pflege.aok.de), gleicher Verweis-Typ. Bestaetigt das Pilot-Muster: Familiencoach ist Boilerplate ueber alle Pflege-Seiten.

**Entscheidung:** Entfernen. ALL-FC wird um diese drei Quellen ergaenzt.

**Quellen-Update fuer ALL-FC:**
- pflegegeld (Pilot)
- pflegesachleistung (Pilot)
- kombinationsleistung (Pilot)
- pflegehilfsmittel-zum-verbrauch (Batch 1) — NEU
- tages-und-nachtpflege (Batch 1) — NEU
- pflegekurs-hilfe-beim-helfen (Batch 1) — NEU

---

## Duplikat-Gruppe 2: Pflegegrad 1 — kein Anspruch, aber Entlastungsbetrag

**Betroffener Baustein:** TN-08

**Bestehender Baustein:** PG/PS-09 (aus Pilot)

**Befund:** TN-08 sagt: "Pflegebedürftige mit Pflegegrad 1 haben keinen Anspruch auf Tages- oder Nachtpflege. Der Besuch kann über den Entlastungsbetrag finanziert werden." PG/PS-09 sagt: "Mit Pflegegrad 1 besteht kein Anspruch auf Pflegegeld oder Pflegesachleistung. Stattdessen stehen 131 Euro monatlich für Betreuungs- und Entlastungsleistungen zur Verfügung."

**Unterschied:** Gleiches Muster (PG1 = kein Anspruch auf Leistung X, aber Entlastungsbetrag), aber unterschiedliche Leistungen (Pflegegeld/Sachleistung vs. Tages-/Nachtpflege).

**Entscheidung:** Nicht zusammenfuehren. Stattdessen PG/PS-09 als Cross-Referenz-Baustein erweitern: "Pflegegrad 1: Kein Anspruch auf Pflegegeld, Pflegesachleistung oder Tages-/Nachtpflege. Der Entlastungsbetrag (131 Euro/Monat) kann fuer Betreuungs- und Entlastungsleistungen eingesetzt werden, einschliesslich Grundpflege durch ambulanten Pflegedienst und Besuch von Tages-/Nachtpflegeeinrichtungen."

TN-08 wird entfernt, PG/PS-09 wird aktualisiert.

---

## Duplikat-Gruppe 3: Pflegenavigator / Einrichtungssuche

**Betroffene Bausteine:** EB-06, TN-09

**Bestehender Baustein:** PS-09 (Pflegedienstsuche ueber AOK-Gesundheitsnavigator)

**Befund:** Alle drei verweisen auf den AOK-Pflegenavigator/Gesundheitsnavigator fuer unterschiedliche Suchzwecke:
- PS-09: Pflegedienstsuche
- EB-06: Anbieter fuer Entlastungsleistungen
- TN-09: Tages-/Nachtpflegeeinrichtungen

**Entscheidung:** Zusammenfuehren zu einem erweiterten Service-Baustein. Der Pflegenavigator ist ein einziges Tool mit verschiedenen Suchkategorien.

**Zusammengefuehrter Inhalt (ersetzt PS-09):**

> AOK-Pflegenavigator (Gesundheitsnavigator): Zentrales Such-Tool fuer Pflegeangebote.
> - Ambulante Pflegedienste finden
> - Zugelassene Anbieter fuer Entlastungsleistungen und Unterstuetzung im Alltag
> - Tages- und Nachtpflegeeinrichtungen
> - Hilfsmittelsuche
> Ergaenzend: Pflegeberater in AOK-Kundencentern und am Servicetelefon (0391 2878 40191).

**Quellen:** pflegesachleistung (Pilot), entlastungsbetrag (Batch 1), tages-und-nachtpflege (Batch 1)

---

## Duplikat-Gruppe 4: Hilfsmittelsuche (AOK-Gesundheitsnavigator)

**Betroffene Bausteine:** Eingebetteter Navigatorblock auf den Seiten Pflegehilfsmittel, Hausnotruf, Technische Pflegehilfsmittel

**Befund:** Alle drei Seiten enthalten einen eingebetteten AOK-Gesundheitsnavigator fuer Hilfsmittelsuche. Kein separater Baustein erstellt (richtig so), da der Inhalt in Duplikat-Gruppe 3 konsolidiert wird.

**Entscheidung:** Kein Handlungsbedarf. Bereits in erweitertem PS-09 erfasst.

---

## Nicht-Duplikate mit inhaltlicher Naehe (bewusst getrennt)

### PiA-Verweise (EB-05 und WU-11)

EB-05 erwaehnt PiA als Anerkennungsstelle fuer Nachbarschaftshelfer. WU-11 erwaehnt PiA als Beratungsstelle fuer Umbaumassnahmen. Gleiche Organisation, aber unterschiedliche Funktionen.

**Entscheidung:** Getrennt lassen. EB-05 bleibt bei entlastung-und-betreuung, WU-11 bei beratung-und-unterstuetzung. Relation `verwandt_mit` zwischen beiden im Anreicherungsschritt.

### Hausnotruf: TP-01 erwaehnt Hausnotrufsysteme als Beispiel, HN-01 beschreibt sie ausfuehrlich

**Entscheidung:** Getrennt lassen. TP-01 ist Uebersichts-Baustein, HN-01 ist Detail-Baustein. Relation `teil_von` im Anreicherungsschritt.

---

## Ergebnis

| Metrik | Wert |
|--------|------|
| Bausteine Batch 1 (roh) | 51 |
| Duplikate entfernt (Familiencoach) | 3 |
| Duplikate zusammengefuehrt (PG1-Entlastung) | 1 (TN-08 → PG/PS-09 erweitert) |
| Duplikate zusammengefuehrt (Pflegenavigator) | 2 (EB-06 + TN-09 → PS-09 erweitert) |
| **Bausteine Batch 1 nach Konsolidierung** | **45** |
| **Pilot-Bausteine aktualisiert** | 2 (PG/PS-09, PS-09) |
| **Gesamtkorpus nach Batch 1** | **73** (28 Pilot + 45 Batch 1) |
