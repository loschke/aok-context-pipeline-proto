# DGW / MGW — Die zwei Welten

## Ueberblick

Das SAVA-Projekt unterscheidet zwei Nutzungskontexte, die fundamental beeinflussen, was der Assistent leisten kann:

| | DGW | MGW |
|---|---|---|
| **Voller Name** | Digitale Gesundheitswelt | Meine Gesundheitswelt |
| **Zugang** | Oeffentlich, ohne Login | Authentifiziert, AOK-Login |
| **Zielgruppe** | Alle Besucher (auch Nicht-Versicherte) | AOK-Versicherte |
| **Datenbasis** | Redaktioneller Content | Content + Versichertendaten |
| **Antwortmodus** | Allgemein, regelbasiert | Individuell, datengestuetzt |

## Was sich mit Versichertendaten aendert

### Verfuegbare Daten im MGW-Kontext (Annahme)

Welche Daten konkret aus AOK-Systemen verfuegbar waeren, ist noch zu klaeren. Typischerweise denkbar:

| Datentyp | Beispiel | Use-Case-Mehrwert |
|----------|---------|-------------------|
| Tarif / Versicherungsstatus | Familienversichert, Wahltarif | Passende Leistungen filtern |
| Alter / Geschlecht | 67 Jahre, weiblich | Altersgerechte Vorsorge-Empfehlungen |
| PLZ / Region | 01067 Dresden | Lokale Anbieter, regionale Angebote |
| Pflegegrad (falls vorhanden) | Pflegegrad 2 seit 03/2025 | Individuelle Leistungsberechnung |
| Genutzte Leistungen | Pflegegeld bezogen, kein Entlastungsbetrag | Ungenutzte Ansprueche aufzeigen |
| DMP-Teilnahme | DMP Diabetes Typ 2 | Programmspezifische Infos |
| Bonusprogramm | 3 von 5 Massnahmen erreicht | Motivation, naechster Schritt |

### Qualitaetssprung DGW → MGW

| Dimension | DGW | MGW |
|-----------|-----|-----|
| **Relevanz** | Alle Infos zum Thema | Nur was fuer dich gilt |
| **Praezision** | "Versicherte mit PG2 erhalten 332 €" | "Sie erhalten 332 €" |
| **Proaktivitaet** | Nur auf Frage antworten | Auf ungenutzte Ansprueche hinweisen |
| **Prozess** | Allgemeine Anleitung | Vorausgefuellte Formulare, Status |
| **Vertrauen** | Gute allgemeine Info | "Meine AOK kennt mich" |

## Strategische Implikationen

### Fuer die Use-Case-Generierung

1. **Jeder Use Case hat eine DGW- und eine MGW-Variante** — die DGW-Variante ist das Minimum, die MGW-Variante das Ziel
2. **DGW-Use-Cases sind sofort realisierbar** — sie brauchen nur Content und ggf. Tools
3. **MGW-Use-Cases sind der strategische Hebel** — sie differenzieren den AOK-Assistenten von Google
4. **Das Delta beschreibt den Wert** — je groesser der Unterschied DGW→MGW, desto wichtiger die Schnittstelle

### Fuer die Priorisierung

- **Phase 1 (Proof of Value):** DGW-Use-Cases mit Quick-Win-Prioritaet
- **Phase 2 (Differenzierung):** Strategische DGW-Use-Cases mit Tool-Integration
- **Phase 3 (Personalisierung):** MGW-Use-Cases, die Versichertendaten nutzen

### Offene Fragen (Gaps)

Diese Punkte muessen mit der AOK geklaert werden:

- Welche Versichertendaten sind technisch verfuegbar?
- Welche Schnittstellen existieren bereits (APIs, Datenbanken)?
- Welche Daten duerfen im Kontext eines AI-Assistenten genutzt werden (DSGVO, AOK-intern)?
- Wie ist der Authentifizierungsflow (SSO, AOK-App, Web-Login)?
- Gibt es ein Identity-Management, das Versichertendaten mit dem Chat verknuepft?

Bei der Generierung von MGW-Use-Cases: Diese Gaps explizit benennen und als "setzt Klaerung voraus" markieren.
