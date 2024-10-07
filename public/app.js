document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get form values without type assertions
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        console.error('Name or email is not provided.');
        return;
    }

    // Send data to the server using Fetch API
    fetch('/add-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email })
    })
    .then(response => response.text()) // Parse the response as text
    .then(data => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = data; // Display server response
        }

        const formElement = document.getElementById('userForm');
        if (formElement) {
            formElement.reset(); // Reset the form after submission
        }
    })
    .catch(error => console.error('Error:', error)); // Log errors if any
});
