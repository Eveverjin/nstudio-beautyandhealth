// Nav: transparent over hero, solid on scroll
const nav = document.getElementById('nav');

function updateNav() {
  const scrolled = window.scrollY > 60;
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
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in')];
        const index = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), index * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Load content from Tina CMS JSON files ──────────────────────
async function loadContent() {
  try {
    // Info: address, hours, contact
    const info = await fetch('/content/info.json').then(r => r.json());

    const addr = document.getElementById('t-address');
    if (addr) addr.innerHTML = info.address.replace(/\n/g, '<br>');

    const mapsLink = document.getElementById('t-maps-url');
    if (mapsLink && info.mapsUrl) mapsLink.href = info.mapsUrl;

    const hours = document.getElementById('t-hours');
    if (hours) hours.innerHTML = info.hours.replace(/\n/g, '<br>');

    const phone = document.getElementById('t-phone');
    if (phone && info.phone) {
      phone.href = 'tel:' + info.phone.replace(/\s/g, '');
      phone.textContent = info.phone;
    }

    const email = document.getElementById('t-email');
    if (email && info.email) {
      email.href = 'mailto:' + info.email;
      email.textContent = info.email;
    }

    const ig = document.getElementById('t-instagram');
    if (ig && info.instagram) ig.href = info.instagram;

  } catch (e) { console.warn('info.json load error', e); }

  try {
    // Site settings: hero text, intro, booking URL
    const s = await fetch('/content/settings.json').then(r => r.json());

    const heroTitle = document.getElementById('t-hero-title');
    if (heroTitle && s.heroTitle) heroTitle.textContent = s.heroTitle;

    const heroSub = document.getElementById('t-hero-sub');
    if (heroSub && s.heroSubtitle) heroSub.innerHTML = s.heroSubtitle;

    const introText = document.getElementById('t-intro-text');
    if (introText && s.introText) introText.textContent = s.introText;

    if (s.bookingUrl) {
      document.querySelectorAll('.t-book-url').forEach(el => {
        el.href = s.bookingUrl;
        el.removeAttribute('rel');
        el.target = '_blank';
      });
    }

  } catch (e) { console.warn('settings.json load error', e); }

  try {
    // Team members
    for (let i = 1; i <= 3; i++) {
      const m = await fetch(`/content/team/member-${i}.json`).then(r => r.json());
      const card = document.getElementById(`t-team-${i}`);
      if (!card) continue;
      const name = card.querySelector('.team__name');
      const role = card.querySelector('.team__role');
      const bio  = card.querySelector('.team__bio');
      if (name && m.name) name.textContent = m.name;
      if (role && m.role) role.textContent = m.role;
      if (bio  && m.bio)  bio.textContent  = m.bio;
    }
  } catch (e) { console.warn('team JSON load error', e); }
}

loadContent();
