// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

    // Select the necessary DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Retrieve tasks from localStorage if available
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render the tasks list
    function renderTasks() {
        // Clear the current list
        taskList.innerHTML = "";
        
        // Loop through the tasks array and create li elements for each task
        tasks.forEach(function(task, index) {
            const li = document.createElement("li");
            li.textContent = task;

            // Create remove button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");

            // Add event listener for the remove button
            removeBtn.addEventListener("click", function() {
                removeTask(index);
            });

            // Append the remove button to the li element
            li.appendChild(removeBtn);

            // Append the li to the task list
            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Check if the input is not empty
        if (taskText !== "") {
            // Add the task to the tasks array
            tasks.push(taskText);

            // Update localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            // Clear the input field
            taskInput.value = "";

            // Re-render the tasks list
            renderTasks();
        } else {
            // Alert if input is empty
            alert("Please enter a task.");
        }
    }

    // Function to remove a task
    function removeTask(index) {
        // Remove the task from the tasks array
        tasks.splice(index, 1);

        // Update localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Re-render the tasks list
        renderTasks();
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener("click", addTask);

    // Event listener for the "Enter" key to add a task
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Render the tasks when the page is loaded
    renderTasks();

});
