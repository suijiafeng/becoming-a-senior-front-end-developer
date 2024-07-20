export class PreviewManager {
  constructor(iframeId) {
      this.iframe = document.getElementById(iframeId);
  }

  updatePreview(html, css, js) {
      const content = `
          <!DOCTYPE html>
          <html>
          <head>
              <style>${css}</style>
          </head>
          <body>
              ${html}
              <script>${js}</script>
          </body>
          </html>
      `;
      this.iframe.srcdoc = content;
  }
}