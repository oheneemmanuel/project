window.addEventListener('DOMContentLoaded', () => {

    // --- Menu toggle (runs on all pages) ---
    const Button = document.getElementById("menu-bar");
    const menu = document.querySelector(".sidebar");
    Button.addEventListener('click', () => {
      menu.classList.toggle("show");
      Button.classList.toggle("show");
    });
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('new-password');
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
    const resetForm = document.getElementById('reset-form');

    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('new-password').value;

        try {
            const response = await fetch('/api/reset-password', {
                method: 'PATCH', // PATCH is best for updating specific fields
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Password updated successfully! Redirecting to login...");
                window.location.href = 'login.html';
            } else {
                alert(result.message || "Error updating password.");
            }
        } catch (error) {
            console.error("Connection error:", error);
        }
    });
});