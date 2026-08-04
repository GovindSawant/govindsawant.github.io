/**
 * Portfolio Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       THEME TOGGLING (Dark / Light Mode)
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check local storage for saved theme
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        body.classList.replace('light-theme', 'dark-theme');
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            // Switch to Dark Theme
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to Light Theme
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
            localStorage.setItem('theme', 'light');
        }
    });

    /* =========================================
       SCROLL ANIMATIONS (Intersection Observer)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger CSS animation
                entry.target.classList.add('visible');
                // Unobserve so it only animates once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the reveal classes
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    // Start observing each element
    animatedElements.forEach(el => observer.observe(el));

    /* =========================================
       3D TILT EFFECT ON CARDS
       ========================================= */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none'; // remove transition for smooth tracking
            card.style.zIndex = '10'; // pop out
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            card.style.zIndex = '1';
        });
    });
});