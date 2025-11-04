document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality
    const modal = document.getElementById('roomModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');

    const roomDetails = {
        'classic': {
            title: 'Classic Room',
            details: '250 sqft | 1 Double Bed or 2 Single Beds<br>Cozy and elegant room with free WiFi, private bathroom, flat-screen TV, tea/coffee maker, safe, and dog-friendly option. Non-smoking.'
        },
        'superior': {
            title: 'Superior Room',
            details: '300 sqft | 1 King Bed<br>Spacious room with countryside views, free WiFi, private bathroom, flat-screen TV, tea/coffee maker, safe, mini fridge, and dog-friendly option. Non-smoking.'
        },
        'deluxe': {
            title: 'Deluxe Room',
            details: '350 sqft | 1 King Bed<br>Luxurious room with seating area, free WiFi, private bathroom, flat-screen TV, tea/coffee maker, safe, bathrobe, slippers, and dog-friendly option. Non-smoking.'
        },
        'suite': {
            title: 'Junior Suite',
            details: '450 sqft | 1 King Bed<br>Elegant suite with separate living area, free WiFi, private bathroom, flat-screen TV, tea/coffee maker, safe, mini bar, bathrobe, slippers, and dog-friendly option. Non-smoking.'
        }
    };

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const room = button.getAttribute('data-room');
            modalTitle.textContent = roomDetails[room].title;
            modalDetails.innerHTML = roomDetails[room].details;
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

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            roomCards.forEach(card => {
                const type = card.getAttribute('data-type');
                if (filter === 'all' || type === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
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