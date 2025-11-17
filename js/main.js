document.addEventListener('DOMContentLoaded', function () {
  // Burger menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
      });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    });
  });

  // Year in footer
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = `© ${year} Mandarin Garden · Отдел продаж новостроек Сочи.`;
  }
});
