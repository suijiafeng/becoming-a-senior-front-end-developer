// themeManager.js
export class ThemeManager {
    constructor(toggleButtonId) {
        this.toggleButton = document.getElementById(toggleButtonId);
        this.isDarkTheme = localStorage.getItem('darkTheme') === 'true';

        this.toggleButton.addEventListener('click', this.toggleTheme.bind(this));
        this.applyTheme();
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        localStorage.setItem('darkTheme', this.isDarkTheme);
        this.applyTheme();
    }

    applyTheme() {
        document.body.classList.toggle('dark-theme', this.isDarkTheme);
        this.toggleButton.textContent = this.isDarkTheme ? '切换到浅色' : '切换到深色';
    }
}