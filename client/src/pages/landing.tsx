import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const handleScroll = (event: WheelEvent | null) => {
      const mainContent = document.getElementById('main-content');
      if (mainContent && (!event || event.deltaY > 0)) {
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleClick = () => {
      handleScroll(null);
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    document.querySelector('.landing-section')?.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      document.querySelector('.landing-section')?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <section className="landing-section">
      <div className="landing-overlay" />
      <div className="landing-content">
        <img 
          src="/assets/RKB-Logo-Primary.png"
          alt="RKB Logo"
          className="landing-logo"
        />
      </div>
    </section>
  );
}