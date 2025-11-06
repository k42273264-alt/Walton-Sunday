document.addEventListener('DOMContentLoaded', () => {
  // Gallery Modal
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImage = document.getElementById('galleryModalImage');
  const galleryModalCaption = document.getElementById('galleryModalCaption');
  const galleryClose = document.querySelector('.gallery-modal-close');

  document.querySelectorAll('.gallery-zoom').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.gallery-item');
      const img = item.querySelector('.gallery-image');
      galleryModalImage.src = img.src;
      galleryModalImage.alt = img.alt;
      galleryModalCaption.textContent = img.alt;
      galleryModal.classList.add('active');
    });
  });

  galleryClose.addEventListener('click', () => {
    galleryModal.classList.remove('active');
  });

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('active');
    }
  });

  // Package Toggle
  document.querySelectorAll('.details-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const details = toggle.nextElementSibling;
      details.classList.toggle('active');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', details.classList.contains('active'));
    });
  });

  // Testimonial Carousel
  // const cards = document.querySelectorAll('.testimonial-card');
  // const prevBtn = document.querySelector('.carousel-prev');
  // const nextBtn = document.querySelector('.carousel-next');
  // let current = 0;

  // function showCard(index) {
  //   cards.forEach((card, i) => {
  //     card.classList.toggle('active', i === index);
  //   });
  // }

  // prevBtn.addEventListener('click', () => {
  //   current = (current === 0) ? cards.length - 1 : current - 1;
  //   showCard(current);
  // });

  // nextBtn.addEventListener('click', () => {
  //   current = (current === cards.length - 1) ? 0 : current + 1;
  //   showCard(current);
  // });

  // Auto-play
  // setInterval(() => {
  //   current = (current === cards.length - 1) ? 0 : current + 1;
  //   showCard(current);
  // }, 6000);

  // Scroll Animations
  const elements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));

  // Parallax Hero
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-image');
    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = `${offset * 0.6}px`;
  });
});