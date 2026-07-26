const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const reveals = document.querySelectorAll('.reveal');
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const productCount = document.getElementById('productCount');
const faqItems = document.querySelectorAll('.faq-item');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 55);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(element => observer.observe(element));

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    let visibleCount = 0;

    productCards.forEach(card => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !shouldShow);
      if (shouldShow) visibleCount += 1;
    });

    productCount.textContent = visibleCount;
  });
});

document.querySelectorAll('.heart').forEach(button => {
  button.addEventListener('click', () => {
    const active = button.classList.toggle('active');
    button.textContent = active ? '♥' : '♡';
    button.setAttribute('aria-label', active ? 'ප්‍රියතම ලැයිස්තුවෙන් ඉවත් කරන්න' : 'ප්‍රියතම ලැයිස්තුවට එකතු කරන්න');
  });
});

faqItems.forEach(item => {
  const trigger = item.querySelector('button');
  trigger.addEventListener('click', () => {
    const wasActive = item.classList.contains('active');
    faqItems.forEach(faq => faq.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
