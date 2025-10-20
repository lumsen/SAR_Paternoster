// Storage module using localStorage for persistence
class StorageManager {
    constructor() {
        this.initialArticles = [
            { "id": "P001", "name": "Schrauben M5x20", "group": "Hardware", "location": "Paternoster-Fach A7", "approved": true, "stock": 50, "image": "", "code": "P001" },
            { "id": "P002", "name": "Kabelbinder 100mm", "group": "Hardware", "location": "Paternoster-Fach B12", "approved": true, "stock": 200, "image": "", "code": "P002" },
            { "id": "P003", "name": "Relais 12V", "group": "Elektronik", "location": "Paternoster-Fach C5", "approved": true, "stock": 10, "image": "", "code": "P003" }
        ];
        this.initialConfig = { "password": "paternoster", "adminPassword": "admin123" };
        this.initialLogs = [];
    }

    loadJSON(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    saveJSON(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getArticles() {
        const articles = this.loadJSON('articles');
        if (!articles) {
            this.saveJSON('articles', this.initialArticles);
            return this.initialArticles;
        }
        return articles;
    }

    saveArticles(articles) {
        this.saveJSON('articles', articles);
    }

    getLogs() {
        const logs = this.loadJSON('logs');
        if (!logs) {
            this.saveJSON('logs', this.initialLogs);
            return this.initialLogs;
        }
        return logs;
    }

    saveLogs(logs) {
        this.saveJSON('logs', logs);
    }

    getConfig() {
        const config = this.loadJSON('config');
        if (!config) {
            this.saveJSON('config', this.initialConfig);
            return this.initialConfig;
        }
        return config;
    }

    saveConfig(config) {
        this.saveJSON('config', config);
    }
}

// Initialize module export
window.StorageManager = StorageManager;
const storage = new StorageManager();

// Initialize data on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize data if not exists
    storage.getArticles();
    storage.getLogs();
    storage.getConfig();
});
