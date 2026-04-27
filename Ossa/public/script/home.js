window.addEventListener('DOMContentLoaded', () => {


  // --- Menu toggle (runs on all pages) ---
  const Button = document.getElementById("menu-bar");
  const menu = document.querySelector(".sidebar");

  Button.addEventListener('click', () => {
    menu.classList.toggle("show");
    Button.classList.toggle("show");
  });
  // 1. Grab the name we saved during login
  const userName = localStorage.getItem('ossa_user_name');
  
  // 2. Find the H1 in your Main Content
  const welcomeH1 = document.querySelector('.main-content h1');
  
  // change the login/logout link text and destination
  const authLink = document.querySelector('.nav-menu a[href="login.html"]');
  // 3. Update the H1 if the name exists
  if (userName && welcomeH1) {
    welcomeH1.textContent = `Welcome back, ${userName}`;
  } else {
    welcomeH1.textContent = "OSSA Admin Dashboard";
  }
  
  // 4. (Optional) Let's also update that sidebar name!
  const sidebarName = document.querySelector('.nav-user a');
  if (userName && sidebarName) {

    sidebarName.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
  }

  // 5. Handle logout click
  if (userName) {
    authLink.innerHTML = "<i class='fas fa-sign-out-alt'></i> Logout";
    authLink.href = "#"; // Prevent navigation
    authLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('ossa_user_name');
      window.location.href = 'login.html'; // Redirect to login page
    });
  }



});