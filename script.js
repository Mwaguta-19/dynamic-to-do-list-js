const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Function to add tasks
function addTask(taskText, save = true) {
    if (taskText.trim() === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new list item (li)
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');

    // Add event listener for the remove button
    removeButton.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(taskText);
    });

    // Append the button to the list item and the list item to the list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
        saveTaskToLocalStorage(taskText);
    }

    // Clear the input field
    taskInput.value = '';
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false means don't save again
}

// Event listeners for adding tasks
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        addTask(taskText);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText);
        }
    });
});