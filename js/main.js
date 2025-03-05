// Global variables
let isAnimating = false;
let debugMode = true; // Enable debug mode
let recallText = 'Recall Bass Now';

// App Script URLs for form submissions - Update these with your deployed web app URLs
const appScriptUrls = {
  petition: 'https://script.google.com/macros/s/AKfycbylkLZb3ZaKCZVJF7qCofM9bHwbOIGUGazHnsGTcb5wtLO2aAoGdky6Ar8hnHndDO9ALg/exec', // Sign_the_Petition script
  volunteer: 'https://script.google.com/macros/s/AKfycbwm_RGrFNRV4rPVEOyeHzafrv2QpyZMN5BRjTD5Jmq8EW3BYvCwHI6vpe7lTkTG5KV0/exec', // Volunteer script
  contact: 'https://script.google.com/macros/s/AKfycbz4Qu6DxeOuCGwVe_pdurr3Z44Sq7bZVE4fA8Yo8_gcWbDCsyPSuI5J5FBBbNcmDwmS/exec' // Contact_Us script
};

// Debug logging function
function debugLog(message, data) {
  if (debugMode) {
    if (data) {
      console.log(`[DEBUG] ${message}`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
}

// Function to detect Android device
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  if (debugMode) {
    debugLog('Page loaded');
    debugLog('User Agent:', navigator.userAgent);
    debugLog('Platform:', navigator.platform);
    debugLog('Is Android:', isAndroid());
    debugLog('Window Width:', window.innerWidth);
    debugLog('Window Height:', window.innerHeight);
  }
  
  // Add Android-specific class to body if needed
  if (isAndroid()) {
    document.body.classList.add('android-device');
    debugLog('Added android-device class to body');
  }
  
  // Initialize background images
  initBackgroundImages();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize intersection observers for animations
  initIntersectionObservers();
  
  // Initialize accordion functionality
  initAccordions();
  
  // Initialize form validation and submission
  initForms();
  
  // Initialize privacy policy and cookie banner
  initPrivacyPolicyAndCookies();
  
  // Initialize expandable forms for mobile
  initExpandableForms();
  
  // Add this new function call
  initScrollHelper();
});

// Background Images Functionality
function initBackgroundImages() {
  console.log('Starting initBackgroundImages function');
  
  const slantedBackground = document.querySelector('.slanted-background');
  const imageContainer = document.querySelector('.image-container');
  const images = Array.from(document.querySelectorAll('.image'));
  
  // Debug function to help troubleshoot
  function debugElements() {
    console.log('Debug elements:');
    console.log('- slantedBackground:', slantedBackground);
    console.log('- imageContainer:', imageContainer);
    console.log('- images:', images);
  }

  // Make sure we have all the elements we need
  if (!slantedBackground || !imageContainer || images.length !== 3) {
    console.error('Missing required elements for slanted background');
    debugElements();
    return;
  }

  // Set explicit styles to ensure interaction works
  slantedBackground.style.pointerEvents = 'auto';
  imageContainer.style.pointerEvents = 'auto';
  images.forEach(image => {
    image.style.pointerEvents = 'auto';
  });
  
  let activeImageIndex = -1;
  let resetTimeout = null;
  
  // Function to determine which third of the container the cursor is in
  function checkCursorPosition(clientX) {
    const rect = slantedBackground.getBoundingClientRect();
    const relativeX = (clientX - rect.left) / rect.width;
    
    if (relativeX < 0.4) {
      return 0; // First image (left) - 40%
    } else if (relativeX < 0.77) {
      return 1; // Second image (middle) - 37%
    } else {
      return 2; // Third image (right) - 23%
    }
  }
  
  // Function to activate the image at the given index
  function activateImage(index) {
    // If we're already showing this image, do nothing
    // This prevents resetting the timer when hovering over the same image
    if (index === activeImageIndex && index !== -1) {
      return;
    }
    
    // Skip activation completely for the middle image (index 1)
    if (index === 1) {
      return;
    }
    
    // Clear any existing timeout
    if (resetTimeout) {
      clearTimeout(resetTimeout);
      resetTimeout = null;
    }
    
    // Reset all images to default
    if (index === -1) {
      imageContainer.classList.remove('has-hover');
      images.forEach(image => {
        image.classList.remove('active');
      });
      activeImageIndex = -1;
      return;
    }
    
    // Add active class to the selected image and remove from others
    imageContainer.classList.add('has-hover');
    images.forEach((image, i) => {
      // Special case: When the third image is active, also make the first image active
      if (i === index || (index === 2 && i === 0)) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
    
    activeImageIndex = index;
    
    // Set a timeout to reset the images after delay
    // This will run regardless of whether the cursor is still over the image
    resetTimeout = setTimeout(() => {
      activateImage(-1);
    }, 1500); // Increased from 500ms to 1500ms for a more appropriate delay
  }
  
  // Track the current section to prevent continuous triggering
  let currentSection = -1;
  
  // Direct event listener on the document to track all mouse movements
  document.addEventListener('mousemove', (e) => {
    // Check if the cursor is over the slanted background
    if (slantedBackground) {
      const rect = slantedBackground.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const index = checkCursorPosition(e.clientX);
        // Only activate if we've moved to a different section
        if (index !== currentSection) {
          currentSection = index;
          activateImage(index);
        }
      } else {
        // Reset current section when mouse leaves the slanted background
        currentSection = -1;
      }
    }
  });
  
  // Direct event listeners on each image
  images.forEach((image, index) => {
    image.addEventListener('mouseenter', () => {
      // Only activate if we've moved to a different section
      if (index !== currentSection) {
        currentSection = index;
        activateImage(index);
      }
    });
    
    // Add mouseleave to reset current section
    image.addEventListener('mouseleave', () => {
      // Don't reset the currentSection here as it might interfere with mousemove
      // The mousemove handler will update it appropriately
    });
  });
  
  // Touch events on the slanted background
  slantedBackground.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const index = checkCursorPosition(touch.clientX);
      // Only activate if we've moved to a different section
      if (index !== currentSection) {
        currentSection = index;
        activateImage(index);
      }
    }
  }, { passive: false });
  
  slantedBackground.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const index = checkCursorPosition(touch.clientX);
      // Only activate if we've moved to a different section
      if (index !== currentSection) {
        currentSection = index;
        activateImage(index);
      }
    }
  }, { passive: false });
  
  slantedBackground.addEventListener('touchend', () => {
    // Reset current section when touch ends
    currentSection = -1;
    // Don't reset immediately on touch end, let the timeout handle it
  });
  
  // Brief test sequence on load
  setTimeout(() => {
    // Quick test of each image
    activateImage(0);
    setTimeout(() => {
      activateImage(-1);
    }, 500);
  }, 500);
}

