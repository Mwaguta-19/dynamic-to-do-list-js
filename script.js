document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Async Function
    async function fetchUserData() {
        // Define the API URL
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';
        
        // Select the Data Container Element
        const dataContainer = document.getElementById('api-data');
        
        // Clear existing content before appending new content
        dataContainer.innerHTML = 'Loading user data...';

        try {
            // Fetch data using try-catch
            const response = await fetch(apiUrl);
            
            // If response is not okay, throw an error
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            // Convert the response to JSON
            const users = await response.json();

            // Create and Append User List
            const userList = document.createElement('ul');
            
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = user.name;  // Display user name
                userList.appendChild(listItem);
            });

            // Clear the loading message and append the user list
            dataContainer.innerHTML = '';  // Remove "Loading..." message
            dataContainer.appendChild(userList);  // Append the user list to the container

        } catch (error) {
            // Error Handling: If there's an error, show a failure message
            dataContainer.innerHTML = 'Failed to load user data.';
            console.error(error);  // Log the error for debugging purposes
        }
    }

    // Invoke fetchUserData once the HTML document is fully loaded
    fetchUserData();
});