// Nav: transparent over hero, solid on scroll
const nav = document.getElementById('nav');

function updateNav() {
  const scrolled = window.scrollY > 40;
  nav.classList.toggle('scrolled', scrolled);
  nav.classList.toggle('hero-top', !scrolled);
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll(
  '.intro, .gallery__grid, .gallery__footer, .team__card, .info__block, .book__inner'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in')];
        const index = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), index * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));