// Navigation Functionality
function initNavigation() {
  const mobileMenuButton = document.querySelector('.nav-mobile-menu');
  const mobileMenu = document.querySelector('.nav-mobile');
  const navLinks = document.querySelectorAll('.nav-links button, .nav-mobile-link');
  const menuIconSpans = document.querySelectorAll('.nav-menu-icon span');
  
  // Set initial styles for menu icon spans
  if (menuIconSpans.length === 3) {
    // Apply initial CSS for transition
    menuIconSpans.forEach((span, index) => {
      span.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    });
  }
  
  // Toggle mobile menu
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isActive = mobileMenu.classList.contains('active');
      
      // Toggle classes
      mobileMenu.classList.toggle('active');
      mobileMenuButton.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Transform the menu icon into an X or back to hamburger
      if (menuIconSpans.length === 3) {
        if (!isActive) {
          // Transform to X
          menuIconSpans[0].style.transform = "translateY(0.7rem) rotate(45deg)";
          menuIconSpans[1].style.opacity = "0";
          menuIconSpans[2].style.transform = "translateY(-0.7rem) rotate(-45deg)";
        } else {
          // Reset to hamburger
          menuIconSpans[0].style.transform = "none";
          menuIconSpans[1].style.opacity = "1";
          menuIconSpans[2].style.transform = "none";
        }
      }
    });
  }
  
  // Smooth scroll to sections
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        scrollToSection(targetId);
        
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          mobileMenuButton.classList.remove('active');
          document.body.classList.remove('menu-open');
          
          // Reset menu icon to hamburger
          if (menuIconSpans.length === 3) {
            menuIconSpans[0].style.transform = "none";
            menuIconSpans[1].style.opacity = "1";
            menuIconSpans[2].style.transform = "none";
          }
        }
      }
    });
  });
}

// Scroll to section helper function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  // Set the animation flag to prevent other scroll handlers
  window.isAnimating = true;
  
  // Temporarily disable snap during programmatic scrolling
  document.documentElement.classList.add('disable-snap');
  document.body.classList.add('disable-snap');
  
  // Get the position of the section
  const rect = section.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;
  
  // Simple smooth scroll
  window.scrollTo({
    top: absoluteTop,
    behavior: 'smooth'
  });
  
  // Reset the animation flag after scrolling completes
  setTimeout(() => {
    window.isAnimating = false;
    
    // Re-enable snap after scrolling completes
    document.documentElement.classList.remove('disable-snap');
    document.body.classList.remove('disable-snap');
  }, 500); // Reduced from 600ms for faster re-enabling of snap
}

// Intersection Observer for animations
function initIntersectionObservers() {
  // Completely disabled to prevent scroll issues
  console.log('IntersectionObserver functionality disabled to prevent scroll issues');
  
  // Add basic visibility for all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('in-view');
    section.style.opacity = '1';
    section.style.transform = 'none';
  });
  
  // Show backgrounds
  const petitionFixedBackground = document.querySelector('.petition-fixed-background');
  const volunteerFixedBackground = document.querySelector('.volunteer-fixed-background');
  
  if (petitionFixedBackground) {
    petitionFixedBackground.style.opacity = '1';
  }
  
  if (volunteerFixedBackground) {
    volunteerFixedBackground.style.opacity = '1';
  }
}

// Accordion functionality
function initAccordions() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const accordionItem = trigger.closest('.accordion-item');
      const content = trigger.nextElementSibling;
      
      // Toggle this accordion item
      accordionItem.classList.toggle('open');
      content.classList.toggle('active');
      
      // Optional: close other accordion items
      // const siblingItems = document.querySelectorAll('.accordion-item.open');
      // siblingItems.forEach(item => {
      //   if (item !== accordionItem) {
      //     item.classList.remove('open');
      //     item.querySelector('.accordion-content').classList.remove('active');
      //   }
      // });
    });
  });
}

