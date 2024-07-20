class TodoCounter extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      this.render();
  }

  static get observedAttributes() {
      return ['count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'count') {
          this.render();
      }
  }

  render() {
      const count = this.getAttribute('count') || 0;
      this.shadowRoot.innerHTML = `
          <style>
              :host {
                  display: block;
                  font-weight: bold;
                  color: var(--text-color, #333);
              }
          </style>
          <p>总计待办事项：${count}</p>
      `;
  }
}

customElements.define('todo-counter', TodoCounter);