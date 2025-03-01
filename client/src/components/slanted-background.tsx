import { useEffect, useState } from 'react';

export default function SlantedBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`slanted-background ${isLoaded ? 'loaded' : ''}`}>
      <div className="image-container">
        <div className="image image-left" />
        <div className="image image-middle" />
        <div className="image image-right" />
      </div>
    </div>
  );
}
