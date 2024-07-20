import { WeatherWidget } from './modules/weather.js';
import { TemperatureControl } from './modules/temperature.js';
import { LightingControl } from './modules/lighting.js';
import { EnergyUsage } from './modules/energy.js';
import { TodoList } from './modules/todo.js';
import { NotificationSystem } from './modules/notification.js';
import { ThemeManager } from './modules/theme.js';
import { AutomationRules } from './modules/automation.js';
import { DataService } from './services/dataService.js';
import { DraggableManager } from './modules/draggableManager.js';

class SmartHomeApp {
    constructor() {
        this.dataService = new DataService();
        this.modules = {
            weather: new WeatherWidget('weather-widget', this.dataService),
            temperature: new TemperatureControl('temperature-control', this.dataService),
            lighting: new LightingControl('lighting-control', this.dataService),
            energy: new EnergyUsage('energy-chart', this.dataService),
            todo: new TodoList('todo-form', 'todo-input', 'todos', this.dataService),
            notification: new NotificationSystem('notification'),
            theme: new ThemeManager('theme-toggle'),
            automation: new AutomationRules(this.dataService),
            draggable: new DraggableManager('dashboard')
        };
    }

    async init() {
        try {
            await this.dataService.init();
        } catch (error) {
            console.error('Failed to initialize data service:', error);
            this.modules.notification.show('无法连接到服务器，使用离线模式');
        }

        for (const [name, module] of Object.entries(this.modules)) {
            try {
                await module.init();
                console.log(`Module ${name} initialized successfully`);
            } catch (error) {
                console.error(`Failed to initialize module ${name}:`, error);
            }
        }

        this.setupEventListeners();
        this.startRealtimeUpdates();
    }

    setupEventListeners() {
        document.addEventListener('temperatureChange', this.handleTemperatureChange.bind(this));
        document.addEventListener('lightingChange', this.handleLightingChange.bind(this));
    }

    handleTemperatureChange(event) {
        const { room, temperature } = event.detail;
        this.modules.notification.show(`${room}的温度已设置为${temperature}°C`);
        this.modules.automation.checkRules('temperature', { room, temperature });
    }

    handleLightingChange(event) {
        const { room, state } = event.detail;
        this.modules.notification.show(`${room}的灯光已${state ? '开启' : '关闭'}`);
        this.modules.automation.checkRules('lighting', { room, state });
    }

    startRealtimeUpdates() {
        setInterval(async () => {
            try {
                const energyData = await this.dataService.getRealtimeEnergyUsage();
                this.modules.energy.updateData(energyData);
            } catch (error) {
                console.error('Failed to get realtime energy usage:', error);
            }
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new SmartHomeApp();
    app.init();
});