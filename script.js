document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SHOW MORE BUTTONS
  ================================ */
  document.querySelectorAll('.show-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const more = btn.previousElementSibling.querySelector('.more-products');
      more.classList.toggle('hidden');
      btn.textContent = more.classList.contains('hidden') ? '+ Show More' : '- Show Less';
    });
  });

  /* ===============================
     HERO FADE + GLOW + PARALLAX
  ================================ */
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = "0";
    setTimeout(() => {
      hero.style.transition = "opacity 1.5s ease-in-out";
      hero.style.opacity = "1";
    }, 100);

    let glow = true;
    setInterval(() => {
      hero.style.filter = glow
        ? "brightness(1.05) contrast(1.08) saturate(1.1)"
        : "brightness(1) contrast(1) saturate(1)";
      glow = !glow;
    }, 2500);

    document.addEventListener("mousemove", e => {
      const moveX = (e.clientX / window.innerWidth) * 10;
      const moveY = (e.clientY / window.innerHeight) * 10;
      hero.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
    });
  }

  /* ===============================
     SMOOTH SCROLL BUTTON
  ================================ */
  const scrollBtn = document.querySelector(".btn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector("#shop-section").scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ===============================
     CONTACT FORM
  ================================ */
  const form = document.getElementById("contactForm");
  const statusMsg = document.getElementById("statusMessage");
  if (form && statusMsg) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
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
  }

  /* ===============================
     CART SYSTEM
  ================================ */
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    const tbody = document.querySelector('#cart-table tbody');
    const totalPriceEl = document.getElementById('total-price');
    if (!tbody || !totalPriceEl) return;
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

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = button.getAttribute('data-price');
      const image = button.getAttribute('data-image');

      cart.push({ name, price, image });
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      alert(`${name} added to cart!`);
    });
  });

  renderCart();

  /* ===============================
     MOBILE MENU + DROPDOWNS
  ================================ */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');

  if (menuToggle && mobileMenu && closeMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('active'));
    closeMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
    window.addEventListener('click', e => {
      if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== menuToggle) {
        mobileMenu.classList.remove('active');
      }
    });
  }

  document.querySelectorAll(".mobile-menu .dropdown > a").forEach(drop => {
    drop.addEventListener("click", function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
      }
    });
  });

  /* ===============================
     ACCOUNT DROPDOWN
  ================================ */
  const accountBtn = document.querySelector(".navbar-login");
  const accountMenu = document.querySelector(".login-dropdown .dropdown-menu");
  if (accountBtn && accountMenu) {
    accountBtn.addEventListener("click", () => accountMenu.classList.toggle("active"));
    document.addEventListener("click", e => {
      if (!accountBtn.contains(e.target) && !accountMenu.contains(e.target)) {
        accountMenu.classList.remove("active");
      }
    });
  }

  /* ===============================
     HERO SLIDER
  ================================ */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const contents = document.querySelectorAll(".content");
  let slideIndex = 0;
  let isMoving = false;
  let slideAuto;

  function showSlide(i) {
    if (isMoving) return;
    isMoving = true;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[i].classList.add("active");
    dots[i].classList.add("active");

    contents.forEach(c => c.classList.remove("fade"));
    if (contents[i]) contents[i].classList.add("fade");

    setTimeout(() => isMoving = false, 1500);
  }

  function nextHeroSlide() { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); }
  function prevHeroSlide() { slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { slideIndex = i; showSlide(i); restartHeroAuto(); }));
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  if (next) next.addEventListener('click', () => { nextHeroSlide(); restartHeroAuto(); });
  if (prev) prev.addEventListener('click', () => { prevHeroSlide(); restartHeroAuto(); });

  function startHeroAuto() { slideAuto = setInterval(nextHeroSlide, 5000); }
  function restartHeroAuto() { clearInterval(slideAuto); startHeroAuto(); }

  if (slides.length) {
    showSlide(slideIndex);
    startHeroAuto();
  }

  /* ===============================
     MILESTONE COUNTERS
  ================================ */
  document.addEventListener("DOMContentLoaded", () => {
  const milestoneSection = document.querySelector(".milestone-section");
  if (!milestoneSection) return;

  const counters = milestoneSection.querySelectorAll(".counter");
  let started = false;

  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-target")) || 0;
    let startVal = Number(el.innerText) || 0;
    const duration = 2000; // duration in ms
    const startTime = performance.now();

    const run = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(startVal + (target - startVal) * ease);
      el.innerText = current;

      if (progress < 1) {
        requestAnimationFrame(run);
      } else {
        el.innerText = target; // ensure final number is exact
      }
    };

    requestAnimationFrame(run);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting && !started) {
        counters.forEach((counter) => animateCounter(counter));
        started = true;
        obs.disconnect();
      }
    },
    { threshold: 0.5 } // triggers when 50% visible
  );

  observer.observe(milestoneSection);
});


  /* ===============================
     CATEGORY TABS
  ================================ */
  const tabs = document.querySelectorAll('input[name="category"]');
  const categories = document.querySelectorAll(".fragrance-grid");

  tabs.forEach(tab => {
    tab.addEventListener("change", () => {
      categories.forEach(cat => cat.style.display = "none");
      const activeCat = document.querySelector(".category-" + tab.id.split("tab-")[1]);
      if (activeCat) activeCat.style.display = "grid";
    });
  });

  // initialize first tab
  const firstTab = document.querySelector(".category-women");
  if (firstTab) firstTab.style.display = "grid";

  /* ===============================
     BRANDS CAROUSEL AUTO SCROLL
  ================================ */
  const carousel = document.getElementById('brandsCarousel');
  if (carousel) {
    setInterval(() => carousel.scrollBy({ left: 200, behavior: 'smooth' }), 2500);
  }

  /* ===============================
     CART COUNT DISPLAY
  ================================ */
 document.addEventListener("DOMContentLoaded", () => {
  const cartPanel = document.getElementById("cart-panel");
  const closeCartBtn = document.getElementById("close-cart");
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  // Open cart function (attach to cart icon)
  window.openCart = () => cartPanel.classList.add("active");
  closeCartBtn.addEventListener("click", () => cartPanel.classList.remove("active"));

  // Load cart from localStorage
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>R${item.price} x ${item.quantity}</p>
        </div>
        <span class="remove-item" data-index="${index}">&times;</span>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    cartTotalEl.textContent = `R${total}`;

    // Remove item
    cartItemsContainer.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      });
    });
  }

  loadCart();

  // Checkout (link to payment)
  checkoutBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.length) return alert("Cart is empty!");

    // Example: Redirect to payment gateway
    // For Stripe, PayPal, etc., integrate API here
    alert("Proceeding to checkout...");
  });

  // Add product to cart globally
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === id);

      if (existing) existing.quantity += 1;
      else cart.push({ id, name, price, quantity: 1, image });

      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
      openCart();
    });
  });
});

// ===============================
// ADD TO CART – GLOBAL FUNCTION
// ===============================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const counters = document.querySelectorAll("#cart-count, #cart-count-desktop, #cart-count-mobile");
  counters.forEach(c => {
    if (c) c.textContent = total;
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

// ===============================
// ADD TO CART BUTTONS
// ===============================
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("add-to-cart")) {
    const name = e.target.getAttribute("data-name");
    const price = Number(e.target.getAttribute("data-price"));
    const img = e.target.closest(".product-card").querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already in cart
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        image: img,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    // Popup message
    alert(`${name} added to your cart!`);
  }
});


