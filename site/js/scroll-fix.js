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
            document.body.classList.remove('disable-snap');
            
            // Reset the global isAnimating flag if it exists
            if (typeof window.isAnimating !== 'undefined') {
                window.isAnimating = false;
            }
        }, 1000);
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
    
    // Monitor scroll position to update backgrounds and handle snapping
    window.addEventListener('scroll', function() {
        // Don't process if we're already handling a programmatic scroll
        if (typeof window.isAnimating !== 'undefined' && window.isAnimating) return;
        
        // Temporarily disable snap during active scrolling
        if (!isScrolling) {
            isScrolling = true;
            document.documentElement.classList.add('disable-snap');
            document.body.classList.add('disable-snap');
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
        
        // Re-enable snap after scrolling stops
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            document.documentElement.classList.remove('disable-snap');
            document.body.classList.remove('disable-snap');
            
            // Snap to the most visible section
            if (mostVisibleSection) {
                const rect = mostVisibleSection.getBoundingClientRect();
                // Only snap if we're close to the section (within 20% of viewport height)
                if (Math.abs(rect.top) < window.innerHeight * 0.2) {
                    mostVisibleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 150);
    }, { passive: true });
}); 