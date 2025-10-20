# SAR Paternoster

Elektronisches Warenausgabesystem für das SAR-Paternoster-Lager.

## Überblick

Das SAR-Paternoster-System besteht aus zwei getrennten Ansichten:
- **Entnahmesicht (ausgabe.html)**: Scanner-basierte Warenausgabe für den Lagerarbeiter
- **Administrationssicht (admin.html)**: Verwaltung von Artikeln, Codes und Protokollen

## Features

- 🔍 Barcode-Scanner-Integration
- 📊 Artikelverwaltung mit Freigabe-Status
- 🖨️ Automatische Barcode-Generierung
- 📝 Ausführliches Entnahmeprotokoll
- 🔐 Passwortgeschützte Administration
- 💻 Testmodus für Scanner-Simulation
- 📷 Artikelbild-Unterstützung

## Technische Architektur

### Projektstruktur
```
src/
├── components/       # HTML-Komponenten
├── js/              # JavaScript-Module
│   ├── modules/     # Logik-Module
│   ├── utils/       # Hilfsfunktionen
│   └── ui/          # Benutzeroberfläche
├── css/             # Stylesheets
├── data/            # JSON-Datendateien
└── libs/            # Externe Bibliotheken

public/              # Gebautes Projekt
```

### Module

- **storage.js**: Datenverwaltung (localStorage basiert)
- **scan.js**: Scanner-Verarbeitung
- **admin.js**: Administrationslogik
- **glitch.js**: UI-Effekte und Simulation

## Installation

1. Repository klonen
2. Dependencies installieren: `npm install`
3. Entwicklungsserver starten: `npm run dev`
4. Browser öffnen: `http://localhost:3000`

## Verwendung

### Entnahmesicht
1. `ausgabe.html` öffnen
2. Barcode scannen oder manuell eingeben
3. Artikelinformationen werden angezeigt
4. Automatische Protokollierung

### Administration
1. `admin.html` öffnen
2. Passwort eingeben (Konfiguration in config.json)
3. Artikel verwalten, Codes generieren, Logs anzeigen

## Konfiguration

Alle Einstellungen in `data/config.json`:
- Admin-Passwort
- System-Parameter
- UI-Einstellungen

## Browser-Kompatibilität

- Modernste Browser empfohlen
- Tested on Chrome, Firefox, Edge
- Scanner-Integration benötigt USB-Berechtigung

## Lizenz

ISC License
