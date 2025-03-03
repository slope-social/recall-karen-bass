/**
 * Enhanced scroll handling for the Recall Karen Bass website
 * This script handles navigation and background changes without scroll snapping
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced scroll handling initialized');
    
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
        } else if (sectionId === 'volunteer') {
            if (slantedBackground) {
                slantedBackground.style.opacity = '0.2';
            }
            if (volunteerFixedBackground) {
                volunteerFixedBackground.style.opacity = '1';
            }
            document.body.classList.add('volunteer-in-view');
        }
        
        // Update current section
        currentSection = sectionId;
    }
    
    // Improved scroll to section function
    function smoothScrollTo(element, updateBackground = true) {
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
        
        // Update backgrounds if needed
        if (updateBackground && element.id) {
            updateBackgrounds(element.id);
        }
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
    
    // Monitor scroll position to update backgrounds
    window.addEventListener('scroll', function() {
        // Don't process if we're already handling a programmatic scroll
        if (window.isAnimating) return;
        
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
    }, { passive: true });
}); 