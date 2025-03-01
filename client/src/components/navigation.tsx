import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

interface Props {
  onPetitionClick: () => void;
}

export default function Navigation({ onPetitionClick }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav">
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
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('donate')}
            >
              DONATE
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('volunteer')}
            >
              VOLUNTEER
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('get-informed')}
            >
              GET INFORMED
            </Button>
            <Button 
              variant="secondary"
              size="sm"
              onClick={onPetitionClick}
            >
              SIGN THE PETITION
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('contact')}
            >
              CONTACT
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
          <Button 
            variant="ghost"
            className="nav-mobile-link"
            onClick={() => scrollToSection('donate')}
          >
            DONATE
          </Button>
          <Button 
            variant="ghost"
            className="nav-mobile-link"
            onClick={() => scrollToSection('volunteer')}
          >
            VOLUNTEER
          </Button>
          <Button 
            variant="ghost"
            className="nav-mobile-link"
            onClick={() => scrollToSection('get-informed')}
          >
            GET INFORMED
          </Button>
          <Button 
            variant="secondary"
            className="nav-mobile-link"
            onClick={onPetitionClick}
          >
            SIGN THE PETITION
          </Button>
          <Button 
            variant="ghost"
            className="nav-mobile-link"
            onClick={() => scrollToSection('contact')}
          >
            CONTACT
          </Button>
        </div>
      </div>
    </nav>
  );
}