export class DataService {
  constructor() {
      this.baseUrl = 'https://api.example.com'; // 替换为实际的API地址
      this.isOnline = false;
  }

  async init() {
      try {
          const response = await fetch(`${this.baseUrl}/status`);
          if (response.ok) {
              this.isOnline = true;
          }
      } catch (error) {
          console.error('Failed to connect to the server:', error);
          this.isOnline = false;
      }
  }

  async getData(endpoint, mockData) {
      if (this.isOnline) {
          try {
              const response = await fetch(`${this.baseUrl}/${endpoint}`);
              if (response.ok) {
                  return await response.json();
              }
          } catch (error) {
              console.error(`Failed to fetch data from ${endpoint}:`, error);
          }
      }
      return mockData();
  }

  async getWeatherData() {
      return this.getData('weather', () => ({
          temperature: 22,
          description: '晴朗',
          humidity: 60
      }));
  }

  async getTemperatureData() {
      return this.getData('temperature', () => ({
          'living-room': 22,
          'bedroom': 20
      }));
  }

  async getLightingData() {
      return this.getData('lighting', () => ({
          'living-room': false,
          'bedroom': false
      }));
  }

  async getRealtimeEnergyUsage() {
      return this.getData('energy', () => ({
          currentUsage: Math.random() * 5 + 1
      }));
  }

  async getTodoList() {
      return this.getData('todos', () => [
          { id: 1, text: '购物', completed: false },
          { id: 2, text: '健身', completed: true }
      ]);
  }
  async getTodoList() {
    return this.getData('todos', () => [
        { id: 1, text: '购物', completed: false },
        { id: 2, text: '健身', completed: true },
        { id: 3, text: '学习编程', completed: false }
    ]);
}
}