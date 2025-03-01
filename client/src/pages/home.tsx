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

      <main className="pt-16">
        <HeroSection />

        <section id="donate" className="min-h-screen">
          <DonateSection />
        </section>

        <section id="volunteer" className="min-h-screen">
          <VolunteerSection />
        </section>

        <section id="get-informed" className="min-h-screen">
          <InformationSection />
        </section>

        <section id="contact" className="min-h-screen">
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