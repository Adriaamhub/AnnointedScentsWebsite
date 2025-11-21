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
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");

  // Fade-in effect
  hero.style.opacity = "0";
  setTimeout(() => {
    hero.style.transition = "opacity 1.5s ease-in-out";
    hero.style.opacity = "1";
  }, 100);

  // Gentle luxury glow animation loop
  let glow = true;
  setInterval(() => {
    if (glow) {
      hero.style.filter = "brightness(1.05) contrast(1.08) saturate(1.1)";
    } else {
      hero.style.filter = "brightness(1) contrast(1) saturate(1)";
    }
    glow = !glow;
  }, 2500);
});

document.addEventListener("DOMContentLoaded", () => {
  const line = document.querySelector(".moving-line");
  let fast = false;

  setInterval(() => {
    line.style.animationDuration = fast ? "6s" : "3s";
    fast = !fast;
  }, 5000);
});
document.addEventListener("mousemove", function(e) {
  const hero = document.querySelector(".hero");
  let moveX = (e.clientX / window.innerWidth) * 20;
  let moveY = (e.clientY / window.innerHeight) * 20;

  hero.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
});

document.addEventListener("mousemove", function(e) {
  const hero = document.querySelector(".hero");
  let moveX = (e.clientX / window.innerWidth) * 10;
  let moveY = (e.clientY / window.innerHeight) * 10;

  hero.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
});
document.querySelector(".btn").addEventListener("click", function(e) {
  e.preventDefault();
  document.querySelector("#shop-section").scrollIntoView({
    behavior: "smooth"
  });
});
// CONTACT FORM ==============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusMsg = document.getElementById("statusMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      statusMsg.style.color = "red";
      statusMsg.textContent = "Please fill in all required fields.";
      return;
    }

    statusMsg.style.color = "green";
    statusMsg.textContent = "Message sent successfully! We will contact you soon.";

    form.reset();
  });
});




let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart table
function renderCart() {
    const tbody = document.querySelector('#cart-table tbody');
    const totalPriceEl = document.getElementById('total-price');
    tbody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.image}" class="cart-img"></td>
            <td>${item.name}</td>
            <td>R${item.price}</td>
            <td><button class="remove-btn" data-index="${index}"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });

    totalPriceEl.textContent = total.toFixed(2);

    // Remove items
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

// Add to cart from gallery
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const image = button.getAttribute('data-image');

        cart.push({name, price, image});
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();

        alert(`${name} added to cart!`);
    });
});

// Initialize cart table on page load
renderCart();

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Toggle dropdown on mobile tap
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      dropdown.classList.toggle('active');
    }
  });
});
