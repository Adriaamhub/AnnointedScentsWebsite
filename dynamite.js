/* =========================================
   ⚡ DYNAMITE ANIMATION PACK (JS EDITION)
   ========================================= */

// === 1. Scroll Reveal Effect ===
const reveals = document.querySelectorAll("[data-reveal]");
window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("active");
  });
});

// === 2. Floating Gold Particles ===
const particleContainer = document.querySelector(".gold-particles");
if (particleContainer) {
  for (let i = 0; i < 20; i++) {
    const span = document.createElement("span");
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDelay = `${Math.random() * 5}s`;
    particleContainer.appendChild(span);
  }
}

// === 3. Custom Cursor Glow ===
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

const glowStyle = document.createElement("style");
glowStyle.textContent = `
  .cursor-glow {
    position: fixed;
    width: 25px; height: 25px;
    background: radial-gradient(circle, rgba(255,215,0,0.7), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
    mix-blend-mode: screen;
    z-index: 9999;
  }
`;
document.head.appendChild(glowStyle);