// Function to add touch event debugging to an element
function addTouchEventDebugging(element) {
  element.addEventListener('touchstart', function(e) {
    debugLog('touchstart event', {
      target: e.target,
      tagName: e.target.tagName,
      className: e.target.className,
      touches: e.touches.length,
      timestamp: new Date().getTime()
    });
  }, { passive: true });
  
  element.addEventListener('touchmove', function(e) {
    debugLog('touchmove event', {
      target: e.target,
      tagName: e.target.tagName,
      className: e.target.className,
      touches: e.touches.length,
      timestamp: new Date().getTime()
    });
  }, { passive: true });
  
  element.addEventListener('touchend', function(e) {
    debugLog('touchend event', {
      target: e.target,
      tagName: e.target.tagName,
      className: e.target.className,
      touches: e.touches.length,
      timestamp: new Date().getTime()
    });
  }, { passive: true });
}

// Form validation and submission
function initForms() {
  const petitionForm = document.getElementById('petition-form');
  const volunteerForm = document.getElementById('volunteer-form');
  const contactForm = document.getElementById('contact-form');
  
  debugLog('Initializing forms');
  debugLog('petitionForm:', petitionForm);
  debugLog('volunteerForm:', volunteerForm);
  debugLog('contactForm:', contactForm);
  
  // Add touch event debugging to forms
  if (petitionForm) addTouchEventDebugging(petitionForm);
  if (volunteerForm) addTouchEventDebugging(volunteerForm);
  if (contactForm) addTouchEventDebugging(contactForm);
  
  // Add touch event debugging to form toggle buttons
  const petitionToggle = document.getElementById('petition-form-toggle');
  const volunteerToggle = document.getElementById('volunteer-form-toggle');
  if (petitionToggle) addTouchEventDebugging(petitionToggle);
  if (volunteerToggle) addTouchEventDebugging(volunteerToggle);
  
  // Function to prevent form closing when interacting with form fields
  function preventFormClosing(e) {
    // Log the event for debugging
    debugLog('preventFormClosing called', {
      type: e.type,
      target: e.target,
      tagName: e.target.tagName,
      className: e.target.className
    });
    
    // Prevent the event from bubbling up to document click handler
    e.stopPropagation();
  }
  
  if (petitionForm) {
    petitionForm.addEventListener('submit', handlePetitionSubmit);
    
    // Add event listeners to all form elements to prevent form closing
    petitionForm.querySelectorAll('input, textarea, select, label').forEach(element => {
      element.addEventListener('click', preventFormClosing);
      element.addEventListener('touchstart', preventFormClosing, { passive: false });
      element.addEventListener('touchend', preventFormClosing, { passive: false });
      
      // Add focus event monitoring
      element.addEventListener('focus', function(e) {
        debugLog('Form element focused', {
          type: e.type,
          target: e.target,
          tagName: e.target.tagName,
          className: e.target.className,
          formExpanded: petitionForm.classList.contains('expanded')
        });
      });
    });
  }
  
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', handleVolunteerSubmit);
    
    // Add event listeners to all form elements to prevent form closing
    volunteerForm.querySelectorAll('input, textarea, select, label').forEach(element => {
      element.addEventListener('click', preventFormClosing);
      element.addEventListener('touchstart', preventFormClosing, { passive: false });
      element.addEventListener('touchend', preventFormClosing, { passive: false });
      
      // Add focus event monitoring
      element.addEventListener('focus', function(e) {
        debugLog('Form element focused', {
          type: e.type,
          target: e.target,
          tagName: e.target.tagName,
          className: e.target.className,
          formExpanded: volunteerForm.classList.contains('expanded')
        });
      });
    });
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Add event listeners to all form elements to prevent form closing
    contactForm.querySelectorAll('input, textarea, select, label').forEach(element => {
      element.addEventListener('click', preventFormClosing);
      element.addEventListener('touchstart', preventFormClosing, { passive: false });
      element.addEventListener('touchend', preventFormClosing, { passive: false });
      
      // Add focus event monitoring
      element.addEventListener('focus', function(e) {
        debugLog('Form element focused', {
          type: e.type,
          target: e.target,
          tagName: e.target.tagName,
          className: e.target.className
        });
      });
    });
  }
  
  // Add input validation listeners
  const formInputs = document.querySelectorAll('.form-input');
  formInputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', clearError);
  });
}

// Validate individual input
function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  const name = input.name;
  const errorElement = input.nextElementSibling;
  
  if (!value && input.hasAttribute('required')) {
    showError(input, errorElement, 'This field is required');
    return false;
  }
  
  if (name === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(input, errorElement, 'Please enter a valid email address');
      return false;
    }
  }
  
  if (name === 'phone' && value) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      showError(input, errorElement, 'Please enter a valid 10-digit phone number');
      return false;
    }
  }
  
  if (name === 'zip' && value) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(value)) {
      showError(input, errorElement, 'Please enter a valid ZIP code');
      return false;
    }
  }
  
  return true;
}

