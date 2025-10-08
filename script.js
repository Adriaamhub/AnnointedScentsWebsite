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
