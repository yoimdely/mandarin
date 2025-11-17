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

  // Leaflet map init (Локация)
  const mapEl = document.getElementById('map');
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map('map').setView([43.422249, 39.924556], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([43.422249, 39.924556])
      .addTo(map)
      .bindPopup('Mandarin Garden · ул. Демократическая, 18');
  }

  // Swiper slider (Медиа)
  if (typeof Swiper !== 'undefined' && document.querySelector('.media-slider')) {
    new Swiper('.media-slider', {
      loop: true,
      slidesPerView: 1.1,
      spaceBetween: 16,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        720: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  // Year in footer
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = `© ${year} Mandarin Garden · Отдел продаж новостроек Сочи.`;
  }
});