// Clear error on input
function clearError(e) {
  const input = e.target;
  const errorElement = input.nextElementSibling;
  
  if (errorElement && errorElement.classList.contains('form-message')) {
    errorElement.textContent = '';
    input.classList.remove('error');
  }
}

// Show error message
function showError(input, errorElement, message) {
  if (errorElement && errorElement.classList.contains('form-message')) {
    errorElement.textContent = message;
    input.classList.add('error');
  }
}

// Replace the submitToGoogleForm function with this new function
function submitToAppScript(formData, appScriptUrl, successMessage, errorMessage, submitButton, originalButtonText) {
  // Prepare the request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
    mode: 'no-cors' // Use no-cors mode for Google Apps Script
  };
  
  console.log('Submitting to:', appScriptUrl);
  console.log('Form data:', formData);
  
  // Send the request to the App Script endpoint
  return fetch(appScriptUrl, options)
    .then(response => {
      console.log('Response status:', response.status);
      
      // With no-cors mode, we won't get a proper response
      // The response will have status 0 and type 'opaque'
      if (response.type === 'opaque' || response.status === 0) {
        console.log('Received opaque response due to CORS - assuming success');
        return { status: 'success' };
      }
      
      // If we get here, we're not in no-cors mode
      if (response.ok) {
        return response.json().catch(() => {
          return { status: 'success' };
        });
      }
      
      throw new Error(`HTTP error! Status: ${response.status}`);
    })
    .then(data => {
      // Reset the submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
      
      // Show success message
      showToast('Success', successMessage);
      
      return data;
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      
      // Reset the submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
      
      // Show error message
      showToast('Error', errorMessage, 'error');
      
      throw error;
    });
}

// Replace the getGoogleFormFieldId function with this empty function (no longer needed)
function getGoogleFormFieldId(fieldName, formUrl) {
  // This function is no longer used with App Script integration
  // We're keeping it as a placeholder to avoid breaking existing code
  return '';
}

// Update the handlePetitionSubmit function
function handlePetitionSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Process checkbox fields that might not be in the FormData if unchecked
  // Removed isRegisteredVoter checkbox as it's no longer in the form
  
  // Validate all inputs
  let isValid = true;
  form.querySelectorAll('.form-input').forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    return;
  }
  
  // Disable form during submission
  const submitButton = form.querySelector('.form-submit');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  
  // App Script URL for petition form
  const appScriptUrl = appScriptUrls.petition;
  
  // Custom submission handler for petition form
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    mode: 'no-cors' // Use no-cors mode for Google Apps Script
  };
  
  console.log('Submitting to:', appScriptUrl);
  console.log('Form data:', data);
  
  // Send the request to the App Script endpoint
  fetch(appScriptUrl, options)
    .then(response => {
      console.log('Response status:', response.status);
      
      // Reset the submit button
      submitButton.disabled = false;
      submitButton.textContent = recallText;
      
      // Reset form on success
      form.reset();
      
      // Show the thank you modal
      showThankYouPetitionModal();
    })
    .catch(error => {
      console.error('Error submitting petition:', error);
      
      // Reset the submit button
      submitButton.disabled = false;
      submitButton.textContent = recallText;
      
      // Show error message
      showToast('Error', 'There was a problem submitting your petition. Please try again.', 'error');
    });
}

// Update the handleVolunteerSubmit function
function handleVolunteerSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Process checkbox fields that might not be in the FormData if unchecked
  const checkboxFields = [
    'phoneBank',
    'gatherSignatures',
    'attendEvents',
    'hostEvent',
    'knockDoors',
    'endorseRecall'
  ];
  
  // Add checkbox values to data object
  checkboxFields.forEach(field => {
    if (!data[field]) {
      data[field] = false;
    } else {
      data[field] = true;
    }
  });
  
  // Validate all inputs
  let isValid = true;
  form.querySelectorAll('.form-input').forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    return;
  }
  
  // Disable form during submission
  const submitButton = form.querySelector('.form-submit');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  
  // App Script URL for volunteer form
  const appScriptUrl = appScriptUrls.volunteer;
  
  // Submit to App Script
  submitToAppScript(
    data,
    appScriptUrl,
    'Thank you for volunteering.',
    'There was a problem submitting your volunteer form. Please try again.',
    submitButton,
    'Volunteer'
  )
    .then(() => {
      // Reset form on success
      form.reset();
      console.log('Volunteer form data:', data);
    })
    .catch(error => {
      console.error('Error submitting volunteer form:', error);
    });
}

// Update the handleContactSubmit function
function handleContactSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Validate all inputs
  let isValid = true;
  form.querySelectorAll('.form-input').forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    return;
  }
  
  // Disable form during submission
  const submitButton = form.querySelector('.form-submit');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  
  // App Script URL for contact form
  const appScriptUrl = appScriptUrls.contact;
  
  // Submit to App Script
  submitToAppScript(
    data,
    appScriptUrl,
    'Thank you for your message. We will get back to you soon.',
    'There was a problem sending your message. Please try again.',
    submitButton,
    'Send Message'
  )
    .then(() => {
      // Reset form on success
      form.reset();
      console.log('Contact form data:', data);
    })
    .catch(error => {
      console.error('Error submitting contact form:', error);
    });
}

