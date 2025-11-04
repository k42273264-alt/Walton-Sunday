document.addEventListener('DOMContentLoaded', () => {

  // Modal Functionality

  const modal = document.getElementById('roomModal');

  const modalTitle = document.getElementById('modalTitle');

  const modalDetails = document.getElementById('modalDetails');

  const closeModal = document.querySelector('.modal-close');
 
  const roomDetails = {

    'CourtyardSuite': {

      details: 'The Courtyard Suite is a luxurious and versatile venue, perfect for Christenings, Proms, private dinners, and celebrations of life, accommodating up to 150 guests with a private terrace, two 10ft screens, and high-speed Wi-Fi.'

    },

    'DirectorsSuite': {

      details: 'Located on the ground floor, the Directors Suite is ideal for intimate private dinners or small gatherings, with a capacity of up to 14 guests and a licensed setup.'

    },

    'LawnsTipis': {

      details: 'Set in our expansive 65-acre grounds, Lawns Tipis offer a unique outdoor setting for events, accommodating up to 200 guests with flexible setups and scenic views.'

    },

    'VictorianGardens': {

      details: 'The Victorian Gardens provide a charming outdoor venue for events, with a capacity of up to 150 guests, perfect for bespoke outdoor celebrations.'

    },

    'ConservatoryBar': {

      details: 'The Conservatory Bar is a stylish ground-floor venue, ideal for casual events or receptions, accommodating up to 100 guests with a licensed setup.'

    },

    'CourtyardSuiteExclusive': {

      details: 'Exclusively hired, the Courtyard Suite is a spacious and elegant venue with a private terrace, two 10ft screens, natural daylight, disabled access, air conditioning, and high-speed Wi-Fi, perfect for gala dinners and private celebrations.'

    }

  };
 
  document.querySelectorAll('.details-btn').forEach(button => {

    button.addEventListener('click', () => {

      const room = button.getAttribute('data-room');

      modalTitle.textContent = room === 'CourtyardSuiteExclusive' ? 'Courtyard Suite Exclusive Hire' : room.replace(/([A-Z])/g, ' $1').trim();

      modalDetails.textContent = roomDetails[room].details;

      modal.classList.add('active');

    });

  });
 
  closeModal.addEventListener('click', () => {

    modal.classList.remove('active');

  });
 
  modal.addEventListener('click', (e) => {

    if (e.target === modal) {

      modal.classList.remove('active');

    }

  });
 
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
 