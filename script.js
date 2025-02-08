document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from localStorage if available
    loadTasks();

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Attach remove functionality to the button
        removeButton.addEventListener('click', () => {
            li.remove();
            saveTasks(); // Save tasks after removal
        });

        // Append the remove button and the task to the list item
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.getElementsByTagName('li');

        for (let item of taskItems) {
            tasks.push(item.textContent.replace('Remove', '').trim());
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        if (tasks) {
            tasks.forEach(taskText => {
                const li = document.createElement('li');
                li.textContent = taskText;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-btn';

                removeButton.addEventListener('click', () => {
                    li.remove();
                    saveTasks(); // Save tasks after removal
                });

                li.appendChild(removeButton);
                taskList.appendChild(li);
            });
        }
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
