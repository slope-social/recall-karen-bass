import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DonateSection from "@/components/donate-section";
import VolunteerSection from "@/components/volunteer-section";
import InformationSection from "@/components/information-section";
import ContactSection from "@/components/contact-section";
import PetitionForm from "@/components/petition-form";
import { useState } from "react";

export default function Home() {
  const [petitionOpen, setPetitionOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <Navigation onPetitionClick={() => setPetitionOpen(true)} />

      <main>
        <section className="section">
          <HeroSection />
        </section>

        <section id="donate" className="section">
          <DonateSection />
        </section>

        <section id="volunteer" className="section">
          <VolunteerSection />
        </section>

        <section id="get-informed" className="section">
          <InformationSection />
        </section>

        <section id="contact" className="section">
          <ContactSection />
        </section>
      </main>

      <PetitionForm 
        open={petitionOpen} 
        onOpenChange={setPetitionOpen}
      />
    </div>
  );
}