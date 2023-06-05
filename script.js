document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks in the UI
    function displayTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            listItem.appendChild(checkbox);

            const taskText = document.createTextNode(task.title);
            listItem.appendChild(taskText);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
        });
    }

    // Add a new task
    function addTask(event) {
        event.preventDefault();
        const taskTitle = taskInput.value.trim();

        if (taskTitle !== '') {
            const newTask = {
                title: taskTitle,
                completed: false
            };

            tasks.push(newTask);
            displayTasks();
            saveTasks();

            taskInput.value = '';
        }
    }

    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        displayTasks();
        saveTasks();
    }

    // Toggle task completion status
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        displayTasks();
        saveTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initialize the app
    function init() {
        displayTasks();
        taskForm.addEventListener('submit', addTask);
        taskList.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox') {
                const index = event.target.parentElement.getAttribute('data-index');
                toggleTask(index);
            }
        });
    }

    // Run the app initialization
    init();
});
