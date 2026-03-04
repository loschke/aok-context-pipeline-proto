# Das Gesamtbild: Drei Schichten, ein Kompass

## Die zentrale Idee

Menschen, die sich an ihre Krankenkasse wenden, fragen nicht nach Paragraphen. Sie fragen: "Was passiert jetzt mit mir?", "Muss ich das selbst bezahlen?", "Wie geht es weiter?" Hinter jeder Frage steht eine Situation, ein Beduerfnis, oft eine Emotion.

Ein AI-Assistent, der nur Fakten wiedergibt, ist nicht besser als eine FAQ-Seite. Ein Assistent, der versteht, was der Mensch in seiner Situation braucht, und darauf angemessen reagiert — das ist das Ziel.

## Die Architektur

```
┌─────────────────────────────────────────────────────────┐
│   SCHICHT 1: CONTEXT (Gedaechtnis)                      │
│   Was ist wahr? Was steht zur Verfuegung?               │
│   → Wissensbausteine, Tools, Echtzeit-Daten, Profil    │
├─────────────────────────────────────────────────────────┤
│   SCHICHT 2: INTENTION (Sensor)                         │
│   Was braucht der Mensch gerade?                        │
│   → 7 Kernintentionen, Beduerfnis-Erkennung            │
├─────────────────────────────────────────────────────────┤
│   SCHICHT 3: KOMMUNIKATION (Stimme)                     │
│   Wie muss es klingen?                                  │
│   → Leitplanken, Inhaltsstrategie, Delivery            │
└─────────────────────────────────────────────────────────┘
          ║                                     ║
          ║      KOMPASS (Verfassung)           ║
          ║  Durchzieht alle drei Schichten     ║
          ║  Werte, Regeln, Grenzen             ║
```

## Warum Trennung?

| Wenn fehlt... | Dann passiert... | Beispiel |
|---|---|---|
| Context Engineering | System will richtig antworten, hat aber keine verlaessliche Grundlage | Assistent halluziniert Leistungsbetraege |
| Intentionserkennung | System antwortet technisch korrekt, aber am Beduerfnis vorbei | Nutzer hat Angst, bekommt Paragraphen |
| Kommunikations-Layer | System hat den richtigen Inhalt, liefert ihn aber falsch aus | Gestresster Nutzer bekommt Textwand |

Die Schichten brauchen unterschiedliche Kompetenzen: Context braucht Fachredaktion + Entwicklung. Intentionen brauchen UX + Fachberatung. Kommunikation braucht Design-Entscheidungen.

## Zusammenspiel am Beispiel

Anfrage: "Meine Mutter braucht einen Pflegedienst. Was zahlt die AOK?"

**Sensor (Intention)** erkennt:
- Primaer: I4 Leistungsklaerung ("Was zahlt die AOK?")
- Sekundaer: I6 Angehoerigen-Sorge ("Meine Mutter")
- → Hier braucht es Fakten UND Empathie

**Kompass** prueft:
- Allgemeine Leistungsinfo erlaubt
- Keine individuelle Zusage ("Sie haben Anspruch auf...")
- Haftungshinweis noetig

**Gedaechtnis (Context)** liefert:
- Baustein "Pflegesachleistung" (Betraege, Voraussetzungen, Pflegegrad-Staffelung)
- Relationen: Kombinationsleistung, Verhinderungspflege
- Tool-Context: Pflegestuetzpunkt-Finder

**Stimme (Kommunikation)** formt:
- Tonalitaet: Empathisch-sachlich (I6 + I4)
- Tiefe: Mittel (nicht ueberfluten)
- Proaktiv: Verwandte Leistungen + Beratungsangebot
- Format: Kompakt (Nutzer scheint unter Druck)

Ergebnis: Empathische, faktenbasierte Antwort mit konkreten Betraegen, Verweis auf verwandte Leistungen, Pflegestuetzpunkt-Angebot und Haftungshinweis.

## Infrastruktur vs. Laufzeit

| Element | Typ | Wann aktiv |
|---------|-----|-----------|
| Kompass (Verfassung) | Infrastruktur | Einmal definieren, immer wirksam |
| Gedaechtnis (Context) | Infrastruktur | Einmal aufbauen, laufend pflegen |
| Sensor (Intention) | Laufzeit | Jede einzelne Nutzeranfrage |
| Stimme (Kommunikation) | Laufzeit | Jede einzelne Antwort |

Die Differenz zwischen "plausibel" und "verlaesslich" — das ist der gesamte Aufwand der SAVA Engine. ChatGPT kann plausibel klingende Antworten geben. Aber plausibel ist nicht korrekt. Korrekt ist nicht hilfreich. Und hilfreich ist nicht sicher.
