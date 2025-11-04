document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality
    const modal = document.getElementById('attractionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');

    const attractionDetails = {
        'stratford': {
            title: 'Stratford-upon-Avon',
            details: 'Just 20 minutes from Walton Hall, immerse yourself in Shakespeare’s world with historic houses, the Royal Shakespeare Theatre, and scenic Avon River cruises. Dog-friendly parks and cafes abound.'
        },
        'warwick': {
            title: 'Warwick Castle',
            details: 'A 15-minute drive away, explore this 1,000-year-old castle with live trebuchet firings, medieval dungeons, and stunning grounds. Perfect for families and history lovers.'
        },
        'cotswolds': {
            title: 'The Cotswolds',
            details: 'Within easy reach, discover picturesque villages like Chipping Campden and Broadway. Enjoy quaint tea rooms, antique shops, and peaceful dog-friendly walking trails.'
        }
    };

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const attraction = button.getAttribute('data-attraction');
            modalTitle.textContent = attractionDetails[attraction].title;
            modalDetails.textContent = attractionDetails[attraction].details;
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