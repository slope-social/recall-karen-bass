import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function LandingPage() {
  return (
    <section className="landing-section">
      <div className="landing-overlay" />
      <div className="landing-content">
        <img 
          src="/assets/RKB-Logo-Primary.png"
          alt="RKB Logo"
          className="landing-logo"
        />
        <div className="landing-actions">
          <Button 
            className="landing-button"
            onClick={() => {
              document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Enter Site <ChevronDown className="button-icon" />
          </Button>
        </div>
      </div>
    </section>
  );
}
