/**
 * Enhanced scroll handling for the Recall Karen Bass website
 * This script handles navigation, background changes, and aggressive scroll snapping
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced scroll handling initialized with aggressive snap');
    
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
    let lastScrollTime = 0;
    const scrollCooldown = 400; // ms to wait before allowing another snap (reduced from 500ms)
    
    // Flag to track if user is interacting with a form
    let isInteractingWithForm = false;
    
    // Add event listeners to detect form interaction
    const formInputs = document.querySelectorAll('input, textarea, select');
    const formToggles = document.querySelectorAll('.form-toggle');
    
    // Make sure form toggles work properly
    formToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Prevent scroll snapping temporarily after toggle click
            isInteractingWithForm = true;
            
            // Reset after a short delay to allow the form to expand/collapse
            setTimeout(() => {
                isInteractingWithForm = false;
            }, 500);
        });
    });
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            isInteractingWithForm = true;
            // Disable snap during form interaction
            document.documentElement.classList.add('disable-snap');
            document.body.classList.add('disable-snap');
        });
        
        input.addEventListener('blur', function() {
            isInteractingWithForm = false;
            // Re-enable snap after form interaction ends
            setTimeout(() => {
                document.documentElement.classList.remove('disable-snap');
                document.body.classList.remove('disable-snap');
            }, 500);
        });
        
        // Prevent scroll events from bubbling when interacting with forms on touch devices
        input.addEventListener('touchstart', function(e) {
            // Only set the flag if we're directly interacting with the input
            if (e.target === input) {
                isInteractingWithForm = true;
            }
        }, { passive: false });
        
        input.addEventListener('touchend', function(e) {
            // Only keep the flag true if we're directly interacting with the input
            if (e.target === input) {
                // Keep the flag true for a short period to prevent immediate snap
                setTimeout(() => {
                    isInteractingWithForm = false;
                }, 1000);
            }
        }, { passive: false });
    });
    
    // Function to update backgrounds based on current section
    function updateBackgrounds(sectionId) {
        // Reset all background states
        document.body.classList.remove('petition-in-view');
        document.body.classList.remove('volunteer-in-view');
        document.body.classList.remove('contact-in-view');
        
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
        } else if (sectionId === 'contact') {
            document.body.classList.add('contact-in-view');
            console.log('Contact section in view, hiding scroll helper');
        }
        
        // Update current section
        currentSection = sectionId;
    }
    
    // Improved scroll to section function with more aggressive snapping
    function smoothScrollTo(element, updateBackground = true) {
        if (!element) return;
        
        // Temporarily disable snap during programmatic scrolling
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
        
        // Update last scroll time
        lastScrollTime = Date.now();
        
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
        }, 500); // Reduced from 600ms for faster re-enabling of snap
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
    
    // Function to find the nearest section
    function findNearestSection() {
        const sections = document.querySelectorAll('.section');
        let nearestSection = null;
        let minDistance = Infinity;
        
        // Check regular sections
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestSection = section;
            }
        });
        
        return { section: nearestSection, distance: minDistance };
    }
    
    // More aggressive snap function
    function snapToNearestSection() {
        // Don't snap if we're in a cooldown period
        if (Date.now() - lastScrollTime < scrollCooldown) return;
        
        const { section, distance } = findNearestSection();
        
        // Only snap if we're close enough to a section - increased threshold for more aggressive snapping
        if (section && distance < window.innerHeight * 0.45) {
            // Update last scroll time
            lastScrollTime = Date.now();
            
            // Temporarily disable snap during programmatic scrolling
            document.documentElement.classList.add('disable-snap');
            document.body.classList.add('disable-snap');
            
            // Snap to the section
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update backgrounds if it's a regular section
            if (section.id && section.id !== currentSection) {
                updateBackgrounds(section.id);
            }
            
            // Re-enable snap after scrolling completes
            setTimeout(() => {
                document.documentElement.classList.remove('disable-snap');
                document.body.classList.remove('disable-snap');
            }, 500);
        }
    }
    
    // Monitor scroll position to update backgrounds and handle snapping
    window.addEventListener('scroll', function() {
        // Don't process if we're already handling a programmatic scroll
        if (typeof window.isAnimating !== 'undefined' && window.isAnimating) return;
        
        // Don't snap if user is interacting with a form
        if (isInteractingWithForm) return;
        
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
        
        // Re-enable snap after scrolling stops and snap to nearest section
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            document.documentElement.classList.remove('disable-snap');
            document.body.classList.remove('disable-snap');
            
            // Use more aggressive snapping
            snapToNearestSection();
        }, 60); // Shorter timeout for more responsive snapping (reduced from 80ms)
    }, { passive: true });
    
    // Add wheel event listener for more responsive snapping
    window.addEventListener('wheel', function(e) {
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a new timeout for when scrolling stops
        scrollTimeout = setTimeout(function() {
            // Use more aggressive snapping
            snapToNearestSection();
        }, 60); // Shorter timeout (reduced from 80ms)
    }, { passive: true });
    
    // Listen for footer toggle events
    document.addEventListener('footerToggled', function() {
        // IMPORTANT: We need to prevent any scroll snapping during the entire process
        // This flag will be used to prevent snap scrolling for a longer period
        window.preventSnapScrolling = true;
        
        // First, capture the current scroll position and section BEFORE any changes
        const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine which section we're currently in
        const sections = document.querySelectorAll('.section');
        let currentSection = null;
        let bestVisibility = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the section is visible in the viewport
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibilityRatio = visibleHeight / section.offsetHeight;
            
            if (visibilityRatio > bestVisibility) {
                bestVisibility = visibilityRatio;
                currentSection = section;
            }
        });
        
        // Store the section ID and its relative position in the viewport
        const currentSectionId = currentSection ? currentSection.id : null;
        const isContactSection = currentSectionId === 'contact';
        
        // Calculate the relative position of the section in the viewport
        // This will help us maintain the same relative position after the footer toggle
        let sectionRelativePosition = 0;
        if (currentSection) {
            const rect = currentSection.getBoundingClientRect();
            sectionRelativePosition = rect.top / window.innerHeight;
        }
        
        // Disable scroll snapping and animations
        document.documentElement.classList.add('disable-snap');
        document.body.classList.add('disable-snap');
        
        // Temporarily disable scrolling to prevent any automatic browser adjustments
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        
        // Update the vh variable
        setVhVariable();
        
        // Wait for the footer animation to complete
        setTimeout(function() {
            // For mobile devices, we need special handling
            if (window.innerWidth <= 768) {
                // Restore scrolling
                document.body.style.overflow = originalOverflow;
                
                // Force a complete layout recalculation
                document.body.style.opacity = '0.99';
                void document.body.offsetHeight; // Force reflow
                document.body.style.opacity = '';
                
                if (currentSection && !isContactSection) {
                    // Calculate the new position of the section
                    const newRect = currentSection.getBoundingClientRect();
                    
                    // Calculate the new scroll position that would maintain the same relative position
                    const targetPosition = window.pageYOffset + newRect.top - (sectionRelativePosition * window.innerHeight);
                    
                    // Scroll directly to the calculated position
                    window.scrollTo(0, targetPosition);
                } else if (isContactSection) {
                    // For contact section, just restore the original scroll position
                    window.scrollTo(0, initialScrollTop);
                }
                
                // Keep snap scrolling disabled for a longer period on mobile
                setTimeout(function() {
                    document.documentElement.classList.remove('disable-snap');
                    document.body.classList.remove('disable-snap');
                    window.preventSnapScrolling = false;
                }, 1000); // Keep snap disabled for 1 second after scrolling
            } else {
                // For desktop, just restore settings and original scroll position
                document.body.style.overflow = originalOverflow;
                window.scrollTo(0, initialScrollTop);
                
                // Re-enable snap after a delay
                setTimeout(function() {
                    document.documentElement.classList.remove('disable-snap');
                    document.body.classList.remove('disable-snap');
                    window.preventSnapScrolling = false;
                }, 500);
            }
        }, 500); // Wait for footer animation to complete
    });
    
    // Modify the snapToNearestSection function to respect the preventSnapScrolling flag
    const originalSnapToNearestSection = snapToNearestSection;
    snapToNearestSection = function() {
        if (window.preventSnapScrolling) {
            return; // Skip snapping if we're in a prevention period
        }
        originalSnapToNearestSection();
    };
}); 