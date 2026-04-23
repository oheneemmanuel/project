window.addEventListener('DOMContentLoaded', () => {

  // --- Menu toggle (runs on all pages) ---
  const Button = document.getElementById("menu");
  const menu = document.getElementById("animate-me");

  Button.addEventListener('click', () => {
    menu.classList.toggle("show");
    Button.classList.toggle("show");
  });

  // --- Projects page only ---
  const track = document.getElementById('track');
  if (!track) return; // stops here if not on projects page

  const dotsEl = document.getElementById('dots');
  const slides = track.querySelectorAll('.slide');
  const total = slides.length;
  let cur = 0;

  // learn more dialog
  const but = document.querySelector(".learn-more");
  const dialog = document.getElementById("box");

  but.addEventListener('click', () => {
    dialog.innerHTML = `
      <h2>Project Details</h2>
      <p>This project is a portfolio website built using HTML, CSS, and JavaScript. 
      It showcases my skills and projects as a web developer. The website features 
      a responsive design, smooth navigation, and interactive elements to enhance 
      user experience.</p>
      <button id="close-btn">Close</button>
    `;
    dialog.showModal();
    dialog.querySelector("#close-btn").addEventListener('click', () => {
      dialog.close();
    });
  });

  // build dots
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => go(i));
    dotsEl.appendChild(d);
  }

  function go(n) {
    cur = (n + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dotsEl.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === cur)
    );
  }

  document.getElementById('prev').addEventListener('click', () => go(cur - 1));
  document.getElementById('next').addEventListener('click', () => go(cur + 1));

  // swipe support
  let startX = 0;
  const outer = document.getElementById('trackOuter');
  outer.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  outer.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
  }, { passive: true });

  // keyboard support
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') go(cur - 1);
    if (e.key === 'ArrowRight') go(cur + 1);
  });

});