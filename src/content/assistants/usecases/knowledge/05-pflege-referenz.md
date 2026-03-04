# Referenz-Use-Cases: Cluster Pflege

Diese Use Cases dienen als Referenz fuer Format, Detailtiefe und Dimensionierung. Der Pflege-Cluster ist am weitesten aufgebaut und zeigt, wie Use Cases fuer andere Cluster aussehen sollten.

---

## UC: Pflegegeld-Anspruch klaeren

- **Intention:** I4 Leistungsklaerung (primaer), I6 Angehoerigen-Sorge (sekundaer)
- **Cluster:** Pflege
- **Typische Frage:** "Was zahlt die AOK an Pflegegeld bei Pflegegrad 2?"
- **DGW/MGW:** DGW: Allgemeine Betraegstabelle nach Pflegegrad mit Disclaimer / MGW: Individueller Anspruch basierend auf tatsaechlichem Pflegegrad des Versicherten
- **Journey-Stage:** Entscheidung
- **Integration:** Nur Content
- **Governance:** Mittel — Betraege nennen mit Disclaimer, keine individuelle Zusage
- **Prioritaet:** Quick Win — Content vorhanden, Governance beherrschbar

---

## UC: Pflegedienst in der Naehe finden

- **Intention:** I3 Behandlungssuche (primaer)
- **Cluster:** Pflege
- **Typische Frage:** "Wo finde ich einen Pflegedienst in meiner Naehe?"
- **DGW/MGW:** DGW: Allgemeiner Verweis auf AOK-Pflegenavigator / MGW: Pflegedienste nach PLZ des Versicherten, ggf. mit Bewertungen
- **Journey-Stage:** Handlung
- **Integration:** Content + Live-Daten (Pflegenavigator-Anbindung)
- **Governance:** Einfach — keine Leistungszusage, reine Vermittlung
- **Prioritaet:** Strategischer Hebel — hoher Nutzen, aber Live-Daten-Integration noetig

---

## UC: Pflegegrad erstmalig beantragen

- **Intention:** I4 Leistungsklaerung (primaer), I2 Frische Diagnose (sekundaer)
- **Cluster:** Pflege
- **Typische Frage:** "Wie beantrage ich einen Pflegegrad fuer meine Mutter?"
- **DGW/MGW:** DGW: Schritt-fuer-Schritt-Anleitung mit Checkliste / MGW: Vorausgefuellter Antrag, Statusverfolgung
- **Journey-Stage:** Handlung
- **Integration:** Content + Tool (Antrags-Checkliste/Wizard)
- **Governance:** Mittel — Prozess erklaeren, keine Prognose zum Ergebnis
- **Prioritaet:** Strategischer Hebel — hohe Nachfrage, Tool-Integration lohnt sich

---

## UC: Ueberlastung als pflegender Angehoeriger

- **Intention:** I6 Angehoerigen-Sorge (primaer), I5 Langzeit-Management (sekundaer)
- **Cluster:** Pflege
- **Typische Frage:** "Ich pflege meinen Vater und bin am Ende meiner Kraefte. Was kann ich tun?"
- **DGW/MGW:** DGW: Entlastungsangebote aufzeigen (Verhinderungspflege, Kurzzeitpflege, Pflegekurse, FamilienCoach) / MGW: Bereits genutzte Leistungen zeigen, ungenutzte Ansprueche hervorheben
- **Journey-Stage:** Management
- **Integration:** Nur Content (DGW) / Personalisiert (MGW)
- **Governance:** Hoch — emotionale Situation, ggf. Verweis auf psychosoziale Hilfe noetig
- **Prioritaet:** Quick Win (DGW) / Visionaer (MGW) — Content vorhanden, aber personalisierte Variante braucht Versichertendaten

---

## UC: Kombinationsleistung vs. reines Pflegegeld

- **Intention:** I4 Leistungsklaerung (primaer)
- **Cluster:** Pflege
- **Typische Frage:** "Lohnt es sich, Pflegegeld und Pflegedienst zu kombinieren?"
- **DGW/MGW:** DGW: Allgemeine Erklaerung der Kombinationsleistung mit Rechenbeispiel / MGW: Simulation mit tatsaechlichem Pflegegrad und genutzten Sachleistungen
- **Journey-Stage:** Entscheidung
- **Integration:** Content + Tool (Kombinationsrechner)
- **Governance:** Mittel — Rechenbeispiele mit Disclaimer, keine Empfehlung
- **Prioritaet:** Strategischer Hebel — komplexes Thema, Rechner-Tool wuerde stark helfen

---

## UC: Akuter Pflegefall — erste Orientierung

- **Intention:** I1 Akute Sorge (primaer), I6 Angehoerigen-Sorge (sekundaer)
- **Cluster:** Pflege
- **Typische Frage:** "Mein Vater hatte einen Schlaganfall und kommt naechste Woche aus dem Krankenhaus. Was muss ich jetzt tun?"
- **DGW/MGW:** DGW: Sofort-Checkliste (Pflegeantrag, Kurzzeitpflege, Sozialstation im Krankenhaus) / MGW: Checkliste plus: "Ihr Vater ist bei der AOK versichert, hier ist sein Ansprechpartner"
- **Journey-Stage:** Awareness / Orientierung
- **Integration:** Content + Tool (Sofort-Checkliste)
- **Governance:** Hoch — emotionale Ausnahmesituation, kein Druck erzeugen, Handlungsfaehigkeit staerken
- **Prioritaet:** Quick Win (DGW-Checkliste) / Strategischer Hebel (mit personalisiertem Routing)
