import { EditorManager } from './modules/EditorManager.js';
import { PreviewManager } from './modules/PreviewManager.js';
import { StorageManager } from './modules/StorageManager.js';
import { SnippetManager } from './modules/SnippetManager.js';

class App {
    constructor() {
        this.editorManager = new EditorManager('editor');
        this.previewManager = new PreviewManager('preview-frame');
        this.storageManager = new StorageManager();
        this.snippetManager = new SnippetManager('snippet-select');
        this.currentLanguage = 'html';
        this.debounceTimer = null;
    }

    init() {
        this.editorManager.init();
        this.snippetManager.init();
        this.loadSavedCode();
        this.setupEventListeners();
        this.updatePreview();
    }

    setupEventListeners() {
        document.getElementById('run-btn').addEventListener('click', () => this.updatePreview());
        document.getElementById('format-btn').addEventListener('click', () => this.formatCode());

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeLanguage(e.target.dataset.lang));
        });

        this.editorManager.editor.on('change', () => {
            this.saveCode();
            // this.debouncedUpdatePreview();
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.updatePreview();
            }
        });

        this.snippetManager.onSnippetSelect((snippet) => {
            this.insertSnippet(snippet);
        });
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.editorManager.setMode(lang);
        this.editorManager.setContent(this.storageManager.getCode(lang));
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        this.snippetManager.updateSnippets(lang);
    }

    updatePreview() {
        const html = this.storageManager.getCode('html');
        const css = this.storageManager.getCode('css');
        const js = this.storageManager.getCode('js');
        this.previewManager.updatePreview(html, css, js);
    }

    debouncedUpdatePreview() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.updatePreview(), 500);
    }
    formatCode() {
      try {
          const code = this.editorManager.getContent();
          let formattedCode;
          
          const commonOptions = {
              printWidth: 80,
              tabWidth: 2,
              useTabs: false,
              singleQuote: false,
              endOfLine: "lf"
          };
          
          switch (this.currentLanguage) {
              case 'html':
                  formattedCode = prettier.format(code, {
                      ...commonOptions,
                      parser: "html",
                      plugins: prettierPlugins,
                  });
                  break;
              case 'css':
                  formattedCode = this.formatCSS(code);
                  break;
              case 'js':
                  formattedCode = prettier.format(code, {
                      ...commonOptions,
                      parser: "babel",
                      plugins: prettierPlugins,
                      singleQuote: true,
                      semi: true,
                      trailingComma: "es5",
                  });
                  break;
              default:
                  throw new Error('Unsupported language for formatting');
          }
          
          this.editorManager.setContent(formattedCode);
          this.showNotification('代码已格式化', 'success');
      } catch (error) {
          console.error('Formatting error:', error);
          this.showNotification('格式化失败: ' + error.message, 'error');
      }
  }
  
  formatCSS(css) {
    // 移除注释
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // 分割规则
    const rules = css.split('}');
    
    let formattedCSS = '';
    
    rules.forEach(rule => {
        // 分割选择器和声明
        const parts = rule.split('{');
        if (parts.length === 2) {
            // 格式化选择器
            const selector = parts[0].trim();
            // 分割并格式化声明
            const declarations = parts[1].split(';')
                .filter(decl => decl.trim() !== '')
                .map(decl => {
                    const [property, value] = decl.split(':');
                    return `    ${property.trim()}: ${value.trim()};`;
                })
                .join('\n');
            
            // 组合格式化后的规则
            formattedCSS += `${selector} {\n${declarations}\n}\n\n`;
        }
    });
    
    return formattedCSS.trim();
}
    saveCode() {
        const code = this.editorManager.getContent();
        this.storageManager.saveCode(this.currentLanguage, code);
    }

    loadSavedCode() {
        ['html', 'css', 'js'].forEach(lang => {
            const savedCode = this.storageManager.getCode(lang);
            if (savedCode) {
                if (lang === 'html') {
                    this.editorManager.setContent(savedCode);
                }
            }
        });
    }

    insertSnippet(snippet) {
        const cursor = this.editorManager.editor.getCursor();
        this.editorManager.editor.replaceRange(snippet, cursor);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }


}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});