// Toast notification system
function showToast(title, message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const toastTitle = document.createElement('div');
  toastTitle.className = 'toast-title';
  toastTitle.textContent = title;
  
  const toastDescription = document.createElement('div');
  toastDescription.className = 'toast-description';
  toastDescription.textContent = message;
  
  toast.appendChild(toastTitle);
  toast.appendChild(toastDescription);
  toastContainer.appendChild(toast);
  
  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
      toastContainer.removeChild(toast);
      
      // Remove container if empty
      if (toastContainer.children.length === 0) {
        document.body.removeChild(toastContainer);
      }
    }, 300);
  }, 5000);
}

// Privacy Policy Modal and Cookie Banner Functionality
function initPrivacyPolicyAndCookies() {
  const privacyPolicyModal = document.getElementById('privacyPolicyModal');
  const closePrivacyPolicy = document.getElementById('closePrivacyPolicy');
  const cookiePolicyModal = document.getElementById('cookiePolicyModal');
  const closeCookiePolicy = document.getElementById('closeCookiePolicy');
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  const viewCookiePolicyBtn = document.getElementById('viewCookiePolicy');
  const privacyPolicyLink = document.getElementById('privacyPolicyLink');
  const cookiePolicyLink = document.getElementById('cookiePolicyLink');
  
  // Check if elements exist
  if (!privacyPolicyModal || !closePrivacyPolicy || !cookieBanner || 
      !acceptCookiesBtn || !viewCookiePolicyBtn) {
    console.error('Missing required elements for privacy policy or cookie banner');
    return;
  }
  
  // Function to open privacy policy modal
  function openPrivacyPolicy() {
    privacyPolicyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    setTimeout(() => {
      privacyPolicyModal.style.opacity = '1';
    }, 10);
  }
  
  // Function to close privacy policy modal
  function closePrivacyPolicyModal() {
    privacyPolicyModal.style.opacity = '0';
    setTimeout(() => {
      privacyPolicyModal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
    }, 300);
  }
  
  // Function to open cookie policy modal
  function openCookiePolicy() {
    cookiePolicyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    setTimeout(() => {
      cookiePolicyModal.style.opacity = '1';
    }, 10);
  }
  
  // Function to close cookie policy modal
  function closeCookiePolicyModal() {
    cookiePolicyModal.style.opacity = '0';
    setTimeout(() => {
      cookiePolicyModal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
    }, 300);
  }
  
  // Function to accept cookies and hide banner
  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.opacity = '0';
    setTimeout(() => {
      cookieBanner.style.display = 'none';
    }, 300);
  }
  
  // Check if cookies have been accepted before
  function checkCookieConsent() {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
      cookieBanner.style.display = 'none';
    } else {
      cookieBanner.style.display = 'flex';
      setTimeout(() => {
        cookieBanner.style.opacity = '1';
      }, 1000); // Show banner after 1 second
      
      // Auto-accept cookies after 5 seconds if user doesn't interact
      setTimeout(() => {
        if (localStorage.getItem('cookiesAccepted') !== 'true') {
          acceptCookies();
        }
      }, 5000);
    }
  }
  
  // Event listeners
  closePrivacyPolicy.addEventListener('click', closePrivacyPolicyModal);
  if (closeCookiePolicy) {
    closeCookiePolicy.addEventListener('click', closeCookiePolicyModal);
  }
  acceptCookiesBtn.addEventListener('click', acceptCookies);
  viewCookiePolicyBtn.addEventListener('click', openCookiePolicy);
  
  // Footer links
  if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyPolicy();
    });
  }
  
  if (cookiePolicyLink) {
    cookiePolicyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openCookiePolicy();
    });
  }
  
  // Close modals when clicking outside
  privacyPolicyModal.addEventListener('click', (e) => {
    if (e.target === privacyPolicyModal) {
      closePrivacyPolicyModal();
    }
  });
  
  if (cookiePolicyModal) {
    cookiePolicyModal.addEventListener('click', (e) => {
      if (e.target === cookiePolicyModal) {
        closeCookiePolicyModal();
      }
    });
  }
  
  // Check cookie consent on page load
  checkCookieConsent();
}

