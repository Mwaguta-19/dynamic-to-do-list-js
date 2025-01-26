document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage if available
    loadTasks();

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Attach an event listener to the remove button
        removeButton.addEventListener('click', function () {
            taskItem.remove();
            saveTasks(); // Re-save tasks after removal
        });

        // Append the remove button to the task item and the task item to the list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Clear the input field
        taskInput.value = "";

        // Save tasks to localStorage after adding a new task
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li');

        taskItems.forEach(item => {
            tasks.push(item.textContent.replace("Remove", "").trim());
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(taskText => {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');

            removeButton.addEventListener('click', function () {
                taskItem.remove();
                saveTasks(); // Re-save tasks after removal
            });

            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }

    // Event listeners for adding tasks
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});