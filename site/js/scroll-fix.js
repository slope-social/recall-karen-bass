/**
 * Improved scroll handling for the Recall Karen Bass website
 * This script works with the existing scroll handling in main.js
 */

document.addEventListener('DOMContentLoaded', function() {
    // Flag to track if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Add a class to the body for mobile-specific CSS
    if (isMobile) {
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
    
    // Variables to track scroll state
    let isScrolling = false;
    let scrollTimeout;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDirection = null;
    
    // Completely disable scroll snapping by default
    document.documentElement.classList.add('disable-snap');
    document.body.classList.add('disable-snap');
    
    // Track scroll momentum
    let scrollMomentum = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    
    // Handle scroll events with momentum detection
    window.addEventListener('scroll', function() {
        // Calculate scroll speed (momentum)
        const currentScrollY = window.scrollY;
        const currentTime = Date.now();
        const deltaY = Math.abs(currentScrollY - lastScrollY);
        const deltaTime = currentTime - lastScrollTime;
        
        // Only calculate momentum if we have a valid time difference
        if (deltaTime > 0) {
            scrollMomentum = deltaY / deltaTime;
        }
        
        // Update last values
        lastScrollY = currentScrollY;
        lastScrollTime = currentTime;
        
        // Determine scroll direction
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop;
        
        // Always disable snap during active scrolling
        if (!isScrolling) {
            isScrolling = true;
            document.documentElement.classList.add('disable-snap');
            document.body.classList.add('disable-snap');
        }
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a new timeout to detect when scrolling stops
        scrollTimeout = setTimeout(function() {
            // Only enable snap when momentum is very low (scrolling has almost stopped)
            if (scrollMomentum < 0.05) {
                isScrolling = false;
                
                // Find the section closest to the viewport center
                const sections = document.querySelectorAll('.section');
                let closestSection = null;
                let closestDistance = Infinity;
                
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const distance = Math.abs(rect.top);
                    
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = section;
                    }
                });
                
                // Only snap if we're very close to a section (within 15% of viewport height)
                if (closestSection && closestDistance < window.innerHeight * 0.15) {
                    // Temporarily remove disable-snap to allow the snap to happen
                    document.documentElement.classList.remove('disable-snap');
                    document.body.classList.remove('disable-snap');
                    
                    // Smooth scroll to the section
                    if (typeof window.scrollToSection === 'function') {
                        window.scrollToSection(closestSection.id);
                    } else {
                        closestSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Re-disable snap after the animation completes
                    setTimeout(function() {
                        document.documentElement.classList.add('disable-snap');
                        document.body.classList.add('disable-snap');
                    }, 1000);
                }
            } else {
                // If momentum is still high, check again after a short delay
                setTimeout(function() {
                    // Reset momentum to a low value to allow snapping on the next check
                    scrollMomentum = 0;
                }, 300);
            }
        }, 100);
    }, { passive: true });
    
    // Handle clicks on navigation buttons
    const navButtons = document.querySelectorAll('[data-target]');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            // Use the existing scrollToSection function if available
            if (typeof window.scrollToSection === 'function') {
                window.scrollToSection(targetId);
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
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
                    // Use the existing scrollToSection function if available
                    if (typeof window.scrollToSection === 'function') {
                        window.scrollToSection(hash.substring(1));
                    } else {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
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
}); 