window.addEventListener('DOMContentLoaded', (event) => {
  

    const Button = document.getElementById("menu");

    const menu = document.getElementById("animate-me");

    Button.addEventListener('click', () => {
        menu.classList.toggle("show");
        Button.classList.toggle("show");
    
    
    
    });
    const but = document.querySelector(".learn-more");
    const dialog = document.getElementById("box");

    but.addEventListener('click', () => {
        dialog.innerHTML = `
        <h2>Project Details</h2>
        <p>This project is a portfolio website built using HTML, CSS, and JavaScript. It showcases my skills and projects as a web developer. The website features a responsive design, smooth navigation, and interactive elements to enhance user experience.</p>
        <button id="close-btn">Close</button>
        `;
        dialog.showModal();

        dialog.querySelector("#close-btn").addEventListener('click', () => {
            dialog.close();
        });

    });



});