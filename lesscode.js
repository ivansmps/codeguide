// Массив для хранения задач
let tasks = [
  { id: 1, text: 'Купить продукты', completed: false },
  { id: 2, text: 'Сделать домашку', completed: true },
  { id: 3, text: 'Прочитать книгу', completed: false }
];

// DOM элементы
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const filterSelect = document.getElementById('filter');

// Функция для обновления отображения списка задач
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // 'all' tasks
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : 'active';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    li.appendChild(taskText);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Не сделано' : 'Сделано';
    toggleButton.onclick = () => toggleTaskCompletion(task.id);
    li.appendChild(toggleButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => deleteTask(task.id);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

// Функция для добавления новой задачи
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = {
      id: tasks.length + 1,
      text: taskText,
      completed: false
    };
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks(filterSelect.value);
  }
}

// Функция для переключения состояния задачи (выполнено/не выполнено)
function toggleTaskCompletion(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks(filterSelect.value);
  }
}

// Функция для удаления задачи
function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks(filterSelect.value);
}

// Функция для фильтрации задач
function filterTasks(event) {
  renderTasks(event.target.value);
}

// Слушатели событий
addTaskButton.addEventListener('click', addTask);
filterSelect.addEventListener('change', filterTasks);

// Инициализация страницы
renderTasks();

// Пример использования LocalStorage для сохранения задач
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из LocalStorage
function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTasks();
}

// Автоматическая загрузка задач при загрузке страницы
window.onload = loadTasksFromLocalStorage;

// Обработчик сохранения задач при изменении списка
window.onbeforeunload = saveTasksToLocalStorage;

// Пример для подсчета количества выполненных задач
function countCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  alert(`Выполнено задач: ${completedTasks.length}`);
}

// Добавляем кнопку для подсчета выполненных задач
const countButton = document.createElement('button');
countButton.textContent = 'Посчитать выполненные задачи';
countButton.onclick = countCompletedTasks;
document.body.appendChild(countButton);

// Стиль для задач
const style = document.createElement('style');
style.innerHTML = `
  #task-list {
    list-style-type: none;
    padding: 0;
  }
  #task-list li {
    padding: 5px;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  #task-list li.completed {
    text-decoration: line-through;
    background-color: #d4edda;
  }
  #task-list li.active {
    background-color: #fff3cd;
  }
  button {
    margin-left: 10px;
    padding: 5px;
    cursor: pointer;
  }
  input {
    padding: 5px;
    margin-right: 10px;
  }
`;
document.head.appendChild(style);

// Завершающие комментарии:
// - Функционал фильтрации задач по статусу: все, активные, выполненные
// - Возможность добавлять, удалять задачи и менять их статус
// - Использование LocalStorage для сохранения данных между перезагрузками
// - Возможность подсчета количества выполненных задач
// Это простое приложение для демонстрации работы с DOM, событиями и состоянием приложения.
