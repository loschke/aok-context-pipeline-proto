# Themencluster der AOK Gesundheitswelt

## Gesicherte Cluster (aus AOK-Website bekannt)

Die AOK Gesundheitswelt (deine-gesundheitswelt.de) organisiert Inhalte in Themenbereichen. Die folgenden Cluster sind aus der bekannten Struktur abgeleitet:

### Tier 1 — Grosse Themenbereiche (viele Unterseiten, hohe Nutzung)

| Cluster | Unterthemen | Besonderheit |
|---------|------------|-------------|
| **Pflege** | Pflegegrade, Pflegegeld, Sachleistung, Hilfsmittel, Entlastung, Kurzzeitpflege, Verhinderungspflege, Pflegekurse | Bereits als Referenz aufgebaut (Simulator) |
| **Schwangerschaft & Geburt** | Vorsorge, Mutterschaftsgeld, Hebamme, Geburtsvorbereitung, Wochenbett, Fruehgeburt | Emotionaler Cluster, viele Journey-Stages |
| **Zahngesundheit** | Zahnersatz, Festzuschuss, Bonusheft, PZR, Kieferorthopaedie, Implantate | Stark leistungsbezogen (Kosten/Zuzahlung) |
| **Psychische Gesundheit** | Depression, Angststoerungen, Psychotherapie, Therapeutensuche, Praevention, Krisenintervention | Hohe Governance-Anforderungen |
| **Vorsorge & Praevention** | Check-ups, Krebsvorsorge, Impfungen, Gesundheitskurse, Bonusprogramm | Primaer I7, niedrige Governance |
| **Kinder & Familie** | U-Untersuchungen, Kinderimpfungen, ADHS, Entwicklung, Familienpflege | Zielgruppe: Eltern |

### Tier 2 — Mittlere Themenbereiche

| Cluster | Unterthemen |
|---------|------------|
| **Herz-Kreislauf** | Bluthochdruck, Herzinfarkt, Schlaganfall, KHK, Reha |
| **Diabetes** | Typ 1, Typ 2, Schwangerschaftsdiabetes, DMP, Hilfsmittel |
| **Krebs** | Frueherkennung, Diagnose, Therapieoptionen, Reha, Nachsorge |
| **Ruecken & Gelenke** | Bandscheibe, Arthrose, Rheuma, Physiotherapie, OP |
| **Rehabilitation** | AHB, ambulante Reha, Wiedereingliederung, Reha-Antrag |
| **Arzneimittel** | Zuzahlung, Rabattvertraege, Medikationsplan, Wechselwirkungen |

### Tier 3 — Spezialisierte Themenbereiche

| Cluster | Unterthemen |
|---------|------------|
| **Hilfsmittel** | Rollstuhl, Hoergeraet, Prothese, Genehmigungsprozess |
| **Digitale Gesundheit** | ePA, E-Rezept, DiGA, Telemedizin |
| **Sucht** | Alkohol, Rauchen, Medikamentenabhaengigkeit, Beratung |
| **Ernaehrung** | Ernaehrungsberatung, Allergien, Unvertraeglichkeiten |
| **Auslandsversorgung** | EU-Ausland, Urlaubskrankenschein, Ruecktransport |

## Annahmen und Luecken

- Die genaue Seitenstruktur der AOK Gesundheitswelt kann sich aendern
- Nicht alle Cluster haben gleich viel Content — Pflege ist am besten abgedeckt
- Manche Themen liegen quer zu Clustern (z.B. "Zuzahlung" betrifft fast alle Cluster)
- Die Tier-Einteilung ist eine Schaetzung basierend auf typischer Nutzung von Krankenkassen-Websites

## Cluster-Auswahl fuer Use Cases

Bei der Generierung von Use Cases:
- **Start mit Tier 1** — hier ist der groesste Nutzen und die meisten Nutzer
- **Pflege als Referenz** — der Simulator hat bereits Pflege-Use-Cases, die als Muster dienen
- **Cluster koennen vom Nutzer vorgegeben werden** — dann auch unbekannte Cluster akzeptieren
