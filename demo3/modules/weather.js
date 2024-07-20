export class WeatherWidget {
  constructor(elementId, dataService) {
      this.element = document.getElementById(elementId);
      this.dataService = dataService;
  }

  async init() {
      try {
          const weatherData = await this.dataService.getWeatherData();
          this.updateWidget(weatherData);
      } catch (error) {
          console.error('Error fetching weather data:', error);
          this.element.textContent = '无法获取天气信息';
      }
  }

  updateWidget(data) {
      this.element.innerHTML = `
          <h2>当前天气</h2>
          <p>温度: ${data.temperature}°C</p>
          <p>天气: ${data.description}</p>
          <p>湿度: ${data.humidity}%</p>
      `;
  }
}