export class TodoList {
  constructor(formId, inputId, listId, dataService) {
      this.form = document.getElementById(formId);
      this.input = document.getElementById(inputId);
      this.list = document.getElementById(listId);
      this.dataService = dataService;
      this.todos = [];
  }

  async init() {
      try {
          this.todos = await this.dataService.getTodoList();
      } catch (error) {
          console.error('Failed to fetch todo list:', error);
          this.todos = [];
      }
      this.renderTodos();
      this.form.addEventListener('submit', this.addTodo.bind(this));
      this.list.addEventListener('click', this.handleTodoClick.bind(this));
  }

  addTodo(e) {
      e.preventDefault();
      const text = this.input.value.trim();
      if (text) {
          const newTodo = { id: Date.now(), text, completed: false };
          this.todos.push(newTodo);
          this.input.value = '';
          this.renderTodos();
          // In a real app, you would also update the server here
      }
  }

  handleTodoClick(e) {
      if (e.target.classList.contains('delete-btn')) {
          const li = e.target.closest('li');
          const id = Number(li.dataset.id);
          this.removeTodo(id, li);
      } else if (e.target.type === 'checkbox') {
          const li = e.target.closest('li');
          const id = Number(li.dataset.id);
          this.toggleTodo(id);
      }
  }

  removeTodo(id, li) {
      li.classList.add('removing');
      li.addEventListener('transitionend', () => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          this.renderTodos();
          // In a real app, you would also update the server here
      }, { once: true });
  }

  toggleTodo(id) {
      this.todos = this.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.renderTodos();
      // In a real app, you would also update the server here
  }

  renderTodos() {
      this.list.innerHTML = this.todos.map(todo => `
          <li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
              <input type="checkbox" ${todo.completed ? 'checked' : ''}>
              <span>${this.escapeHtml(todo.text)}</span>
              <button class="delete-btn">删除</button>
          </li>
      `).join('');
  }

  escapeHtml(unsafe) {
      return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
  }
}