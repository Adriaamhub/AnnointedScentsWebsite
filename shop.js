// shop.js

document.addEventListener("DOMContentLoaded", () => {
  const showMoreButtons = document.querySelectorAll(".show-more");

  showMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const section = button.closest(".perfume-section");
      const hiddenCards = section.querySelectorAll(".perfume-card.hidden");

      hiddenCards.forEach(card => {
        card.classList.remove("hidden");
      });

      button.style.display = "none";
    });
  });

  // Auto smooth scroll (optional)
  const carousels = document.querySelectorAll(".perfume-grid");
  carousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', e => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed
      carousel.scrollLeft = scrollLeft - walk;
    });
  });
});
// shop.js — handles + buttons, dropdown jump, show-more, drag-scroll

document.addEventListener('DOMContentLoaded', () => {
  // Map + buttons to target brand sections (product-card data-target)
  document.querySelectorAll('.product-card .add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.product-card');
      const targetSelector = card.getAttribute('data-target');
      if (!targetSelector) return;
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // micro highlight
        el.style.transition = 'box-shadow 0.4s ease';
        el.style.boxShadow = '0 8px 40px rgba(227,176,75,0.15)';
        setTimeout(() => el.style.boxShadow = '', 900);
      }
    });
  });

  // Dropdown jump function
  window.scrollToBrand = function () {
    const sel = document.getElementById('brandSelect');
    if (!sel) return;
    const val = sel.value.trim().toLowerCase();
    if (!val) return;
    // Map friendly names to IDs
    const map = {
      'arabiyat prestige': '#french',
      'afnan': '#fragrance',
      'armaf': '#lattafa',
      'lattafa': '#lattafa',
      'french avenue': '#french',
      'fragrance world': '#fragrance',
      'janan': '#janan', // if exists
      'maison asrar': '#maison-asrar' // if exists
    };
    const target = map[val];
    if (target) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Show more reveal
  document.querySelectorAll('.show-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.perfume-section');
      if (!section) return;
      const hidden = section.querySelectorAll('.perfume-card.hidden');
      hidden.forEach(h => h.classList.remove('hidden'));
      btn.style.display = 'none';
    });
  });

  // Drag-to-scroll for any horizontal grids (if used)
  document.querySelectorAll('.perfume-grid, .products').forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('dragging');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    document.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });
});
