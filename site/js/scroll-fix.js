/**
 * Minimal scroll handling for the Recall Karen Bass website
 * This script only handles basic navigation without any scroll snapping
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
    
    // Handle clicks on navigation buttons
    const navButtons = document.querySelectorAll('[data-target]');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Simple scroll to element
                const rect = targetElement.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = rect.top + scrollTop;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto'
                });
            }
        });
    });
    
    // Override the existing scrollToSection function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Simple scroll to element
            const rect = section.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'
            });
        }
    };
}); 