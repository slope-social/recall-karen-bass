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
      <div className="container mx-auto flex flex-wrap justify-between items-center h-auto min-h-[12vmin] p-[2vmin]">
        <div className="logo text-[4vmin] font-bold">
          {/* Logo will be added here */}
        </div>

        <div className="flex flex-wrap gap-[2vmin] items-center">
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
        </div>
      </div>
    </nav>
  );
}