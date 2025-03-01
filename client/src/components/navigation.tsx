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
      <div className="container mx-auto px-[2vmin]">
        <div className="flex items-center justify-between h-[12vmin]">
          <div className="logo text-[4vmin] font-bold">
            {/* Logo will be added here */}
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-[3vmin] w-[3vmin]" />
          </Button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-[2vmin]">
            <NavItems onPetitionClick={onPetitionClick} />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-[2vmin] border-t">
            <div className="flex flex-col gap-[2vmin]">
              <NavItems onPetitionClick={onPetitionClick} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItems({ onPetitionClick }: Props) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        className="text-[2.5vmin]"
        onClick={() => scrollToSection('donate')}
      >
        DONATE
      </Button>
      <Button 
        variant="ghost"
        className="text-[2.5vmin]"
        onClick={() => scrollToSection('volunteer')}
      >
        VOLUNTEER
      </Button>
      <Button 
        variant="ghost"
        className="text-[2.5vmin]"
        onClick={() => scrollToSection('get-informed')}
      >
        GET INFORMED
      </Button>
      <Button 
        variant="secondary"
        className="text-[2.5vmin]"
        onClick={onPetitionClick}
      >
        SIGN THE PETITION
      </Button>
      <Button 
        variant="ghost"
        className="text-[2.5vmin]"
        onClick={() => scrollToSection('contact')}
      >
        CONTACT
      </Button>
    </>
  );
}