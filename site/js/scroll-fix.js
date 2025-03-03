/**
 * Improved scroll handling for the Recall Karen Bass website
 * This script fixes scroll snapping issues on mobile and desktop
 */

document.addEventListener('DOMContentLoaded', function() {
    // Track if we're in the middle of a programmatic scroll
    let isScrolling = false;
    // Track if we're coming from a hash change (direct link to section)
    let initialLoad = window.location.hash ? true : false;
    
    // Sections that need scroll handling
    const sections = document.querySelectorAll('.section');
    
    // Temporarily disable observers when navigating via hash
    const disableScrollHandlingTemporarily = () => {
        initialLoad = true;
        setTimeout(() => initialLoad = false, 1000);
    };
    
    // Handle hash changes (direct links to sections)
    if (initialLoad) {
        disableScrollHandlingTemporarily();
    }
    
    window.addEventListener('hashchange', disableScrollHandlingTemporarily);
    
    // Create an intersection observer to handle section visibility
    const observer = new IntersectionObserver((entries) => {
        // Skip if we're in the middle of a programmatic scroll or initial load
        if (isScrolling || initialLoad) return;
        
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                console.log(`${entry.target.id} section is intersecting with ratio: ${entry.intersectionRatio}`);
                
                // Prevent scroll event handling while we're programmatically scrolling
                isScrolling = true;
                
                // Smooth scroll to the section
                entry.target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Reset scroll handling after animation completes
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
                
                // Update URL hash without triggering a scroll (for bookmarking)
                if (entry.target.id) {
                    history.replaceState(null, null, `#${entry.target.id}`);
                }
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: [0.1, 0.5, 0.9] // Check at multiple thresholds for smoother detection
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        // Skip if we're in the middle of a programmatic scroll
        if (isScrolling || initialLoad) return;
        
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const currentSectionIndex = getCurrentSectionIndex();
        if (currentSectionIndex === -1) return;
        
        const swipeDistance = touchStartY - touchEndY;
        const threshold = 50; // Minimum swipe distance to trigger navigation
        
        if (Math.abs(swipeDistance) < threshold) return;
        
        isScrolling = true;
        
        if (swipeDistance > 0 && currentSectionIndex < sections.length - 1) {
            // Swipe up - go to next section
            sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (swipeDistance < 0 && currentSectionIndex > 0) {
            // Swipe down - go to previous section
            sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    function getCurrentSectionIndex() {
        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            // If the section is mostly visible in the viewport
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                return i;
            }
        }
        return -1;
    }
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Skip if we're in the middle of a programmatic scroll
        if (isScrolling || initialLoad) return;
        
        const currentSectionIndex = getCurrentSectionIndex();
        if (currentSectionIndex === -1) return;
        
        isScrolling = true;
        
        if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSectionIndex < sections.length - 1) {
            // Down arrow - go to next section
            e.preventDefault();
            sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSectionIndex > 0) {
            // Up arrow - go to previous section
            e.preventDefault();
            sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });
    
    // Fix for iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the vh variable on page load and resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
}); 