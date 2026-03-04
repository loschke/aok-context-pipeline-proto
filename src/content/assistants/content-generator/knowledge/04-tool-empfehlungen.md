# Tool- und Context-Empfehlungen fuer den Pflege-Cluster

## Verfuegbare AOK-Tools

Bei der Content-Generierung aktiv auf passende Tools hinweisen, die in Website-Artikel eingebettet oder verlinkt werden sollten:

| Tool | Funktion | Einbetten bei |
|------|----------|--------------|
| **AOK-Pflegenavigator** | Suche nach Pflegediensten, Pflegeheimen, Tagespflege, Hilfsmitteln | Pflegedienstsuche, Sachleistung, Tagespflege, Hilfsmittel |
| **Pflegegradrechner** | Einschaetzung des voraussichtlichen Pflegegrads | Erstantrag, Pflegegeld, Sachleistung |
| **Meine Gesundheitswelt (MGW)** | Online-Formulare fuer Antraege | Erstantrag, Pflegegeld, Sachleistung, Hilfsmittel, Wohnumfeld |
| **FamilienCoach Pflege** | Online-Angebot fuer pflegende Angehoerige | Angehoerigen-Themen, Entlastung, Demenz |
| **AOK-Servicetelefon** | Persoenliche Beratung (0391 2878 40191) | Komplexe Themen, individuelle Fragen |
| **PiA e.V. Beratung** | Wohnraumanpassung (0391-990 650 46) | Wohnumfeldverbesserung |

## Verwandte Contexts (Verlinkungsstrategie)

Bei jedem Content-Stueck: Nutze die `relationen`-Felder der Bausteine fuer Verlinkungsempfehlungen.

### Pflege-Leistungslandschaft

```
                    Erstantrag
                        │
              ┌─────────┼─────────┐
              ▼         ▼         ▼
          Pflegegeld  Sachleistung  Kombinationsleistung
              │         │               │
              │    ┌────┘          ┌────┘
              ▼    ▼               ▼
         Beratungspflicht    Pflegedienstsuche
              │
    ┌─────────┼─────────────┐
    ▼         ▼             ▼
 Entlastung  Tages/Nacht  Hilfsmittel
    │                        │
    ▼                   ┌────┼────┐
 Nachbarschafts-   Verbrauch  Technisch  Wohnumfeld
 hilfe                          │
                            Hausnotruf
```

### Empfehlung pro Thema

| Wenn Content ueber... | Dann verlinke auf... | Und empfehle Tool... |
|---|---|---|
| Pflegegeld | Sachleistung, Kombinationsleistung, Beratungspflicht | Pflegegradrechner, MGW-Antrag |
| Pflegesachleistung | Pflegegeld, Kombinationsleistung, Pflegedienstsuche | Pflegenavigator, MGW-Antrag |
| Kombinationsleistung | Pflegegeld, Sachleistung, Pflegedienstsuche | Pflegenavigator |
| Entlastungsbetrag | Tagespflege, Nachbarschaftshilfe, PG1-Alternative | Pflegenavigator |
| Hilfsmittel | Technische Hilfsmittel, Wohnumfeld, Pflegenavigator | Pflegenavigator (Hilfsmittelsuche) |
| Erstantrag | Pflegegeld, Sachleistung, Kombinationsleistung | Pflegegradrechner, MGW-Antrag |
| Angehoerigen-Themen | Entlastung, Verhinderungspflege, Pflegekurs | FamilienCoach Pflege |
