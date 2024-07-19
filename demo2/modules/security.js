// modules/security.js
export class SecurityCamera {
  constructor(feedId, toggleId) {
      this.feedElement = document.getElementById(feedId);
      this.toggleButton = document.getElementById(toggleId);
      this.isOn = true;
  }

  init() {
      this.toggleButton.addEventListener('click', () => this.toggleCamera());
      this.updateFeed();
  }

  toggleCamera() {
      this.isOn = !this.isOn;
      this.updateFeed();
      this.toggleButton.textContent = this.isOn ? '关闭摄像头' : '开启摄像头';
      this.toggleButton.setAttribute('aria-pressed', this.isOn);
  }

  updateFeed() {
      if (this.isOn) {
          this.feedElement.textContent = '摄像头画面（模拟）';
          this.feedElement.classList.add('active');
      } else {
          this.feedElement.textContent = '摄像头已关闭';
          this.feedElement.classList.remove('active');
      }
  }
}