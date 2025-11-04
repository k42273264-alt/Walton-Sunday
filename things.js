document.addEventListener('DOMContentLoaded', () => {
    // Toggle Functionality for Catering and Packages
    const detailsToggles = document.querySelectorAll('.details-toggle');
    detailsToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const details = toggle.nextElementSibling;
        const isActive = toggle.classList.contains('active');
  
        if (!isActive) {
          toggle.classList.add('active');
          toggle.setAttribute('aria-expanded', 'true');
          details.classList.add('active');
        } else {
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          details.classList.remove('active');
        }
      });
    });
  
    // Animation on Scroll
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
  
    animatedElements.forEach(element => observer.observe(element));
  });