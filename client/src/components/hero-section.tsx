import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/assets/header.jpg")' }}
      />
      <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay for text readability */}

      <div className="relative text-center space-y-8 max-w-[80vmin]">
        <h1 className="text-[6vmin] font-bold leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Making a Difference Together
        </h1>
        <p className="text-[2.5vmin] text-white/80 max-w-[60vmin] mx-auto">
          Join our movement to create positive change in our community through collective action and shared purpose.
        </p>
        <div className="flex justify-center gap-6">
          <Button 
            className="text-[2.2vmin] h-auto bg-white text-black hover:bg-white/90"
            onClick={() => {
              document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  );
}