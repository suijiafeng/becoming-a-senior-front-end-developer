// modules/lighting.js
export class LightingControl {
  constructor(elementId) {
      this.element = document.getElementById(elementId);
      this.rooms = ['living-room', 'bedroom'];
  }

  init() {
      this.rooms.forEach(room => {
          const toggle = document.getElementById(`${room}-light`);
          const brightness = document.getElementById(`${room}-brightness`);
          const brightnessDisplay = brightness.nextElementSibling;

          toggle.addEventListener('change', (e) => {
              this.updateLightState(room, e.target.checked);
          });

          brightness.addEventListener('input', (e) => {
              const value = e.target.value;
              brightnessDisplay.textContent = `${value}%`;
              this.updateBrightness(room, value);
          });
      });
  }

  updateLightState(room, state) {
      // 在这里你可以发送请求到你的智能家居系统
      console.log(`${room} light is now ${state ? 'on' : 'off'}`);
      
      // 触发一个自定义事件
      const event = new CustomEvent('lightingChange', {
          detail: { room, state }
      });
      document.dispatchEvent(event);
  }

  updateBrightness(room, brightness) {
      // 在这里你可以发送请求到你的智能家居系统
      console.log(`Setting ${room} brightness to ${brightness}%`);
  }
}