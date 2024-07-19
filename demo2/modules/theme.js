export class ThemeManager {
  constructor(toggleButtonId) {
      this.toggleButton = document.getElementById(toggleButtonId);
      this.isDarkTheme = localStorage.getItem('darkTheme') === 'true';
      console.log('ThemeManager constructed');
  }

  init() {
      console.log('ThemeManager initialized');
      this.applyTheme();
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
  }

  applyTheme() {
      console.log('Applying theme, isDarkTheme:', this.isDarkTheme);
      document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
      this.toggleButton.textContent = this.isDarkTheme ? '切换到浅色主题' : '切换到深色主题';
  }

  toggleTheme() {
      console.log('Theme toggled');
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('darkTheme', this.isDarkTheme);
      this.applyTheme();
  }
}