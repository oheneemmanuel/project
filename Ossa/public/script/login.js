const loginForm = document.getElementById('login-form');
const messageBox = document.getElementById('message-box');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Collect data
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        // 2. Send to backend
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Server Response:", result); // <-- ADD THIS

        // 3. Handle result
        if (response.ok) {
            // Save name for later use
            if (result.firstName) {
                localStorage.setItem('ossa_user_name', result.firstName);
            } else {
                localStorage.setItem('ossa_user_name', data.firstName); // Fallback name
            }

            // Show success and redirect
            messageBox.textContent = "Login Successful! Redirecting...";
            messageBox.style.color = "green";
            messageBox.classList.remove('hidden');
            
            setTimeout(() => {
                window.location.href = 'index.html'; // Or your dashboard page
            }, 1500);
        } else {
            // Show error message from controller
            messageBox.textContent = result.message || "Invalid credentials";
            messageBox.style.color = "red";
            messageBox.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Login Error:', error);
        messageBox.textContent = "Server connection failed.";
        messageBox.classList.remove('hidden');
    }
});