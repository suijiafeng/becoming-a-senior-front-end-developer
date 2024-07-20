export class TemperatureControl {
  constructor(elementId, dataService) {
      this.element = document.getElementById(elementId);
      this.dataService = dataService;
      this.rooms = ['living-room', 'bedroom'];
  }

  init() {
      this.rooms.forEach(room => {
          const slider = document.getElementById(`${room}-temp`);
          if (slider) {
              const display = slider.nextElementSibling;
              if (display) {
                  slider.addEventListener('input', (e) => {
                      const temperature = e.target.value;
                      display.textContent = `${temperature}°C`;
                      this.updateTemperature(room, temperature);
                  });
              } else {
                  console.error(`Display element for ${room} temperature not found`);
              }
          } else {
              console.error(`Slider for ${room} temperature not found`);
          }
      });

      this.updateTemperatures();
  }

  async updateTemperatures() {
      try {
          const temperatureData = await this.dataService.getTemperatureData();
          this.rooms.forEach(room => {
              const slider = document.getElementById(`${room}-temp`);
              if (slider) {
                  const display = slider.nextElementSibling;
                  if (display) {
                      slider.value = temperatureData[room];
                      display.textContent = `${temperatureData[room]}°C`;
                  }
              }
          });
      } catch (error) {
          console.error('Error fetching temperature data:', error);
      }
  }

  updateTemperature(room, temperature) {
      const event = new CustomEvent('temperatureChange', {
          detail: { room, temperature }
      });
      document.dispatchEvent(event);
  }
}