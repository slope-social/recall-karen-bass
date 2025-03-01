import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-[4vmin] py-[8vmin]">
      <div className="text-center space-y-[4vmin] max-w-[80vmin]">
        <h1 className="text-[6vmin] font-bold leading-tight">
          Making a Difference Together
        </h1>
        <p className="text-[2.5vmin] text-muted-foreground max-w-[60vmin] mx-auto">
          Join our movement to create positive change in our community through collective action and shared purpose.
        </p>
        <div className="flex justify-center gap-[2vmin]">
          <Button 
            className="text-[2.2vmin] px-[3vmin] py-[1.5vmin] h-auto"
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