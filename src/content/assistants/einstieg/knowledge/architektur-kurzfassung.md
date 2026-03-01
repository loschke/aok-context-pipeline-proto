# AOK AI-Assistent — Architektur in Kuerze

## Die vier Elemente

Ein AI-Assistent, der verlässlich beraten soll, braucht vier Dinge. Ohne eines davon funktioniert das System nicht.

### 1. Der Kompass

*"Wer ist dieser Assistent — und was darf er nicht?"*

Gibt dem Assistenten eine Haltung: 5 Kernwerte (fachliche Korrektheit, Ehrlichkeit, echte Hilfsbereitschaft, Respekt vor Autonomie, Fuersorge) und 5 harte Grenzen (keine Leistungszusagen, keine Diagnosen, kein Datenmissbrauch, keine medizinische Beeinflussung, Notruf-Verweis bei Gefahr).

Ohne Kompass halluziniert ein LLM nicht nur Fakten — es halluziniert auch Haltung.

### 2. Der Sensor

*"Was braucht dieser Mensch gerade?"*

Erkennt das Beduerfnis hinter der Frage. Dieselbe Frage ("Zahlt die AOK einen Pflegedienst?") kann Pragmatismus sein oder Ueberforderung. 7 Kernintentionen von akuter Sorge bis praeventiver Vorsorge steuern Ton und Tiefe der Antwort.

Ohne Sensor antwortet das System technisch korrekt, aber am Menschen vorbei.

### 3. Das Gedaechtnis

*"Woher weiss der Assistent, was er weiss?"*

Die aufbereitete, strukturierte Wissensbasis. Website-Content wird systematisch in Wissensbausteine transformiert — angereichert mit Zusammenhaengen, Gueltigkeitszeitraeumen, Haftungsgrenzen, Zielgruppen. Jeder Baustein ist eine atomare Wissenseinheit mit 5 Kontextdimensionen (Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe).

Ohne Gedaechtnis weiss das System nicht, was die AOK Sachsen-Anhalt konkret bietet. Es kennt keine aktuellen Betraege, keine Zusammenhaenge zwischen Leistungen.

### 4. Die Stimme

*"Wie kommt die Antwort beim Menschen an?"*

Das Delivery-System: Leitplanken (was darf gesagt werden?), Inhaltsstrategie (wie tief, wie proaktiv?) und Format (kompakt bei Zeitdruck, ausfuehrlich bei Orientierungsbedarf).

Ohne Stimme ist eine fachlich perfekte Antwort im falschen Ton eine schlechte Antwort.

## Wie die Elemente zusammenspielen

**Kompass und Gedaechtnis sind Infrastruktur.** Man baut sie einmal und pflegt sie laufend. Sie bestimmen, was der Assistent *kann*.

**Sensor und Stimme sind Laufzeit.** Sie arbeiten in jeder einzelnen Interaktion. Sie bestimmen, was der Assistent in einer konkreten Situation *tut*.

### Beispiel: "Meine Mutter braucht einen Pflegedienst. Was zahlt die AOK?"

1. **Sensor** erkennt: Primaer Leistungsklaerung, sekundaer Angehoerigen-Sorge. Mischung aus Pragmatismus und Fuersorge.
2. **Kompass** prueft: Allgemeine Leistungsinformation ist erlaubt. Keine Einzelfall-Zusage. Haftungshinweis noetig. Empathie angemessen.
3. **Gedaechtnis** liefert: Baustein "Pflegesachleistung" mit Betraegen und Pflegegrad-Staffelung. Ueber Relationen zusaetzlich: Kombinationsleistung, Verhinderungspflege, Entlastungsbetrag.
4. **Stimme** formt die Antwort: Tonalitaet empathisch-sachlich, Format kompakt, proaktiver Hinweis auf Beratungsangebote.

## 3-Ebenen-Modell (technisch)

| Ebene | Frage | Inhalt |
|-------|-------|--------|
| Ebene 1: Intentionen | Was braucht der Nutzer? | 7 Kernintentionen, Beduerfnis-Erkennung |
| Ebene 2: Kommunikations-Layer | Wie antwortet das System? | Leitplanken, Inhaltsstrategie, Delivery |
| Ebene 3: Context Engineering | Worauf greift das System zu? | Wissensbasis, Tools, Echtzeit-Daten |

Fehlt eine Ebene, funktioniert das System nicht: Ohne Intentionen bekommt ein aengstlicher Mensch Paragraphen. Ohne Kommunikations-Layer bekommt ein gestresster Mensch eine Textwand. Ohne Context Engineering halluziniert der Assistent Leistungsbetraege.
