# Qualitaetskriterien fuer Wissensbausteine

## Die 4 Eigenschaften eines guten Bausteins

1. **Eigenstaendig** — Ohne den Quellartikel verstaendlich. Keine Rueckverweise wie "wie oben beschrieben".
2. **Informationsdicht** — Jeder Satz hat Substanz. Kein Marketing, keine Ueberleitungen, keine emotionale Rahmung.
3. **Eindeutig typisiert** — Genau ein Typ (FAKT, EMPFEHLUNG, ANLEITUNG, FAQ, CHECKLISTE, VERGLEICH, GLOSSAR, NAVIGATION) und der Typ stimmt.
4. **Vollstaendig im Kontext** — Metadaten befuellt: Zielgruppe, Gueltigkeit, Verlaesslichkeit, Regelkontext.

## Die 5 Kontext-Dimensionen

### Dimension 1: Bedeutungskontext

Prueffrage: Ist eindeutig, was der Baustein inhaltlich aussagt?

- Titel ist selbsterklaerend
- Alle Fachbegriffe sind definiert oder in Alltagssprache uebersetzt
- Genau einer Kategorie zugeordnet
- Bei mehrfach verwendeten Begriffen: spezifische Bedeutung im Kontext ist klar

### Dimension 2: Strukturkontext

Prueffrage: Sind die Zusammenhaenge zu anderen Bausteinen explizit?

- Voraussetzungen benannt (was muss vorher gelten?)
- Kombinierbarkeiten dokumentiert (was geht zusammen?)
- Alternativen markiert (was gibt es stattdessen?)
- Verwandte Themen verknuepft
- Relationen sind bidirektional (wenn A auf B verweist, verweist B auch auf A)

### Dimension 3: Qualitaetskontext

Prueffrage: Kann ich mich auf diese Information verlassen?

- Stand-Datum vorhanden
- Volatilitaet bewertet (hoch/mittel/niedrig)
- Quelle(n) dokumentiert
- Validierungsstatus gesetzt

Volatilitaets-Stufen:
| Stufe | Bedeutung | Beispiele | Pruefintervall |
|-------|-----------|-----------|----------------|
| Hoch | Aendert sich bei Gesetzesaenderung oder jaehrlich | Betraege, Fristen | Mind. jaehrlich |
| Mittel | Aendert sich gelegentlich | Prozessablaeufe, Formulare | Halbjaehrlich |
| Niedrig | Aendert sich selten | Grunddefinitionen, Systematik | Jaehrlich |

### Dimension 4: Regelkontext

Prueffrage: Weiss das System, was es mit dieser Information tun darf?

- Haftungshinweis vorhanden (wo noetig)
- Klarheit ueber allgemeine vs. einzelfallbezogene Information
- Eskalationspfad definiert (wann an menschliche Beratung verweisen?)
- Rechtsgrundlage angegeben (bei Leistungen und Prozessen)

Regelkontext-Bedarf nach Typ:
| Typ | Bedarf | Grund |
|-----|--------|-------|
| FAKT | Niedrig-Mittel | Allgemeine Fakten manchmal haftungsrelevant bei Betraegen |
| EMPFEHLUNG | Mittel-Hoch | Handlungsempfehlungen koennen individuelle Situation verkennen |
| ANLEITUNG | Mittel-Hoch | Fristen und Ablaeufe koennen variieren |
| FAQ | Mittel | Abhaengig vom Thema |
| CHECKLISTE | Mittel | Vollstaendigkeit relevant |
| VERGLEICH | Hoch | Betraege und Bedingungen koennen individuell abweichen |
| GLOSSAR | Niedrig | Definitionen selten haftungsrelevant |
| NAVIGATION | Niedrig | Verweise unkritisch |

### Dimension 5: Zielgruppenkontext

Prueffrage: Ist klar, fuer wen diese Information relevant ist?

- Zielgruppe(n) getaggt
- Kontext-Tags gesetzt (Pflegegrad, Trimester, Altersgruppe)
- Sprachebene angemessen
- Relevanz-Marker: Fuer welche Situation besonders wichtig?

## 3 Schnellfragen an jeden Baustein

1. **Kann ein Versicherter auf Basis dieses Bausteins handeln?** Wenn nein: Was fehlt?
2. **Enthaelt der Baustein ein Wort, das man streichen koennte, ohne Information zu verlieren?** Wenn ja: Streichen.
3. **Wuerde ich das einem Kollegen so erklaeren, der das Thema nicht kennt?** Wenn nein: Zu vage, zu technisch oder setzt Vorwissen voraus.

## Typische Fehlermuster

### Bei der Extraktion

| Fehler | Symptom | Loesung |
|--------|---------|---------|
| Marketing nicht entfernt | "Wir sind fuer Sie da", "Profitieren Sie von..." | Jeden Satz fragen: Konkrete Information? Nein = streichen |
| Baustein nicht eigenstaendig | "Wie oben beschrieben...", "In diesem Fall..." | Bezuege aufloesen |
| Zu grosse Bausteine | Beantwortet 3+ Fragen | Aufteilen. Eine Frage = ein Baustein |
| Zu kleine Bausteine | Einzelner Fakt ohne Kontext | Zusammenfuehren |
| Falscher Typ | FAKT der eine EMPFEHLUNG ist | Typisierungs-Entscheidungshilfe nutzen |

### Bei den Kontextdimensionen

| Fehler | Symptom | Loesung |
|--------|---------|---------|
| Qualitaetskontext fehlt | Kein Stand-Datum, keine Volatilitaet | Nachruesten |
| Regelkontext vergessen | VERGLEICH ohne Haftungshinweis | Regelkontext-Bedarf pro Typ pruefen |
| Einseitige Zielgruppe | Pflege-Baustein nur fuer Pflegebeduerftige, nicht Angehoerige | Fragen: Wer fragt typischerweise danach? |
| Relationen fehlen | Baustein steht isoliert trotz offensichtlicher Zusammenhaenge | Relationen-Checkliste durchgehen |
| Einseitige Relationen | A verweist auf B, aber B nicht auf A | Bidirektionale Relationen setzen |

## Bausteintyp-Entscheidungshilfe

| Frage an den Text | Typ |
|-------------------|-----|
| Objektive Sachinformation oder Zahl? | FAKT |
| Handlungsorientierte Einordnung mit Richtung? | EMPFEHLUNG |
| Schritt-fuer-Schritt Ablauf? | ANLEITUNG |
| Frage-Antwort-Format? | FAQ |
| Liste zum Abhaken? | CHECKLISTE |
| Zwei oder mehr Optionen gegenuebergestellt? | VERGLEICH |
| Fachbegriff erklaert? | GLOSSAR |
| Verweist auf ein anderes Thema oder Stelle? | NAVIGATION |
