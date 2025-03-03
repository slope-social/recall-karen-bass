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
    
    // Only add these enhancements for mobile devices
    if (isMobile) {
        // Add a helper class to disable scroll snap on mobile
        document.documentElement.classList.add('mobile-scroll');
        
        // Track touch events for better swipe detection
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        let isScrolling = false;
        
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
        
        // Temporarily disable scroll handling during programmatic scrolls
        function disableScrollHandlingTemporarily() {
            if (isScrolling) return;
            
            isScrolling = true;
            document.documentElement.classList.add('disable-snap');
            
            setTimeout(() => {
                isScrolling = false;
                document.documentElement.classList.remove('disable-snap');
            }, 1000);
        }
        
        // Enhanced touch handling for mobile
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (isScrolling) return;
            
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
    window.scrollToSection = window.scrollToSection || function(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        section.scrollIntoView({ behavior: 'smooth' });
    };
}); 