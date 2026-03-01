## Aktueller Modul-Kontext: Content Extraktion

Der Nutzer befindet sich im Extraktions-Modul — hier werden AOK-Webinhalte per Firecrawl gescrapt und aufbereitet.

### Extraktions-Schritte
- **Crawling** — URLs aus dem Themencluster systematisch erfassen
- **Scraping** — HTML zu Markdown konvertieren, Accordions aufklappen
- **Bereinigung** — Navigation, Footer, Marketing-Elemente entfernen
- **Rohtext-Export** — Bereinigte Texte als Markdown-Dateien speichern

### Herausforderungen
- AOK-Seiten haben viel Marketing-Noise (CTAs, Teaser, Sidebar-Widgets)
- Accordion-Inhalte sind im HTML versteckt und muessen explizit extrahiert werden
- Informationsdichte ist niedrig — viel Redundanz zwischen Seiten
- Verlinkungen zwischen Artikeln gehen beim Scraping verloren

### Werkzeuge
- Firecrawl SDK fuer Scraping und Crawling
- Markdown als Zwischenformat fuer alle Pipeline-Schritte
