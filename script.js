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
      let moveX = (e.clientX / window.innerWidth) * 10;
      let moveY = (e.clientY / window.innerHeight) * 10;
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

  // Mobile dropdown toggle
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
     HERO FADE-IN ON SCROLL
  ================================ */
  const fadeElements = document.querySelectorAll('.fade-in');
  function fadeInOnScroll() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();

  /* ===============================
     COUNTERS
  ================================ */
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;
  function startCounters() {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-target");
      let count = 0;
      let speed = target / 120;

      function updateCount() {
        if (count < target) {
          count += speed;
          counter.innerText = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      }
      updateCount();
    });
  }

  window.addEventListener("scroll", () => {
    const stats = document.querySelector(".stats");
    if (!countersStarted && stats && stats.getBoundingClientRect().top < window.innerHeight - 100) {
      countersStarted = true;
      startCounters();
    }
  });

  /* ===============================
     CAROUSEL / SLIDER
  ================================ */
  const track = document.querySelector('.carousel-track');
  if (track) {
    const cards = Array.from(track.children);
    const nextBtn = document.querySelector('.carousel-arrow.right');
    const prevBtn = document.querySelector('.carousel-arrow.left');
    let carouselIndex = 0;
    const cardWidth = cards[0].getBoundingClientRect().width + 20;

    function moveCarousel() {
      track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
    }

    let autoSlide = setInterval(() => {
      carouselIndex++;
      if (carouselIndex > cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth)) carouselIndex = 0;
      moveCarousel();
    }, 4000);

    function resetInterval() {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        carouselIndex++;
        if (carouselIndex > cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth)) carouselIndex = 0;
        moveCarousel();
      }, 4000);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { carouselIndex++; moveCarousel(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { carouselIndex--; moveCarousel(); resetInterval(); });

    // Swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextBtn.click();
      else if (endX - startX > 50) prevBtn.click();
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
    if (contents[i]) {
      contents[i].classList.add("fade");
    }

    setTimeout(() => isMoving = false, 1500);
  }

  function nextHeroSlide() { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); }
  function prevHeroSlide() { slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); }
  function goToHeroSlide(i) { slideIndex = i; showSlide(i); }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToHeroSlide(i); restartHeroAuto(); }));
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  if (next) next.addEventListener('click', () => { nextHeroSlide(); restartHeroAuto(); });
  if (prev) prev.addEventListener('click', () => { prevHeroSlide(); restartHeroAuto(); });

  function startHeroAuto() { slideAuto = setInterval(nextHeroSlide, 5000); }
  function restartHeroAuto() { clearInterval(slideAuto); startHeroAuto(); }

  showSlide(slideIndex);
  startHeroAuto();

}); // DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const startCounter = (entry) => {
    if (entry[0].isIntersecting) {
      counters.forEach(counter => {
        const updateCounter = () => {
          const target = +counter.getAttribute("data-target");
          const current = +counter.innerText;
          const increment = target / 120;

          if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCounter();
      });
    }
  };

  const observer = new IntersectionObserver(startCounter, {
    threshold: 0.5
  });

  observer.observe(document.querySelector(".milestone-grid"));
});
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let started = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let start = +counter.innerText;

      const increment = (target - start) / 120;

      const update = () => {
        start += increment;

        if (start < target) {
          counter.innerText = Math.ceil(start);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      animateCounters();
      started = true;
    }
  }, { threshold: 0.4 });

  observer.observe(document.querySelector(".milestone-section"));
});
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let started = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let start = +counter.innerText;
      const increment = (target - start) / 120;

      const update = () => {
        start += increment;

        if (start < target) {
          counter.innerText = Math.ceil(start);

          // POP / BOUNCE EFFECT
          counter.style.animation = "none";
          counter.offsetHeight; // reflow trick
          counter.style.animation = "counterPop 0.25s ease-out";

          requestAnimationFrame(update);
        } else {
          counter.innerText = target;

          // FINAL POP
          counter.style.animation = "counterPop 0.35s ease-out";
        }
      };

      update();
    });
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      animateCounters();
      started = true;
    }
  }, { threshold: 0.4 });

  observer.observe(document.querySelector(".milestone-section"));
});

(function(){
  // helper: parse any number-like string safely (removes commas, spaces, currency)
  const parseNumber = str => {
    if (str === null || str === undefined) return 0;
    const cleaned = String(str).replace(/[^0-9\.\-]/g, '');
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  // find elements
  const section = document.querySelector(".milestone-section");
  const counters = section ? Array.from(section.querySelectorAll(".counter")) : [];

  if (!section) {
    console.warn("Milestone script: .milestone-section not found in DOM.");
    return;
  }
  if (!counters.length) {
    console.warn("Milestone script: no elements with class .counter found inside .milestone-section.");
    return;
  }

  // core animation for one counter (closure per-counter)
  const animateOne = (el) => {
    // read values
    const target = parseNumber(el.getAttribute("data-target"));
    const startVal = parseNumber(el.innerText);
    if (target === startVal) {
      // nothing to animate, but still trigger final pop/glow
      el.innerText = target;
      el.style.animation = "counterPop 0.35s ease-out";
      el.classList.add("active-glow");
      return;
    }

    // config: frames and easing
    const totalFrames = 120; // smoothness
    let frame = 0;

    // If target < start, we count down (rare) — handle accordingly.
    const direction = target >= startVal ? 1 : -1;

    const run = () => {
      frame++;
      const progress = Math.min(1, frame / totalFrames);
      // easing (cubic out-ish)
      const ease = 1 - Math.pow(1 - progress, 3);

      // compute interpolated value
      const current = Math.round(startVal + (target - startVal) * ease);

      // write formatted number (no commas here — keep simple)
      el.innerText = current;

      // POP / BOUNCE visual on update
      el.style.animation = "none";
      // force reflow to restart animation
      void el.offsetHeight;
      el.style.animation = "counterPop 0.28s ease-out";

      // add soft glow while counting
      el.classList.add("active-glow");

      if (progress < 1) {
        requestAnimationFrame(run);
      } else {
        // ensure final exact value
        el.innerText = target;
        // final pop
        el.style.animation = "counterPop 0.35s ease-out";
        el.classList.add("active-glow");
      }
    };

    requestAnimationFrame(run);
  };

  // run animation for all counters
  const runAll = () => {
    counters.forEach(c => {
      // safety: ensure data-target is numeric, otherwise skip
      const t = parseNumber(c.getAttribute("data-target"));
      if (!Number.isFinite(t)) {
        console.warn("Milestone script: invalid data-target on", c, "- skipping.");
        return;
      }
      animateOne(c);
    });
  };

  // observer callback
  const startWhenVisible = (entries, obs) => {
    if (entries[0].isIntersecting) {
      runAll();
      obs.disconnect && obs.disconnect();
    }
  };

  // Use IntersectionObserver if available
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(startWhenVisible, { threshold: 0.35 });
    obs.observe(section);
  } else {
    // fallback if unsupported: run after small delay
    console.warn("Milestone script: IntersectionObserver not supported — running counters immediately.");
    setTimeout(runAll, 400);
  }

  // DEBUG: if you want console messages uncomment next line
  // console.log("Milestone script initialized. Counters found:", counters.length);
})();




let carousel = document.getElementById('brandsCarousel');
setInterval(() => {
  carousel.scrollBy({ left: 200, behavior: 'smooth' });
}, 2500);
