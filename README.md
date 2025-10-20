# SAR Paternoster

Ein fortschrittliches, KI-gestütztes Lagerverwaltungssystem mit futuristischem Dark Mode UI, inspiriert von Technologie aus dem Jahr 2025.

## 🚀 Features

- **Dark Mode Only**: Vollständig dunkles Design mit Neon-Akzenten
- **Dispensation Interface**: Scannen und Entnahme von Artikeln mit Glitch-Effekten
- **Administration Core**: Zentrales Management mit neuronalem Zugriff
- **Glassmorphism Effects**: Moderne UI-Elemente mit Durchsichtigkeits-Effekten
- **2025 Aesthetics**: Orbitron Schriftarten und Cyberpunk inspiriertes Design

## 📁 Projektstruktur

```
nexus-warehouse-2025/
├── src/              # Quellcode
│   ├── index.html    # Startseite
│   ├── css/
│   │   └── style.css # Futuristisches Dark Mode CSS
│   ├── js/           # JavaScript Module
│   ├── pages/        # Unterseiten
│   └── data/         # JSON Daten
├── public/           # Build-Directory
└── .github/workflows/# GitHub Actions
    └── deploy.yml    # Auto-Deploy Workflow
```

## 🔧 Setup & Development

1. **Repository klonen:**
   ```bash
   git clone https://github.com/your-username/nexus-warehouse-2025.git
   cd nexus-warehouse-2025
   ```

2. **Dependencies installieren:**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten:**
   ```bash
   npm start
   # oder direkt in Browser öffnen: src/index.html
   ```

4. **Build erstellen:**
   ```bash
   npm run build
   ```

## 🚀 Deployment

### Automatisches Deployment (Empfohlen)

Das Repository ist so konfiguriert, dass es automatisch auf GitHub Pages deployed wird:

1. **GitHub Pages aktivieren:**
   - Gehe zu Repository → Settings → Pages
   - Source: "GitHub Actions"
   - Branch: `main` oder `master`

2. **Push to Main Branch:**
   ```bash
   git add .
   git commit -m "Add new 2025 UI design"
   git push origin main
   ```

3. **Automatischer Deploy:**
   - GitHub Actions führt den Workflow aus
   - Website ist verfügbar unter: `https://your-username.github.io/nexus-warehouse-2025`

### Manuelles Deployment

```bash
# Files in public/ aktualisieren
cp -r src/* public/

# Deploy
npx gh-pages -d public
```

## 🎨 Design System

- **Primary Color:** Neon Cyan (#00ffff)
- **Secondary:** Electric Purple (#8e2de2)
- **Accent:** Sci-fi Orange (#ff6b35)
- **Success:** Bright Green (#00ff00)
- **Error:** Neon Red (#ff0040)
- **Warning:** Neon Yellow (#ffff00)
- **Backgrounds:** Deep Dark Gradient (#0a0a0a to #001122)
- **Typography:** Orbitron (Google Fonts)

## 🔮 Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **UI Framework:** Custom CSS mit CSS Grid & Flexbox
- **Effects:** CSS Animations, Backdrop-Filter, Box-Shadow Glows
- **Fonts:** Orbitron (Google Fonts)
- **CI/CD:** GitHub Actions
- **Deployment:** GitHub Pages

## 🌟 2025 Features

- **Quantum Scanner Interface:** Futuristische Scanner-Visualisierung
- **Neural Access Control:** Moderner Login-Screen mit Aniamtionen
- **AI-Powered Displays:** Dynamische Status-Indikatoren
- **Glassmorphism Panels:** Transparente UI-Elemente mit Blur-Effekten
- **Holographic Effects:** Glow und Shadow für Cyperbunk-Asthetik

## 📄 Pages

- **`/`** - Nexus Warehouse Startseite
- **`/pages/ausgabe.html`** - Dispensation Interface für Entnahmen
- **`/pages/admin.html`** - Administration Core für Management

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Commit die Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📝 License

Dieses Projekt ist lizenziert unter der MIT License - siehe die [LICENSE](LICENSE) Datei für Details.

---
