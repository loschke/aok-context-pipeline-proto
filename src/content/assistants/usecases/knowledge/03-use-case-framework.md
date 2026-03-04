# Use-Case-Framework — 6 Achsen

## Achse 1: Intention (7 Kernintentionen)

Die Intention beschreibt das Grundbeduerfnis des Nutzers. Jeder Use Case hat eine primaere Intention und kann eine sekundaere haben.

Siehe `01-intentionen.md` fuer die vollstaendige Taxonomie.

## Achse 2: Theme/Cluster

Themencluster der AOK Gesundheitswelt. Ein Use Case gehoert immer zu einem Cluster. Typische Cluster:

| Cluster | Beispielthemen |
|---------|---------------|
| Pflege | Pflegegeld, Pflegedienst, Pflegegrad, Hilfsmittel, Entlastung |
| Schwangerschaft & Geburt | Vorsorge, Mutterschaftsgeld, Hebamme, Fruehgeburt |
| Zahngesundheit | Zahnersatz, Professionelle Zahnreinigung, Kieferorthopaedie |
| Psychische Gesundheit | Depression, Psychotherapie, Burnout, Stressbewaeltigung |
| Herz-Kreislauf | Bluthochdruck, Herzinfarkt, Reha, Medikation |
| Diabetes | Typ 1, Typ 2, DMP, Hilfsmittel, Ernaehrung |
| Krebs | Diagnose, Therapie, Reha, Nachsorge, psychosoziale Begleitung |
| Kinder & Jugendliche | U-Untersuchungen, Impfungen, ADHS, Entwicklung |
| Ruecken & Gelenke | Bandscheibe, Arthrose, Physiotherapie, OP-Entscheidung |
| Vorsorge & Praevention | Check-ups, Krebsvorsorge, Impfungen, Gesundheitskurse |
| Rehabilitation | Anschlussheilbehandlung, ambulante Reha, Wiedereingliederung |
| Arzneimittel | Zuzahlung, Rabattvertraege, Generika, Medikationsplan |
| Hilfsmittel allgemein | Rollstuhl, Hoergeraet, Prothese, Genehmigung |
| Digitale Gesundheit | ePA, E-Rezept, Gesundheits-Apps, Telemedizin |

Diese Liste ist nicht abschliessend. Wenn ein Nutzer ein Thema nennt, das nicht in dieser Liste steht, generiere trotzdem Use Cases und kennzeichne den Cluster als "angenommen".

## Achse 3: Datenverfuegbarkeit (DGW / MGW)

Die strategische Trennlinie des SAVA-Projekts:

| | DGW (Digitale Gesundheitswelt) | MGW (Meine Gesundheitswelt) |
|---|---|---|
| **Zugang** | Anonym, ohne Login | Authentifiziert, mit AOK-Login |
| **Daten** | Nur allgemeine Inhalte | Versichertendaten (Tarif, Alter, PLZ, Pflegegrad etc.) |
| **Antwortqualitaet** | Allgemein: "Versicherte mit Pflegegrad 2 erhalten..." | Individuell: "Sie haben Pflegegrad 2, Ihnen stehen X € zu" |
| **Beispiel** | "Was kostet Zahnersatz?" → Allgemeine Festzuschuss-Tabelle | "Was kostet mein Zahnersatz?" → Berechnung mit echtem Befund und Bonus |
| **Status** | Realisierbar mit heutigem Content | Setzt Schnittstellen zu AOK-Systemen voraus (Gap) |

### DGW/MGW-Delta beschreiben

Fuer jeden Use Case: Was kann der Assistent heute im DGW-Modus? Was waere zusaetzlich moeglich, wenn Versichertendaten vorlaegen?

Beispiel:
- DGW: "Pflegegeld bei Pflegegrad 2 betraegt 332 € monatlich (Stand 2025)"
- MGW: "Ihr Angehoeriger hat Pflegegrad 2. Ihnen stehen 332 € Pflegegeld zu. Sie haben bisher keine Kombinationsleistung beantragt — das koennte sich lohnen."

## Achse 4: Journey-Stage

Wo im Weg des Nutzers befindet sich der Use Case?

| Stage | Beschreibung | Typische Aktion |
|-------|-------------|----------------|
| **Awareness** | Nutzer merkt, dass etwas ist | Symptome googeln, erste Frage stellen |
| **Orientierung** | Nutzer versteht die Lage | Diagnose einordnen, Moeglichkeiten ueberblicken |
| **Entscheidung** | Nutzer muss waehlen | Behandlung, Anbieter, Leistungsform waehlen |
| **Handlung** | Nutzer fuehrt aus | Antrag stellen, Termin buchen, Leistung beantragen |
| **Management** | Nutzer lebt damit | Alltag organisieren, Leistungen optimieren |
| **Optimierung** | Nutzer will mehr rausholen | Zusatzleistungen, Wechsel, Praevention |

## Achse 5: Integrationslevel

Was braucht der Use Case technisch?

| Level | Beschreibung | Beispiel |
|-------|-------------|---------|
| **Nur Content** | Reine Textantwort aus Wissensbausteinen | "Was ist Pflegegeld?" |
| **Content + Tool** | Text plus Rechner, Checkliste, Wizard | Pflegegradrechner, Antrags-Checkliste |
| **Content + Live-Daten** | Text plus aktuelle externe Daten | Pflegedienst-Suche nach PLZ |
| **Personalisiert** | Antwort nutzt Versichertendaten (MGW) | "Ihr persoenlicher Leistungsanspruch" |
| **Orchestriert** | Mehrere Systeme zusammen, Prozess-Steuerung | Antragsprozess mit Statusverfolgung |

## Achse 6: Governance-Komplexitaet

Wie heikel ist der Use Case aus Compliance-Sicht?

| Level | Beschreibung | Constraints | Beispiel |
|-------|-------------|------------|---------|
| **Einfach** | Allgemeine Info, kein Risiko | Keine tangiert | Vorsorge-Termine, allgemeine Tipps |
| **Mittel** | Leistungsinfos mit Betraegen | C1: Keine Zusagen | Pflegegeld-Betraege mit Disclaimer |
| **Hoch** | Individuelle Situation, medizinnah | C1+C2: Keine Zusagen + Keine Diagnosen | "Brauche ich eine Reha?" |
| **Kritisch** | Notfall, Haftung, psychische Krise | C1-C5: Alle relevant | Suizidgedanken, akuter Notfall, Behandlungsfehler |

## Priorisierungsmatrix

Die Kombination aus Integrationslevel und Governance bestimmt die Prioritaet:

|  | Einfache Governance | Mittlere Governance | Hohe Governance | Kritische Governance |
|---|---|---|---|---|
| **Nur Content** | Quick Win | Quick Win | Strategisch | Strategisch |
| **Content + Tool** | Quick Win | Strategisch | Strategisch | Visionaer |
| **Live-Daten** | Strategisch | Strategisch | Visionaer | Visionaer |
| **Personalisiert** | Strategisch | Visionaer | Visionaer | Visionaer |
| **Orchestriert** | Visionaer | Visionaer | Visionaer | Visionaer |