// Initialize expandable forms for mobile
function initExpandableForms() {
  const petitionToggle = document.getElementById('petition-form-toggle');
  const volunteerToggle = document.getElementById('volunteer-form-toggle');
  const petitionForm = document.getElementById('petition-form');
  const volunteerForm = document.getElementById('volunteer-form');
  const petitionTextOverlay = document.querySelector('.petition-text-overlay');
  const volunteerHeading = document.querySelector('#volunteer .heading-2');
  const volunteerText = document.querySelector('#volunteer .text-body');
  const petitionToggleText = document.querySelector('#petition-form-toggle .form-toggle-text');
  const volunteerToggleText = document.querySelector('#volunteer-form-toggle .form-toggle-text');
  
  debugLog('Initializing expandable forms');
  debugLog('petitionToggle:', petitionToggle);
  debugLog('volunteerToggle:', volunteerToggle);
  debugLog('petitionForm:', petitionForm);
  debugLog('volunteerForm:', volunteerForm);
  
  // Special flag to track if we're handling a toggle button click
  let isHandlingToggleClick = false;
  
  // Flag to track if we're interacting with a form field
  let isInteractingWithFormField = false;
  
  // Function to handle form visibility based on screen size
  function handleFormVisibility() {
    const isMobile = window.innerWidth <= 768;
    debugLog('handleFormVisibility called', { isMobile });
    
    if (!isMobile) {
      // If not mobile, make sure forms are visible and elements are shown
      if (petitionForm) petitionForm.classList.add('expanded');
      if (volunteerForm) volunteerForm.classList.add('expanded');
      if (petitionTextOverlay) petitionTextOverlay.style.display = '';
      if (volunteerHeading) volunteerHeading.style.display = '';
      if (volunteerText) volunteerText.style.display = '';
      if (petitionToggle) petitionToggle.classList.remove('active');
      if (volunteerToggle) volunteerToggle.classList.remove('active');
    } else {
      // If mobile, ensure forms are collapsed by default
      if (petitionForm) petitionForm.classList.remove('expanded');
      if (volunteerForm) volunteerForm.classList.remove('expanded');
      if (petitionTextOverlay) petitionTextOverlay.style.display = '';
      if (volunteerHeading) volunteerHeading.style.display = '';
      if (volunteerText) volunteerText.style.display = '';
      if (petitionToggle) petitionToggle.classList.remove('active');
      if (volunteerToggle) volunteerToggle.classList.remove('active');
      if (petitionToggleText) petitionToggleText.textContent = recallText;
      if (volunteerToggleText) volunteerToggleText.textContent = 'Volunteer Now';
    }
  }
  
  // Initial setup based on current screen size
  handleFormVisibility();
  
  // Listen for window resize events
  window.addEventListener('resize', handleFormVisibility);
  
  // Add direct event handlers to the form containers
  if (petitionForm) {
    petitionForm.addEventListener('click', function(e) {
      debugLog('Petition form container clicked', { target: e.target, tagName: e.target.tagName });
      e.stopPropagation(); // Stop event from reaching document
      
      // Ensure the form stays expanded
      if (!petitionForm.classList.contains('expanded')) {
        debugLog('Re-expanding petition form after container click');
        petitionForm.classList.add('expanded');
        petitionToggle.classList.add('active');
        if (petitionToggleText) petitionToggleText.textContent = recallText;
        if (petitionTextOverlay) petitionTextOverlay.style.display = 'none';
      }
    }, true); // Use capture phase
    
    // Also handle touchstart events on the form container
    petitionForm.addEventListener('touchstart', function(e) {
      debugLog('Petition form container touchstart', { target: e.target, tagName: e.target.tagName });
      isInteractingWithFormField = true;
      
      // Reset the flag after a delay
      setTimeout(() => {
        isInteractingWithFormField = false;
      }, 500);
    }, { passive: false, capture: true });
    
    // Add event listeners to individual form fields
    const petitionFormFields = petitionForm.querySelectorAll('input, textarea, select, label, .form-input, .form-label');
    petitionFormFields.forEach(field => {
      field.addEventListener('click', function(e) {
        debugLog('Petition form field clicked', { target: e.target, tagName: e.target.tagName });
        isInteractingWithFormField = true;
        e.stopPropagation(); // Stop event from reaching document
        
        // Ensure the form stays expanded
        if (!petitionForm.classList.contains('expanded')) {
          debugLog('Re-expanding petition form after field click');
          petitionForm.classList.add('expanded');
          petitionToggle.classList.add('active');
          if (petitionToggleText) petitionToggleText.textContent = recallText;
          if (petitionTextOverlay) petitionTextOverlay.style.display = 'none';
        }
        
        // Reset the flag after a delay
        setTimeout(() => {
          isInteractingWithFormField = false;
        }, 500);
      }, true); // Use capture phase
      
      // Also handle touchstart events
      field.addEventListener('touchstart', function(e) {
        debugLog('Petition form field touchstart', { target: e.target, tagName: e.target.tagName });
        isInteractingWithFormField = true;
        e.stopPropagation(); // Stop event from reaching document
      }, { passive: false, capture: true });
    });
  }
  
  if (volunteerForm) {
    volunteerForm.addEventListener('click', function(e) {
      debugLog('Volunteer form container clicked', { target: e.target, tagName: e.target.tagName });
      e.stopPropagation(); // Stop event from reaching document
      
      // Ensure the form stays expanded
      if (!volunteerForm.classList.contains('expanded')) {
        debugLog('Re-expanding volunteer form after container click');
        volunteerForm.classList.add('expanded');
        volunteerToggle.classList.add('active');
        if (volunteerToggleText) volunteerToggleText.textContent = 'Join Our Movement';
        if (volunteerHeading) volunteerHeading.style.display = 'none';
        if (volunteerText) volunteerText.style.display = 'none';
      }
    }, true); // Use capture phase
    
    // Also handle touchstart events on the form container
    volunteerForm.addEventListener('touchstart', function(e) {
      debugLog('Volunteer form container touchstart', { target: e.target, tagName: e.target.tagName });
      isInteractingWithFormField = true;
      
      // Reset the flag after a delay
      setTimeout(() => {
        isInteractingWithFormField = false;
      }, 500);
    }, { passive: false, capture: true });
    
    // Add event listeners to individual form fields
    const volunteerFormFields = volunteerForm.querySelectorAll('input, textarea, select, label, .form-input, .form-label');
    volunteerFormFields.forEach(field => {
      field.addEventListener('click', function(e) {
        debugLog('Volunteer form field clicked', { target: e.target, tagName: e.target.tagName });
        isInteractingWithFormField = true;
        e.stopPropagation(); // Stop event from reaching document
        
        // Ensure the form stays expanded
        if (!volunteerForm.classList.contains('expanded')) {
          debugLog('Re-expanding volunteer form after field click');
          volunteerForm.classList.add('expanded');
          volunteerToggle.classList.add('active');
          if (volunteerToggleText) volunteerToggleText.textContent = 'Join Our Movement';
          if (volunteerHeading) volunteerHeading.style.display = 'none';
          if (volunteerText) volunteerText.style.display = 'none';
        }
        
        // Reset the flag after a delay
        setTimeout(() => {
          isInteractingWithFormField = false;
        }, 500);
      }, true); // Use capture phase
      
      // Also handle touchstart events
      field.addEventListener('touchstart', function(e) {
        debugLog('Volunteer form field touchstart', { target: e.target, tagName: e.target.tagName });
        isInteractingWithFormField = true;
        e.stopPropagation(); // Stop event from reaching document
      }, { passive: false, capture: true });
    });
  }
  
  // Close forms when clicking outside (only on mobile)
  document.addEventListener('click', function(event) {
    // Log the document click event for debugging
    debugLog('Document click event', {
      target: event.target,
      tagName: event.target.tagName,
      className: event.target.className,
      isHandlingToggleClick: isHandlingToggleClick,
      isInteractingWithFormField: isInteractingWithFormField,
      petitionFormExpanded: petitionForm ? petitionForm.classList.contains('expanded') : false,
      volunteerFormExpanded: volunteerForm ? volunteerForm.classList.contains('expanded') : false,
      isMobile: window.innerWidth <= 768
    });
    
    // Skip if not mobile
    if (window.innerWidth > 768) {
      debugLog('Skipping document click handler - not mobile');
      return;
    }
    
    // Skip if we're handling a toggle button click
    if (isHandlingToggleClick) {
      debugLog('Skipping document click handler - handling toggle click');
      return;
    }
    
    // Skip if we're interacting with a form field
    if (isInteractingWithFormField) {
      debugLog('Skipping document click handler - interacting with form field');
      return;
    }
    
    // Skip if the click is on a form input or label (prevent form closing when interacting with form fields)
    if (event.target.tagName === 'INPUT' || 
        event.target.tagName === 'TEXTAREA' || 
        event.target.tagName === 'SELECT' || 
        event.target.tagName === 'LABEL' ||
        event.target.classList.contains('form-input') ||
        event.target.classList.contains('form-label')) {
      debugLog('Skipping document click handler - click on form element');
      return;
    }
    
    // Check if click is outside petition form
    if (petitionForm && petitionForm.classList.contains('expanded')) {
      if (!petitionForm.contains(event.target) && event.target !== petitionToggle && !petitionToggle.contains(event.target)) {
        petitionForm.classList.remove('expanded');
        petitionToggle.classList.remove('active');
        if (petitionToggleText) petitionToggleText.textContent = recallText;
        if (petitionTextOverlay) petitionTextOverlay.style.display = '';
      }
    }
    
    // Check if click is outside volunteer form
    if (volunteerForm && volunteerForm.classList.contains('expanded')) {
      if (!volunteerForm.contains(event.target) && event.target !== volunteerToggle && !volunteerToggle.contains(event.target)) {
        volunteerForm.classList.remove('expanded');
        volunteerToggle.classList.remove('active');
        if (volunteerToggleText) volunteerToggleText.textContent = 'Volunteer Now';
        if (volunteerHeading) volunteerHeading.style.display = '';
        if (volunteerText) volunteerText.style.display = '';
      }
    }
  });
  
  // Toggle petition form
  if (petitionToggle && petitionForm) {
    // Ensure the toggle button has proper z-index and is clickable
    petitionToggle.style.position = 'relative';
    petitionToggle.style.zIndex = '10';
    
    petitionToggle.addEventListener('click', function(event) {
      // Log the toggle button click for debugging
      debugLog('Petition toggle button clicked', {
        target: event.target,
        tagName: event.target.tagName,
        className: event.target.className,
        formExpanded: petitionForm.classList.contains('expanded')
      });
      
      // Set flag to prevent document click handler from closing the form
      isHandlingToggleClick = true;
      debugLog('Set isHandlingToggleClick to true');
      
      // Prevent any default behavior
      event.preventDefault();
      event.stopPropagation();
      
      // Toggle classes
      petitionToggle.classList.toggle('active');
      petitionForm.classList.toggle('expanded');
      
      // Log the form state after toggling
      debugLog('Petition form toggled', {
        formExpanded: petitionForm.classList.contains('expanded'),
        toggleActive: petitionToggle.classList.contains('active')
      });
      
      // Change text and toggle visibility of elements
      if (petitionForm.classList.contains('expanded')) {
        if (petitionToggleText) petitionToggleText.textContent = recallText;
        if (petitionTextOverlay) petitionTextOverlay.style.display = 'none';
      } else {
        if (petitionToggleText) petitionToggleText.textContent = recallText;
        if (petitionTextOverlay) petitionTextOverlay.style.display = '';
      }
      
      // If opening this form, close the other one
      if (petitionForm.classList.contains('expanded') && volunteerForm && volunteerForm.classList.contains('expanded')) {
        volunteerToggle.classList.remove('active');
        volunteerForm.classList.remove('expanded');
        if (volunteerToggleText) volunteerToggleText.textContent = 'Volunteer Now';
        if (volunteerHeading) volunteerHeading.style.display = '';
        if (volunteerText) volunteerText.style.display = '';
        debugLog('Closed volunteer form while opening petition form');
      }
      
      // Reset flag after a short delay
      setTimeout(() => {
        isHandlingToggleClick = false;
        debugLog('Reset isHandlingToggleClick to false');
      }, 100);
    });
  }
  
  // Toggle volunteer form
  if (volunteerToggle && volunteerForm) {
    // Ensure the toggle button has proper z-index and is clickable
    volunteerToggle.style.position = 'relative';
    volunteerToggle.style.zIndex = '10';
    
    volunteerToggle.addEventListener('click', function(event) {
      // Log the toggle button click for debugging
      debugLog('Volunteer toggle button clicked', {
        target: event.target,
        tagName: event.target.tagName,
        className: event.target.className,
        formExpanded: volunteerForm.classList.contains('expanded')
      });
      
      // Set flag to prevent document click handler from closing the form
      isHandlingToggleClick = true;
      debugLog('Set isHandlingToggleClick to true');
      
      // Prevent any default behavior
      event.preventDefault();
      event.stopPropagation();
      
      // Toggle classes
      volunteerToggle.classList.toggle('active');
      volunteerForm.classList.toggle('expanded');
      
      // Log the form state after toggling
      debugLog('Volunteer form toggled', {
        formExpanded: volunteerForm.classList.contains('expanded'),
        toggleActive: volunteerToggle.classList.contains('active')
      });
      
      // Change text and toggle visibility of elements
      if (volunteerForm.classList.contains('expanded')) {
        if (volunteerToggleText) volunteerToggleText.textContent = 'Join Our Movement';
        if (volunteerHeading) volunteerHeading.style.display = 'none';
        if (volunteerText) volunteerText.style.display = 'none';
      } else {
        if (volunteerToggleText) volunteerToggleText.textContent = 'Volunteer Now';
        if (volunteerHeading) volunteerHeading.style.display = '';
        if (volunteerText) volunteerText.style.display = '';
      }
      
      // If opening this form, close the other one
      if (volunteerForm.classList.contains('expanded') && petitionForm && petitionForm.classList.contains('expanded')) {
        petitionToggle.classList.remove('active');
        petitionForm.classList.remove('expanded');
        if (petitionToggleText) petitionToggleText.textContent = recallText;
        if (petitionTextOverlay) petitionTextOverlay.style.display = '';
        debugLog('Closed petition form while opening volunteer form');
      }
      
      // Reset flag after a short delay
      setTimeout(() => {
        isHandlingToggleClick = false;
        debugLog('Reset isHandlingToggleClick to false');
      }, 100);
    });
  }
}

