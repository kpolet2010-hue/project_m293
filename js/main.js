const burger = document.querySelector('.navbar-burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('nav-menu--open');
  burger.setAttribute('aria-expanded', isOpen);
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value;
    const betreff = contactForm.querySelector('[name="betreff"]').value;
    const nachricht = contactForm.querySelector('[name="nachricht"]').value;
    const body = `Name: ${name}\n\n${nachricht}`;
    const mailtoLink = `mailto:kpolet2010@gmail.com?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  });
}

const projectData = {
  tydakilu: {
    title: 'TyDaKiLu Chess',
    image: '../img/Tydakilu.png',
    desc: 'Ein voll funktionsfähiges Schachspiel, das ich zusammen mit meinem Team entwickelt habe. Es unterstützt alle offiziellen Schachregeln und bietet eine einfache, übersichtliche Benutzeroberfläche.',
    tags: ['Java', 'Teamarbeit', 'Spieleentwicklung'],
  },
  cinebook: {
    title: 'CineBook',
    image: '../img/CineBook.png',
    desc: 'Eine Web-App zum Durchsuchen und Buchen von Kinofilmen. Nutzer können Filme filtern, Infos abrufen und Sitzplätze reservieren.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  geodash: {
    title: 'GeoDash',
    image: '../img/GeoDash.png',
    desc: 'Ein Replika von dem original Spiel Geometry Dash',
    tags: ['Python', 'Geometrie', 'Solo'],
  },
};

const overlay = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

if (overlay) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.project;
      const data = projectData[key];
      if (!data) return;

      document.getElementById('modal-image').src = data.image;
      document.getElementById('modal-image').alt = data.title;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-desc').textContent = data.desc;

      const tagsEl = document.getElementById('modal-tags');
      tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

      overlay.classList.add('modal-overlay--open');
      overlay.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  function closeModal() {
    overlay.classList.remove('modal-overlay--open');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

const currentPath = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-menu__link').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop();
  if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
    link.classList.add('nav-menu__link--active');
  }
});
