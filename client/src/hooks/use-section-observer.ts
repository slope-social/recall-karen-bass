import { useEffect } from 'react';

export function useSectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.3, // Trigger when 30% of the section is visible
    });

    // Observe all sections
    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);
}
