import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <nav className={`nav ${!isVisible ? 'hidden' : ''}`}>
      <div className="nav-container">
        <div className="nav-menu-wrapper">
          {/* Logo */}
          <Link href="/home">
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
            <Link href="/home" className={`nav-link ${location === '/home' ? 'active' : ''}`}>
              HOME
            </Link>
            <Link href="/home#donate" className="nav-link">
              DONATE
            </Link>
            <Link href="/home#volunteer" className="nav-link">
              VOLUNTEER
            </Link>
            <Link href="/home#get-informed" className="nav-link">
              GET INFORMED
            </Link>
            <Link href="/petition" className={`nav-link ${location === '/petition' ? 'active' : ''}`}>
              SIGN THE PETITION
            </Link>
            <Link href="/home#contact" className="nav-link">
              CONTACT
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/home" className="nav-mobile-link">
            HOME
          </Link>
          <Link href="/home#donate" className="nav-mobile-link">
            DONATE
          </Link>
          <Link href="/home#volunteer" className="nav-mobile-link">
            VOLUNTEER
          </Link>
          <Link href="/home#get-informed" className="nav-mobile-link">
            GET INFORMED
          </Link>
          <Link href="/petition" className="nav-mobile-link">
            SIGN THE PETITION
          </Link>
          <Link href="/home#contact" className="nav-mobile-link">
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}