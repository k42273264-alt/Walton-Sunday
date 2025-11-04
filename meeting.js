document.addEventListener('DOMContentLoaded', () => {
  // Table Filtering
  const roomTypeFilter = document.getElementById('roomTypeFilter');
  const floorFilter = document.getElementById('floorFilter');
  const tableRows = document.querySelectorAll('.meeting-table tbody tr');

  function filterTable() {
    const roomType = roomTypeFilter.value;
    const floor = floorFilter.value;

    tableRows.forEach(row => {
      const rowRoomType = row.getAttribute('data-room-type');
      const rowFloor = row.getAttribute('data-floor');
      const matchesRoomType = roomType === 'all' || (rowRoomType && rowRoomType.includes(roomType));
      const matchesFloor = floor === 'all' || rowFloor === floor;

      row.style.display = matchesRoomType && matchesFloor ? '' : 'none';
    });
  }

  roomTypeFilter.addEventListener('change', filterTable);
  floorFilter.addEventListener('change', filterTable);

  // Package Toggle Functionality
  const detailsToggles = document.querySelectorAll('.details-toggle');
  detailsToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const details = toggle.nextElementSibling;
      const isActive = toggle.classList.contains('active');

      detailsToggles.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('active');
      });

      if (!isActive) {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        details.classList.add('active');
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
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));

  // Parallax Hero
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = `${offset * 0.7}px`;
  });
});