document.addEventListener('DOMContentLoaded', () => {

  // Constants

  const CAROUSEL_INTERVAL = 5000; // Magazine carousel interval (ms)

  const DEBOUNCE_DELAY = 200; // Debounce delay for click/touch events
 
  // Utility: Debounce

  const debounce = (func, delay) => {

    let timeout;

    return (...args) => {

      clearTimeout(timeout);

      timeout = setTimeout(() => func.apply(null, args), delay);

    };

  };
 
  // Preloader Logic

  const initPreloader = () => {

    if (sessionStorage.getItem('preloaderShown') !== 'true') {

      const preloader = document.querySelector('.preloader');

      if (preloader) {

        document.body.classList.add('preloading');

        document.querySelectorAll('.site-header, .hero-video, section, footer').forEach((el) => {

          el.style.display = 'none';

        });
 
        let progress = 0;

        const interval = setInterval(() => {

          progress += 10;

          if (progress >= 100) {

            clearInterval(interval);

            preloader.style.opacity = '0';

            setTimeout(() => {

              preloader.style.display = 'none';

              document.body.classList.remove('preloading');

              document.querySelectorAll('.site-header, .hero-video, section, footer').forEach((el) => {

                el.style.display = '';

              });

              sessionStorage.setItem('preloaderShown', 'true');

            }, 300);

          }

        }, 50);

      }

    } else {

      const preloader = document.querySelector('.preloader');

      if (preloader) preloader.style.display = 'none';

      document.body.classList.remove('preloading');

      document.querySelectorAll('.site-header, .hero-video, section, footer').forEach((el) => {

        el.style.display = '';

      });

    }

  };
 
  // Hero Video Logic (replaces old hero slider)

  const initHeroVideo = () => {

    const heroVideo = document.querySelector('.hero-video');

    if (!heroVideo) return;
 
    const video = heroVideo.querySelector('.background-video');

    const content = heroVideo.querySelector('.slide-content');
 
    const showText = () => content.classList.add('fade-in');
 
    if (video) {

      if (video.readyState >= 3) {

        showText(); // already loaded

      } else {

        video.addEventListener('canplay', showText);

        video.addEventListener('loadedmetadata', showText);

        video.addEventListener('error', showText); // fallback

      }

    }

  };
 
  // Magazine Carousel Logic

  const initMagazineCarousels = () => {

    const carousels = document.querySelectorAll('.magazine-carousel');

    carousels.forEach(carousel => {

      const slides = carousel.querySelectorAll('.carousel-slide');

      const dots = carousel.querySelectorAll('.carousel-dot');

      const prevButton = carousel.querySelector('.carousel-prev');

      const nextButton = carousel.querySelector('.carousel-next');

      let currentSlide = 0;

      let carouselInterval;
 
      if (slides.length === 0) return;
 
      const showSlide = (index) => {

        slides.forEach((slide, i) => {

          slide.classList.toggle('active', i === index);

        });

        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

        currentSlide = index;

      };
 
      const nextSlide = () => {

        const nextIndex = (currentSlide + 1) % slides.length;

        showSlide(nextIndex);

      };
 
      const prevSlide = () => {

        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;

        showSlide(prevIndex);

      };
 
      const startCarousel = () => {

        carouselInterval = setInterval(nextSlide, CAROUSEL_INTERVAL);

      };
 
      const stopCarousel = () => {

        clearInterval(carouselInterval);

      };
 
      prevButton.addEventListener('click', debounce(() => {

        stopCarousel();

        prevSlide();

        startCarousel();

      }, DEBOUNCE_DELAY));
 
      nextButton.addEventListener('click', debounce(() => {

        stopCarousel();

        nextSlide();

        startCarousel();

      }, DEBOUNCE_DELAY));
 
      dots.forEach((dot, index) => {

        dot.addEventListener('click', debounce(() => {

          stopCarousel();

          showSlide(index);

          startCarousel();

        }, DEBOUNCE_DELAY));
 
        dot.addEventListener('keydown', (e) => {

          if (e.key === 'Enter' || e.key === ' ') {

            e.preventDefault();

            stopCarousel();

            showSlide(index);

            startCarousel();

          }

        });

      });

 let touchStartX = 0;

      let touchEndX = 0;
 
      carousel.addEventListener('touchstart', (e) => {

        touchStartX = e.changedTouches[0].screenX;

      });
 
      carousel.addEventListener('touchend', (e) => {

        touchEndX = e.changedTouches[0].screenX;

        if (touchEndX < touchStartX - 50) {

          stopCarousel();

          nextSlide();

          startCarousel();

        } else if (touchEndX > touchStartX + 50) {

          stopCarousel();

          prevSlide();

          startCarousel();

        }

      });
 
      carousel.addEventListener('mouseenter', stopCarousel);

      carousel.addEventListener('mouseleave', startCarousel);
 
      showSlide(currentSlide);

      startCarousel();

    });

  };
 
  // Mobile Menu Logic

  const initMobileMenu = () => {

    const toggle = document.querySelector('.mobile-menu-toggle');

    const nav = document.querySelector('.nav-container');

    const dropdowns = document.querySelectorAll('.has-dropdown');
 
    if (!toggle || !nav) return;
 
    const toggleMenu = () => {

      toggle.classList.toggle('active');

      nav.classList.toggle('active');

      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';

      toggle.setAttribute('aria-expanded', nav.classList.contains('active'));

    };
 
    toggle.addEventListener('click', debounce(toggleMenu, DEBOUNCE_DELAY));
 
    toggle.addEventListener('keydown', (e) => {

      if (e.key === 'Enter' || e.key === ' ') {

        e.preventDefault();

        toggleMenu();

      }

    });
 
    dropdowns.forEach(dropdown => {

      const link = dropdown.querySelector('a');

      link.addEventListener('click', (e) => {

        if (window.innerWidth <= 768) {

          e.preventDefault();

          dropdown.classList.toggle('active');

          const submenu = dropdown.querySelector('.dropdown-menu');

          submenu.style.display = dropdown.classList.contains('active') ? 'flex' : 'none';

        }

      });
 
      link.addEventListener('keydown', (e) => {

        if (e.key === 'Enter' || e.key === ' ') {

          e.preventDefault();

          dropdown.classList.toggle('active');

          const submenu = dropdown.querySelector('.dropdown-menu');

          submenu.style.display = dropdown.classList.contains('active') ? 'flex' : 'none';

        }

      });

    });
 
    document.addEventListener('click', (e) => {

      if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {

        toggleMenu();

      }

    });

  };
 
  // Header Scroll Effect

  const initHeaderScroll = () => {

    const header = document.querySelector('.site-header');

    let lastScroll = 0;
 
    window.addEventListener('scroll', debounce(() => {

      const currentScroll = window.pageYOffset;

      header.classList.toggle('scrolled', currentScroll > 50);

      if (currentScroll > lastScroll && currentScroll > 100) {

        header.style.transform = 'translateY(-100%)';

      } else {

        header.style.transform = 'translateY(0)';

      }

      lastScroll = currentScroll;

    }, 100));

  };
 
  // Newsletter Form Validation

  const initNewsletterForm = () => {

    const form = document.querySelector('.newsletter-form');

    if (!form) return;
 
    form.addEventListener('submit', (e) => {

      const emailInput = form.querySelector('input[type="email"]');

      const email = emailInput.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
      if (!emailRegex.test(email)) {

        e.preventDefault();

        alert('Please enter a valid email address.');

        emailInput.focus();

      }

    });

  };
 
  // Accordion Functionality

  const accordionToggles = document.querySelectorAll('.accordion-toggle');

  accordionToggles.forEach(toggle => {

    toggle.addEventListener('click', () => {

      const content = toggle.nextElementSibling;

      const isActive = toggle.classList.contains('active');
 
      accordionToggles.forEach(t => {

        t.classList.remove('active');

        t.setAttribute('aria-expanded', 'false');

        t.nextElementSibling.classList.remove('active');

      });
 
      if (!isActive) {

        toggle.classList.add('active');

        toggle.setAttribute('aria-expanded', 'true');

        content.classList.add('active');

      }

    });

  });
 
  // Image Modal

  const initImageModal = () => {

    const images = document.querySelectorAll('.highlight-card img, .thing-card img, .wedding-space img');

    const modal = document.createElement('div');

    modal.className = 'modal';

    modal.innerHTML = `
<div class="modal-content">
<img src="" alt="Enlarged image">
<p></p>
<button aria-label="Close modal">Close</button>
</div>

    `;

    document.body.appendChild(modal);
 
    const modalImg = modal.querySelector('img');

    const modalText = modal.querySelector('p');

    const closeButton = modal.querySelector('button');
 
    images.forEach(img => {

      img.style.cursor = 'pointer';

      img.addEventListener('click', () => {

        modalImg.src = img.src;

        modalText.textContent = img.alt;

        modal.classList.add('active');

        modal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

        closeButton.focus();

      });

    });
 
    const closeModal = () => {

      modal.classList.remove('active');

      modal.setAttribute('aria-hidden', 'true');

      document.body.style.overflow = '';

    };
 
    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

  };
 
  // Dog Policy Toggle

  document.querySelectorAll('.details-toggle').forEach(toggle => {

    toggle.addEventListener('click', () => {

      const details = toggle.nextElementSibling;

      details.classList.toggle('active');

      toggle.classList.toggle('active');

      toggle.setAttribute('aria-expanded', details.classList.contains('active'));

    });

  });
 
  // Initialize all

  try {

    initPreloader();

    initHeroVideo(); // ✅ new optimized video section

    initMagazineCarousels();

    initMobileMenu();

    initHeaderScroll();

    initNewsletterForm();

    initImageModal();

  } catch (error) {

    console.error('Initialization error:', error);

  }

});
 