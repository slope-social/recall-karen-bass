import { Button } from "@/components/ui/button";

interface Props {
  onPetitionClick: () => void;
}

export default function PetitionSection({ onPetitionClick }: Props) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/assets/RKB-FB-Cover.png")' }}
      />
      <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay for text readability */}

      <div className="relative text-center space-y-8 max-w-[80vmin]">
        <h2 className="text-[5vmin] font-bold text-white">Sign the Petition</h2>
        <p className="text-[2.5vmin] text-white/80 max-w-[60vmin] mx-auto">
          Join thousands of community members in supporting our cause. Your signature makes a difference.
        </p>
        <Button 
          onClick={onPetitionClick}
          className="text-[2.2vmin] bg-white text-black hover:bg-white/90"
        >
          Sign Now
        </Button>
      </div>
    </section>
  );
}
