/**
 * Simple scroll handling for the Recall Karen Bass website
 * This script completely disables all scroll snapping and lets the browser handle scrolling naturally
 */

document.addEventListener('DOMContentLoaded', function() {
    // Completely disable all scroll snapping
    document.documentElement.style.scrollSnapType = 'none';
    document.body.style.scrollSnapType = 'none';
    
    // Add classes to disable scroll snapping
    document.documentElement.classList.add('disable-snap');
    document.body.classList.add('disable-snap');
    
    // Add mobile class if needed
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768) {
        document.body.classList.add('is-mobile-device');
        document.documentElement.classList.add('mobile-scroll');
    }
    
    // Fix for iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the vh variable on page load and resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    // Simple smooth scroll function for navigation links
    function smoothScrollTo(element) {
        if (!element) return;
        
        // Get the element's position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;
        
        // Scroll to the element with smooth behavior
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Handle clicks on navigation buttons
    const navButtons = document.querySelectorAll('[data-target]');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
    
    // Handle hash changes for anchor links
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                setTimeout(() => {
                    smoothScrollTo(targetElement);
                }, 100);
            }
        }
    }
    
    // Handle initial hash on page load
    if (window.location.hash) {
        handleHashChange();
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Override the existing scrollToSection function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            smoothScrollTo(section);
        }
    };
    
    // Disable any existing scroll event listeners from main.js
    const oldAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
        if (type === 'scroll') {
            // Don't add scroll event listeners
            return;
        }
        oldAddEventListener.call(window, type, listener, options);
    };
}); 