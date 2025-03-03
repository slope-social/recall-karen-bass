/**
 * Minimal scroll handling for the Recall Karen Bass website
 * This script only handles navigation without interfering with scroll snapping
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Minimal scroll handling initialized');
    
    // Fix for iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the vh variable on page load and resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    // Simple navigation function
    function navigateToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Temporarily disable snap during navigation
        document.documentElement.classList.add('disable-snap');
        
        // Get the element's position
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;
        
        // Scroll to the element
        window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
        });
        
        // Re-enable snap after navigation completes
        setTimeout(() => {
            document.documentElement.classList.remove('disable-snap');
        }, 100);
    }
    
    // Handle clicks on navigation buttons
    const navButtons = document.querySelectorAll('[data-target]');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            navigateToSection(targetId);
        });
    });
    
    // Override the existing scrollToSection function
    window.scrollToSection = navigateToSection;
    
    // Handle hash changes for anchor links
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const targetId = hash.substring(1);
            navigateToSection(targetId);
        }
    }
    
    // Handle initial hash on page load
    if (window.location.hash) {
        setTimeout(handleHashChange, 100);
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
}); 