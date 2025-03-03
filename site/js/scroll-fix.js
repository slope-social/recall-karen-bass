/**
 * Balanced scroll handling for the Recall Karen Bass website
 * This script provides smooth navigation while allowing scroll snapping
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Balanced scroll handling initialized');
    
    // Fix for iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the vh variable on page load and resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    // Track if we're currently navigating
    let isNavigating = false;
    
    // Improved navigation scrolling function
    function navigateToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Set navigating flag
        isNavigating = true;
        
        // Temporarily disable scroll snapping during navigation
        document.documentElement.classList.add('disable-snap');
        document.body.classList.add('disable-snap');
        
        // Get the element's position
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;
        
        // Use requestAnimationFrame for smoother scrolling
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 500; // Shorter duration for quicker navigation
        let startTime = null;
        
        function easeOutQuad(t) {
            return t * (2 - t);
        }
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeOutQuad(progress);
            
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure we're exactly at the target position
                window.scrollTo(0, targetPosition);
                
                // Re-enable scroll snapping after navigation completes
                setTimeout(() => {
                    document.documentElement.classList.remove('disable-snap');
                    document.body.classList.remove('disable-snap');
                    isNavigating = false;
                    console.log('Scroll snapping re-enabled');
                }, 100);
            }
        }
        
        window.requestAnimationFrame(step);
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
        if (isNavigating) return; // Avoid duplicate navigation
        
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
    
    // Add a scroll event listener to detect when scrolling stops
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Don't interfere if we're navigating programmatically
        if (isNavigating) return;
        
        // Temporarily disable snapping during active scrolling
        document.documentElement.classList.add('disable-snap');
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a new timeout to re-enable snapping when scrolling stops
        scrollTimeout = setTimeout(function() {
            // Re-enable snapping
            document.documentElement.classList.remove('disable-snap');
        }, 150); // Short delay to allow for momentum scrolling to finish
    }, { passive: true });
}); 