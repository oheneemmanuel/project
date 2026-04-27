// public/js/register.js

const registerForm = document.getElementById('register-form'); // Make sure your <form> has this ID!
const messageBox = document.getElementById('message-box');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    // 1. Collect the data from the form
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
        // 2. Send the data to your Node.js server
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // 3. Handle the response
        if (response.status === 201) {
            messageBox.textContent = "Registration successful! Redirecting to login...";
            messageBox.style.color = "green";
            messageBox.classList.remove('hidden');
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            messageBox.textContent = "Registration failed: " + result.message;
            messageBox.style.color = "red";
            messageBox.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        messageBox.textContent = "Server connection failed.";
        messageBox.classList.remove('hidden');
    }
});