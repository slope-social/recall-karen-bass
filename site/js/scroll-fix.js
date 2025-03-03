/**
 * Simple scroll handling for the Recall Karen Bass website
 * This script provides basic smooth scrolling without any snapping
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fix for iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the vh variable on page load and resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    // Add classes to completely disable scroll snapping
    document.documentElement.classList.add('disable-snap');
    document.body.classList.add('disable-snap');
    
    // Flag to track if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Add a class to the body for mobile-specific CSS
    if (isMobile) {
        document.body.classList.add('is-mobile-device');
        document.documentElement.classList.add('mobile-scroll');
    }
    
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
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Get all sections
        const sections = document.querySelectorAll('.section');
        const sectionArray = Array.from(sections);
        
        // Find the section closest to the viewport center
        let closestSection = null;
        let closestDistance = Infinity;
        let closestIndex = -1;
        
        sectionArray.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
                closestIndex = index;
            }
        });
        
        // Navigate based on key press
        let targetSection = null;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            if (closestIndex < sectionArray.length - 1) {
                targetSection = sectionArray[closestIndex + 1];
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            if (closestIndex > 0) {
                targetSection = sectionArray[closestIndex - 1];
            }
        } else {
            return; // Not a navigation key
        }
        
        if (targetSection) {
            e.preventDefault();
            smoothScrollTo(targetSection);
        }
    });
    
    // Make scrollToSection available globally for other scripts
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            smoothScrollTo(section);
        }
    };
}); 