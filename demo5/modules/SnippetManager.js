export class SnippetManager {
  constructor(selectId) {
      this.select = document.getElementById(selectId);
      this.snippets = {
          html: {
              'HTML5 Boilerplate': '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>',
              'Div with Class': '<div class=""></div>'
          },
          css: {
              'Flexbox Center': 'display: flex;\njustify-content: center;\nalign-items: center;',
              'Media Query': '@media (max-width: 768px) {\n\t\n}'
          },
          js: {
              'Function': 'function name() {\n\t\n}',
              'Arrow Function': 'const name = () => {\n\t\n};'
          }
      };
  }

  init() {
      this.updateSnippets('html');
      this.select.addEventListener('change', (e) => this.selectSnippet(e.target.value));
  }

  updateSnippets(language) {
      this.select.innerHTML = '<option value="">选择代码片段...</option>';
      for (const [name, code] of Object.entries(this.snippets[language])) {
          const option = document.createElement('option');
          option.value = code;
          option.textContent = name;
          this.select.appendChild(option);
      }
  }

  selectSnippet(snippet) {
      if (snippet && this.onSelect) {
          this.onSelect(snippet);
      }
      this.select.value = '';
  }

  onSnippetSelect(callback) {
      this.onSelect = callback;
  }
}