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

    // Select all elements with the 'animate-on-scroll' class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Start observing each element
    animatedElements.forEach(el => observer.observe(el));
});