// Add this new function to help with scroll issues
function initScrollHelper() {
  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Add mobile class if needed
  if (isMobile) {
    document.body.classList.add('is-mobile-device');
    document.documentElement.classList.add('mobile-scroll');
  }
  
  // Enable scroll snapping - removed the disable-snap classes
  
  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    // If arrow down is pressed while petition is visible
    if (e.key === 'ArrowDown' && isElementInView(document.getElementById('petition'))) {
      scrollToSection('volunteer');
    }
    
    // If arrow up is pressed while volunteer is visible
    if (e.key === 'ArrowUp' && isElementInView(document.getElementById('volunteer'))) {
      scrollToSection('petition');
    }
  });
  
  // Helper function to check if element is in view
  function isElementInView(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight &&
      rect.bottom >= 0
    );
  }
}

// Add these functions for the thank you petition modal
function showThankYouPetitionModal() {
  const modal = document.getElementById('thankYouPetitionModal');
  if (!modal) return;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  
  // Fade in
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
}

function closeThankYouPetitionModal() {
  const modal = document.getElementById('thankYouPetitionModal');
  if (!modal) return;
  
  modal.style.opacity = '0';
  
  // Wait for transition to complete before hiding
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }, 300);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Thank you petition modal close buttons
  const closeThankYouPetition = document.getElementById('closeThankYouPetition');
  const closeThankYouButton = document.getElementById('closeThankYouButton');
  const thankYouPetitionModal = document.getElementById('thankYouPetitionModal');
  
  if (closeThankYouPetition) {
    closeThankYouPetition.addEventListener('click', closeThankYouPetitionModal);
  }
  
  if (closeThankYouButton) {
    closeThankYouButton.addEventListener('click', closeThankYouPetitionModal);
  }
  
  if (thankYouPetitionModal) {
    thankYouPetitionModal.addEventListener('click', (e) => {
      if (e.target === thankYouPetitionModal) {
        closeThankYouPetitionModal();
      }
    });
  }
}); 