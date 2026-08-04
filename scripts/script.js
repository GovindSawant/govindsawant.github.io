/**
 * Portfolio Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
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