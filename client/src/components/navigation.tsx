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
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/">
            <img 
              src="/assets/RKB-Logo-Primary.png" 
              alt="RKB Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
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
        {isMenuOpen && (
          <div className="md:hidden py-2 px-4 border-t">
            <div className="flex flex-col gap-2">
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => scrollToSection('donate')}
              >
                DONATE
              </Button>
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => scrollToSection('volunteer')}
              >
                VOLUNTEER
              </Button>
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => scrollToSection('get-informed')}
              >
                GET INFORMED
              </Button>
              <Button 
                variant="secondary"
                className="justify-start"
                onClick={onPetitionClick}
              >
                SIGN THE PETITION
              </Button>
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => scrollToSection('contact')}
              >
                CONTACT
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}