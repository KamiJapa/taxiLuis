const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    mainNav.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    mainNav.classList.toggle("is-open", open);
  });
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const heroSection = document.querySelector(".hero");
const floatingContact = document.querySelector(".floating-whatsapp");
if (heroSection && floatingContact && "IntersectionObserver" in window) {
  const contactObserver = new IntersectionObserver(([entry]) => {
    floatingContact.hidden = entry.isIntersecting;
  }, { threshold: 0.02 });
  contactObserver.observe(heroSection);
}