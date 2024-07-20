// modules/notification.js
export class NotificationSystem {
  constructor(elementId) {
      this.element = document.getElementById(elementId);
  }

  init() {
      // 初始化工作（如果需要的话）
  }

  show(message, duration = 3000) {
      this.element.textContent = message;
      this.element.classList.add('show');
      setTimeout(() => {
          this.hide();
      }, duration);
  }

  hide() {
      this.element.classList.remove('show');
  }
}