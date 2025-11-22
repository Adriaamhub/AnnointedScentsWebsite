const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.style.left = "0";
});

closeMenu.addEventListener("click", () => {
  mobileMenu.style.left = "-100%";
});
