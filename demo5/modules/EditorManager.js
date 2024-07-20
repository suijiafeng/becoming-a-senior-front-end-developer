export class EditorManager {
  constructor(elementId) {
      this.element = document.getElementById(elementId);
      this.editor = null;
  }

  init() {
      this.editor = CodeMirror(this.element, {
          mode: 'htmlmixed',
          theme: 'default',
          lineNumbers: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          tabSize: 2,
      });
  }

  setMode(mode) {
      const modeMap = {
          'html': 'htmlmixed',
          'css': 'css',
          'js': 'javascript'
      };
      this.editor.setOption('mode', modeMap[mode]);
  }

  setContent(content) {
      this.editor.setValue(content);
  }

  getContent() {
      return this.editor.getValue();
  }
}