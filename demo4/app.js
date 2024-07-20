import { ThemeManager } from './modules/ThemeManager.js';
import { ChartsManager } from './modules/ChartsManager.js';
import { DataManager } from './modules/DataManager.js';

class Dashboard {
    constructor() {
        this.themeManager = new ThemeManager('theme-toggle');
        this.dataManager = new DataManager();
        this.chartsManager = new ChartsManager(this.dataManager);
    }

    init() {
        this.themeManager.init();
        this.chartsManager.initCharts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('data-filter').addEventListener('change', (e) => {
            this.chartsManager.updateCharts(e.target.value);
        });

        document.getElementById('refresh-data').addEventListener('click', async () => {
            this.dataManager.refreshData();
            await this.chartsManager.updateCharts();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    dashboard.init();
});