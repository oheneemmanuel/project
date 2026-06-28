window.addEventListener('DOMContentLoaded', () => {

    // --- Menu toggle ---
    const Button = document.getElementById("menu-bar");
    const menu = document.querySelector(".sidebar");

    Button.addEventListener('click', () => {
        menu.classList.toggle("show");
        Button.classList.toggle("show");
    });

    // --- Password toggle (MOVE THIS OUTSIDE SUBMIT) ---
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }

    // --- Form Submission ---
    const loginForm = document.getElementById('login-form');
    const messageBox = document.getElementById('message-box');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (response.ok) {
                localStorage.setItem('ossa_user_name', result.firstName || data.firstName);
                messageBox.textContent = "Login Successful! Redirecting...";
                messageBox.style.color = "green";
                messageBox.classList.remove('hidden');
                setTimeout(() => { window.location.href = 'index.html'; }, 1500);
            } else {
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
});