export class ThemeManager {
  constructor(toggleId) {
      this.toggleButton = document.getElementById(toggleId);
      this.isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  }

  init() {
      this.applyTheme();
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
  }

  applyTheme() {
      document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
      this.toggleButton.textContent = this.isDarkTheme ? '切换到浅色主题' : '切换到深色主题';
  }

  toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('darkTheme', this.isDarkTheme);
      this.applyTheme();
  }
}