import { TodoList } from './todoList.js';
import { ThemeManager } from './themeManager.js';
import './components/TodoCounter.js';
const todoList = new TodoList('todoList', 'todoForm', 'todoInput');
const themeManager = new ThemeManager('themeToggle');

// 初始化过滤按钮
const filterButtons = document.querySelectorAll('.filterBtn');
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        todoList.filterTodos(e.target.dataset.filter);
    });
});