import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const landingHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition > landingHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${!isVisible ? 'hidden' : ''}`}>
      <div className="nav-container">
        <div className="nav-menu-wrapper">
          {/* Logo */}
          <Link href="/">
            <img 
              src="/assets/RKB-Logo-Primary.png" 
              alt="RKB Logo" 
              className="nav-logo"
            />
          </Link>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            className="nav-mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="nav-menu-icon" />
          </Button>

          {/* Desktop menu */}
          <div className="nav-links">
            <a href="#donate" className="nav-link">
              DONATE
            </a>
            <a href="#volunteer" className="nav-link">
              VOLUNTEER
            </a>
            <a href="#get-informed" className="nav-link">
              GET INFORMED
            </a>
            <Link href="/petition" className={`nav-link ${location === '/petition' ? 'active' : ''}`}>
              SIGN THE PETITION
            </Link>
            <a href="#contact" className="nav-link">
              CONTACT
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
          <a href="#donate" className="nav-mobile-link">
            DONATE
          </a>
          <a href="#volunteer" className="nav-mobile-link">
            VOLUNTEER
          </a>
          <a href="#get-informed" className="nav-mobile-link">
            GET INFORMED
          </a>
          <Link href="/petition" className="nav-mobile-link">
            SIGN THE PETITION
          </Link>
          <a href="#contact" className="nav-mobile-link">
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}