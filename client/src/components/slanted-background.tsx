import { useEffect } from 'react';

export default function SlantedBackground() {
  useEffect(() => {
    function setContainerHeight() {
      const container = document.querySelector('.image-container');
      if (container) {
        container.style.height = `${window.innerHeight * 0.8}px`; // 80% of viewport height
      }
    }

    window.addEventListener('resize', setContainerHeight);
    setContainerHeight(); // Set height on initial load

    return () => window.removeEventListener('resize', setContainerHeight);
  }, []);

  return (
    <div className="image-container">
      <div className="image"></div>
      <div className="image"></div>
      <div className="image"></div>
    </div>
  );
}