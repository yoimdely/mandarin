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
        const offset = 70;
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
    footerYear.textContent = `© ${year} Mandarin Garden Sochi. Все права защищены.`;
  }

  // Forms -> mailto: yoimdely@gmail.com
  function handleMailForm(formId, successId, subjectPrefix) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);

    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || formData.get('phone / мессенджер') || '';
      const email = formData.get('email') || '';
      const budget = formData.get('budget') || '';
      const type = formData.get('type') || '';
      const messenger = formData.get('messenger') || '';
      const comment = formData.get('comment') || '';

      let body = '';
      body += `Имя: ${name}\n`;
      if (phone) body += `Телефон / мессенджер: ${phone}\n`;
      if (email) body += `E-mail: ${email}\n`;
      if (messenger) body += `Предпочтительный мессенджер: ${messenger}\n`;
      if (budget) body += `Бюджет: ${budget} млн ₽\n`;
      if (type) body += `Формат апартаментов: ${type}\n`;
      if (comment) body += `Комментарий: ${comment}\n`;

      const subject = `${subjectPrefix} — ${name || 'заявка с сайта'}`;
      const mailto = `mailto:yoimdely@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      success.hidden = false;

      setTimeout(function () {
        success.hidden = true;
      }, 5000);
    });
  }

  handleMailForm('heroForm', 'heroFormSuccess', 'Заявка на подбор апартаментов Mandarin Garden');
  handleMailForm('contactForm', 'contactFormSuccess', 'Заявка с блока Контакты Mandarin Garden');
});
