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

  // Smooth scroll for internal links (extra safety for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Fake form submit (no backend on GitHub Pages)
  function bindForm(id, successId) {
    const form = document.getElementById(id);
    const success = document.getElementById(successId);

    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.hidden = false;
      setTimeout(function () {
        success.hidden = true;
        form.reset();
      }, 4000);
    });
  }

  bindForm('heroForm', 'heroFormSuccess');
  bindForm('contactForm', 'contactFormSuccess');

  // ROI calculator
  const calcBtn = document.getElementById('calcBtn');
  const priceField = document.getElementById('price');
  const yieldField = document.getElementById('yield');
  const yearsField = document.getElementById('years');
  const resultBlock = document.getElementById('calcResult');

  function formatNumber(num) {
    return num.toLocaleString('ru-RU', { maximumFractionDigits: 1 });
  }

  if (calcBtn && priceField && yieldField && yearsField && resultBlock) {
    calcBtn.addEventListener('click', function () {
      const price = parseFloat(priceField.value.replace(',', '.')) || 0;
      const rate = (parseFloat(yieldField.value.replace(',', '.')) || 0) / 100;
      const years = parseInt(yearsField.value, 10) || 0;

      if (!price || !rate || !years) {
        resultBlock.textContent = 'Пожалуйста, заполните все поля для расчёта.';
        return;
      }

      const priceRub = price * 1_000_000;
      const annualIncome = priceRub * rate;
      const totalIncome = annualIncome * years;
      const roiPercent = (totalIncome / priceRub) * 100;

      resultBlock.innerHTML =
        'Ориентировочный годовой чистый доход: <strong>' + formatNumber(annualIncome / 1_000_000) + ' млн ₽</strong><br>' +
        'Доход за ' + years + ' ' + (years === 1 ? 'год' : (years >= 2 && years <= 4 ? 'года' : 'лет')) +
        ': <strong>' + formatNumber(totalIncome / 1_000_000) + ' млн ₽</strong><br>' +
        'Совокупная доходность за период: <strong>' + formatNumber(roiPercent) + ' %</strong> (без учёта роста стоимости актива).';
    });
  }
});
