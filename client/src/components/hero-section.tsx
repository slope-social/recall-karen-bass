import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="section hero">
      <div className="hero-content">
        <h1 className="heading-1">
          Making a Difference Together
        </h1>
        <p className="text-body">
          Join our movement to create positive change in our community through collective action and shared purpose.
        </p>
        <div className="hero-actions">
          <Button 
            onClick={() => {
              document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-button"
          >
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  );
}