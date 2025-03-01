import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface Props {
  onPetitionClick: () => void;
}

export default function Navigation({ onPetitionClick }: Props) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b">
      <div className="container mx-auto flex items-center justify-between h-[8vmin] px-[4vmin]">
        <div className="logo text-[3vmin] font-bold">
          {/* Logo will be added here */}
        </div>
        
        <div className="flex gap-[2vmin] items-center">
          <Button 
            variant="ghost" 
            className="text-[1.8vmin]"
            onClick={() => scrollToSection('donate')}
          >
            DONATE
          </Button>
          <Button 
            variant="ghost"
            className="text-[1.8vmin]"
            onClick={() => scrollToSection('volunteer')}
          >
            VOLUNTEER
          </Button>
          <Button 
            variant="ghost"
            className="text-[1.8vmin]"
            onClick={() => scrollToSection('get-informed')}
          >
            GET INFORMED
          </Button>
          <Button 
            variant="secondary"
            className="text-[1.8vmin]"
            onClick={onPetitionClick}
          >
            SIGN THE PETITION
          </Button>
          <Button 
            variant="ghost"
            className="text-[1.8vmin]"
            onClick={() => scrollToSection('contact')}
          >
            CONTACT
          </Button>
        </div>
      </div>
    </nav>
  );
}
