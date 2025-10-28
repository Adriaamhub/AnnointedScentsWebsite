// Show More buttons
document.querySelectorAll('.show-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const more = btn.previousElementSibling.querySelector('.more-products');
    more.classList.toggle('hidden');
    btn.textContent = more.classList.contains('hidden') ? '+ Show More' : '- Show Less';
  });
});

// Scroll to brand
function scrollToBrand() {
  const select = document.getElementById('brandSelect');
  const brandId = select.value;
  if (brandId) {
    document.getElementById(brandId).scrollIntoView({ behavior: 'smooth' });
  }
}
<script>
  // Parallax scroll effect
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    let scrollPos = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
  });
</script>
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const dropdown = link.parentElement;
      dropdown.classList.toggle('active');
    }
  });
});
<script>
  // ===== Toggle Mobile Menu =====
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // ===== Toggle Dropdown on Mobile =====
  document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const dropdown = link.parentElement;
        dropdown.classList.toggle('active');
      }
    });
  });
</script>
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  hero.style.transform = `scale(${1 + window.scrollY / 2000}) translateY(${window.scrollY / 3}px)`;
});
const showMoreBtn = document.querySelector(".catalog .show-more-btn");
const hiddenProducts = document.querySelectorAll(".catalog .hidden");

showMoreBtn.addEventListener("click", () => {
  hiddenProducts.forEach(prod => prod.classList.toggle("hidden"));
  showMoreBtn.textContent = showMoreBtn.textContent === "+ Show More" ? "- Show Less" : "+ Show More";
});
const sparkles = document.querySelectorAll('.sparkle');
sparkles.forEach(s => {
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;
  const randomDelay = Math.random() * 5;
  const randomSize = Math.random() * 6 + 3;
  s.style.left = `${randomX}px`;
  s.style.top = `${randomY}px`;
  s.style.width = `${randomSize}px`;
  s.style.height = `${randomSize}px`;
  s.style.animationDelay = `${randomDelay}s`;
});
<script>
let lastScroll = 0;
const whatsappBtn = document.querySelector('.whatsapp-btn');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 200) {
    whatsappBtn.classList.add('hide'); // slide out
  } else {
    whatsappBtn.classList.remove('hide'); // slide back in
  }

  lastScroll = currentScroll;
});
</script>
AOS.init({
  duration: 1200,
  once: true,
});
// === 4. Gold Dust Mouse Trail ===
const trailContainer = document.createElement("div");
trailContainer.classList.add("trail-container");
document.body.appendChild(trailContainer);

document.addEventListener("mousemove", e => {
  createGoldDust(e.pageX, e.pageY);
});

function createGoldDust(x, y) {
  const dust = document.createElement("span");
  dust.classList.add("gold-dust");
  dust.style.left = x + "px";
  dust.style.top = y + "px";

  // Random size + rotation for organic look
  const size = Math.random() * 6 + 4; // 4px–10px
  dust.style.width = `${size}px`;
  dust.style.height = `${size}px`;
  dust.style.transform = `rotate(${Math.random() * 360}deg)`;
  dust.style.animationDuration = `${Math.random() * 0.6 + 0.4}s`;

  trailContainer.appendChild(dust);

  setTimeout(() => dust.remove(), 800); // Remove after fade
}
