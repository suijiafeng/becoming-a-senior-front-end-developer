// todoList.js
export class TodoList {
    constructor(listId, formId, inputId) {
        this.list = document.getElementById(listId);
        this.form = document.getElementById(formId);
        this.input = document.getElementById(inputId);
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';

        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.list.addEventListener('click', this.handleTodoClick.bind(this));

        this.render();
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim() === '') return;

        const todo = {
            id: Date.now(),
            text: this.input.value,
            completed: false
        };

        this.todos.push(todo);
        this.saveToStorage();
        this.render();
        this.input.value = '';
    }

    handleTodoClick(e) {
        if (e.target.classList.contains('deleteBtn')) {
            this.deleteTodo(e.target.closest('.todo-item'));
        } else if (e.target.classList.contains('completeBtn')) {
            this.toggleComplete(e.target.closest('.todo-item'));
        }
    }

    deleteTodo(todoElement) {
        const id = Number(todoElement.dataset.id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        todoElement.classList.add('removing');
        setTimeout(() => {
            this.saveToStorage();
            this.render();
        }, 300);
    }

    toggleComplete(todoElement) {
        const id = Number(todoElement.dataset.id);
        const todo = this.todos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        this.saveToStorage();
        this.render();
    }

    filterTodos(filter) {
        this.currentFilter = filter;
        this.render();
    }
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    render() {
        const filteredTodos = this.todos.filter(todo => {
            if (this.currentFilter === 'active') return !todo.completed;
            if (this.currentFilter === 'completed') return todo.completed;
            return true;
        });

        this.list.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <span>${this.escapeHtml(todo.text)}</span>
                <div>
                    <button class="completeBtn">${todo.completed ? '取消完成' : '完成'}</button>
                    <button class="deleteBtn">删除</button>
                </div>
            </li>
        `).join('');
    }
}