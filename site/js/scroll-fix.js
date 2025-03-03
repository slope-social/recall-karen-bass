/**
 * Enhanced scroll handling for the Recall Karen Bass website
 * This script handles navigation, background changes, and scroll snapping
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced scroll handling initialized with mandatory snap');
    
    // Fix for iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the vh variable on page load and resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    // Track current section for background changes
    let currentSection = '';
    let isScrolling = false;
    let scrollTimeout;
    let lastScrollY = window.scrollY;
    let scrollMomentum = 0;
    let lastMomentumCheck = Date.now();
    
    // Function to update backgrounds based on current section
    function updateBackgrounds(sectionId) {
        // Reset all background states
        document.body.classList.remove('petition-in-view');
        document.body.classList.remove('volunteer-in-view');
        
        const slantedBackground = document.querySelector('.slanted-background');
        const petitionFixedBackground = document.querySelector('.petition-fixed-background');
        const volunteerFixedBackground = document.querySelector('.volunteer-fixed-background');
        
        // Reset all backgrounds
        if (slantedBackground) {
            slantedBackground.style.opacity = '1';
            slantedBackground.style.transition = 'opacity 0.7s ease';
        }
        
        if (petitionFixedBackground) {
            petitionFixedBackground.style.opacity = '0';
        }
        
        if (volunteerFixedBackground) {
            volunteerFixedBackground.style.opacity = '0';
        }
        
        // Update based on current section
        if (sectionId === 'petition') {
            if (slantedBackground) {
                slantedBackground.style.opacity = '0.2';
            }
            if (petitionFixedBackground) {
                petitionFixedBackground.style.opacity = '1';
            }
            document.body.classList.add('petition-in-view');
            console.log('Petition section in view, updated backgrounds');
        } else if (sectionId === 'volunteer') {
            if (slantedBackground) {
                slantedBackground.style.opacity = '0.2';
            }
            if (volunteerFixedBackground) {
                volunteerFixedBackground.style.opacity = '1';
            }
            document.body.classList.add('volunteer-in-view');
            console.log('Volunteer section in view, updated backgrounds');
        }
        
        // Update current section
        currentSection = sectionId;
    }
    
    // Improved scroll to section function
    function smoothScrollTo(element, updateBackground = true) {
        if (!element) return;
        
        // Disable snap during programmatic scrolling
        document.documentElement.classList.add('disable-snap');
        document.body.classList.add('disable-snap');
        
        // Get the element's position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;
        
        // Set the global isAnimating flag if it exists
        if (typeof window.isAnimating !== 'undefined') {
            window.isAnimating = true;
        }
        
        // Scroll to the element with smooth behavior
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update backgrounds if needed
        if (updateBackground && element.id) {
            updateBackgrounds(element.id);
        }
        
        // Re-enable snap after scrolling completes
        setTimeout(() => {
            document.documentElement.classList.remove('disable-snap');
            document.documentElement.classList.add('enable-snap');
            document.body.classList.add('enable-snap');
            
            // Reset the global isAnimating flag if it exists
            if (typeof window.isAnimating !== 'undefined') {
                window.isAnimating = false;
            }
            
            // After a short delay, remove the enable-snap class
            setTimeout(() => {
                document.documentElement.classList.remove('enable-snap');
                document.body.classList.remove('enable-snap');
            }, 400); // Reduced from 500ms for faster response
        }, 600); // Reduced from 800ms for faster response
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
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    smoothScrollTo(targetElement);
                }, 50); // Reduced from 100ms for faster response
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
    
    // Initial background update based on current position
    function updateInitialBackground() {
        // Find which section is most visible
        const sections = document.querySelectorAll('.section');
        let mostVisibleSection = null;
        let maxVisibility = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the section is visible
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibilityRatio = visibleHeight / rect.height;
            
            if (visibilityRatio > maxVisibility) {
                maxVisibility = visibilityRatio;
                mostVisibleSection = section;
            }
        });
        
        // Update backgrounds for the most visible section
        if (mostVisibleSection && mostVisibleSection.id) {
            updateBackgrounds(mostVisibleSection.id);
        }
    }
    
    // Call initial background update
    updateInitialBackground();
    
    // Apply initial enable-snap class to make snapping stronger on page load
    document.documentElement.classList.add('enable-snap');
    document.body.classList.add('enable-snap');
    
    // Remove after a short delay
    setTimeout(() => {
        document.documentElement.classList.remove('enable-snap');
        document.body.classList.remove('enable-snap');
    }, 1000);
    
    // Monitor scroll position to update backgrounds and handle snapping
    window.addEventListener('scroll', function() {
        // Don't process if we're already handling a programmatic scroll
        if (typeof window.isAnimating !== 'undefined' && window.isAnimating) return;
        
        // Calculate scroll momentum (how fast user is scrolling)
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        scrollMomentum = scrollMomentum * 0.7 + scrollDelta * 0.3; // Adjusted weights for faster response
        lastScrollY = currentScrollY;
        
        // Temporarily disable snap during active scrolling
        if (!isScrolling) {
            isScrolling = true;
            document.documentElement.classList.add('disable-snap');
            document.body.classList.remove('enable-snap');
        }
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Find which section is most visible
        const sections = document.querySelectorAll('.section');
        let mostVisibleSection = null;
        let maxVisibility = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the section is visible
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibilityRatio = visibleHeight / rect.height;
            
            if (visibilityRatio > maxVisibility) {
                maxVisibility = visibilityRatio;
                mostVisibleSection = section;
            }
        });
        
        // Update backgrounds if we have a new most visible section
        if (mostVisibleSection && mostVisibleSection.id !== currentSection) {
            updateBackgrounds(mostVisibleSection.id);
        }
        
        // Check momentum more frequently
        const now = Date.now();
        if (now - lastMomentumCheck > 50) { // Check every 50ms
            lastMomentumCheck = now;
            
            // If momentum is low enough, enable snapping immediately
            if (scrollMomentum < 2) { // Lower threshold (was 3)
                checkAndEnableSnap(mostVisibleSection);
                return; // Exit early if we've enabled snap
            }
        }
        
        // Re-enable snap after scrolling stops
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            
            // Only enable snap if momentum is low (user has almost stopped scrolling)
            if (scrollMomentum < 2) { // Lower threshold for more responsive snapping
                checkAndEnableSnap(mostVisibleSection);
            } else {
                // If momentum is still high, check again shortly
                scrollTimeout = setTimeout(() => {
                    if (scrollMomentum < 2) {
                        checkAndEnableSnap(mostVisibleSection);
                    }
                }, 50); // Reduced from 100ms for faster response
            }
        }, 80); // Reduced from 120ms for faster response
    }, { passive: true });
    
    // Helper function to check section position and enable snap
    function checkAndEnableSnap(section) {
        if (!section) return;
        
        document.documentElement.classList.remove('disable-snap');
        document.documentElement.classList.add('enable-snap');
        document.body.classList.add('enable-snap');
        
        const rect = section.getBoundingClientRect();
        // More aggressive threshold - snap if within 30% of viewport height (was 25%)
        if (Math.abs(rect.top) < window.innerHeight * 0.3) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Remove enable-snap class after snapping completes
        setTimeout(() => {
            document.documentElement.classList.remove('enable-snap');
            document.body.classList.remove('enable-snap');
        }, 400); // Reduced from 500ms
    }
}); 