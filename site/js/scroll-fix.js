/**
 * Improved scroll handling for the Recall Karen Bass website
 * This script enhances the existing scroll behavior without replacing it
 */

document.addEventListener('DOMContentLoaded', function() {
    // Flag to track if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Add a class to the body for mobile-specific CSS
    if (isMobile) {
        document.body.classList.add('is-mobile-device');
    }
    
    // Fix for iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the vh variable on page load and resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    // Debounce helper function to prevent rapid firing of events
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Track scroll state
    let isScrolling = false;
    let lastScrollTime = Date.now();
    
    // Handle hash changes for anchor links on both desktop and mobile
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            // Use a small timeout to ensure the DOM is ready
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    // Prevent scroll handling during programmatic scrolling
                    disableScrollHandlingTemporarily();
                    
                    // Use the existing scrollToSection function if available
                    if (typeof window.scrollToSection === 'function') {
                        window.scrollToSection(hash.substring(1));
                    } else {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 100);
        }
    }
    
    // Temporarily disable scroll handling during programmatic scrolls
    function disableScrollHandlingTemporarily() {
        if (isScrolling) return;
        
        isScrolling = true;
        document.documentElement.classList.add('disable-snap');
        lastScrollTime = Date.now();
        
        setTimeout(() => {
            isScrolling = false;
            document.documentElement.classList.remove('disable-snap');
        }, 1000);
    }
    
    // Handle initial hash on page load
    if (window.location.hash) {
        handleHashChange();
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Add a scroll event listener to prevent scroll-fighting on desktop
    if (!isMobile) {
        // Use a debounced scroll handler to reduce scroll-fighting
        const debouncedScrollHandler = debounce(() => {
            // Only handle scroll if we're not already in a programmatic scroll
            if (isScrolling || Date.now() - lastScrollTime < 500) return;
            
            // Find the section closest to the viewport center
            const sections = document.querySelectorAll('.section');
            let closestSection = null;
            let closestDistance = Infinity;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            });
            
            // Only snap if we're close enough to a section (within 20% of viewport height)
            if (closestSection && closestDistance < window.innerHeight * 0.2) {
                disableScrollHandlingTemporarily();
                
                // Use the existing scrollToSection function if available
                if (typeof window.scrollToSection === 'function') {
                    window.scrollToSection(closestSection.id);
                } else {
                    closestSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 200); // 200ms debounce
        
        window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    }
    
    // Only add these enhancements for mobile devices
    if (isMobile) {
        // Add a helper class to disable scroll snap on mobile
        document.documentElement.classList.add('mobile-scroll');
        
        // Track touch events for better swipe detection
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Get all sections for navigation
        const sections = document.querySelectorAll('.section');
        const sectionIds = Array.from(sections).map(section => section.id);
        
        // Helper function to find the current section
        function getCurrentSectionIndex() {
            // Find which section is most visible in the viewport
            let maxVisibleSection = null;
            let maxVisibleRatio = 0;
            let maxIndex = -1;
            
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Calculate how much of the section is visible
                const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                const sectionHeight = rect.height;
                const visibleRatio = visibleHeight / sectionHeight;
                
                if (visibleRatio > maxVisibleRatio) {
                    maxVisibleRatio = visibleRatio;
                    maxVisibleSection = section;
                    maxIndex = index;
                }
            });
            
            return maxIndex;
        }
        
        // Enhanced touch handling for mobile
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (isScrolling || Date.now() - lastScrollTime < 500) return;
            
            touchEndY = e.changedTouches[0].clientY;
            touchEndX = e.changedTouches[0].clientX;
            
            // Calculate swipe distance and direction
            const swipeDistanceY = touchStartY - touchEndY;
            const swipeDistanceX = touchStartX - touchEndX;
            
            // Only handle vertical swipes (ignore horizontal swipes)
            if (Math.abs(swipeDistanceY) < 50 || Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
                return;
            }
            
            const currentIndex = getCurrentSectionIndex();
            if (currentIndex === -1) return;
            
            let targetIndex;
            
            if (swipeDistanceY > 0) {
                // Swipe up - go to next section
                targetIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                // Swipe down - go to previous section
                targetIndex = Math.max(currentIndex - 1, 0);
            }
            
            if (targetIndex !== currentIndex) {
                disableScrollHandlingTemporarily();
                
                // Use the existing scrollToSection function from main.js if available
                if (typeof window.scrollToSection === 'function') {
                    window.scrollToSection(sectionIds[targetIndex]);
                } else {
                    // Fallback to standard scrollIntoView
                    sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, { passive: true });
        
        // Double-tap detection to help with "stuck" scrolling
        let lastTapTime = 0;
        
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTapTime;
            
            // If it's a double-tap (tap within 300ms of last tap)
            if (tapLength < 300 && tapLength > 0) {
                // Get the current section
                const currentIndex = getCurrentSectionIndex();
                if (currentIndex === -1) return;
                
                // Determine direction based on where the tap occurred on the screen
                const tapY = e.changedTouches[0].clientY;
                const windowHeight = window.innerHeight;
                
                let targetIndex;
                
                if (tapY < windowHeight / 2) {
                    // Tap on top half - go to previous section
                    targetIndex = Math.max(currentIndex - 1, 0);
                } else {
                    // Tap on bottom half - go to next section
                    targetIndex = Math.min(currentIndex + 1, sections.length - 1);
                }
                
                if (targetIndex !== currentIndex) {
                    disableScrollHandlingTemporarily();
                    
                    // Use the existing scrollToSection function from main.js if available
                    if (typeof window.scrollToSection === 'function') {
                        window.scrollToSection(sectionIds[targetIndex]);
                    } else {
                        // Fallback to standard scrollIntoView
                        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                e.preventDefault();
            }
            
            lastTapTime = currentTime;
        }, { passive: false });
    }
    
    // Make scrollToSection available globally for other scripts
    // Only define it if it doesn't already exist to avoid conflicts
    if (typeof window.scrollToSection !== 'function') {
        window.scrollToSection = function(sectionId) {
            const section = document.getElementById(sectionId);
            if (!section) return;
            
            // Temporarily disable scroll snapping during the animation
            document.documentElement.classList.add('disable-snap');
            
            // Smooth scroll to the section
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Re-enable scroll snapping after animation completes
            setTimeout(() => {
                document.documentElement.classList.remove('disable-snap');
            }, 1000);
        };
    }
}); 