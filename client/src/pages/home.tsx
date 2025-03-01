import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DonateSection from "@/components/donate-section";
import VolunteerSection from "@/components/volunteer-section";
import InformationSection from "@/components/information-section";
import ContactSection from "@/components/contact-section";
import PetitionSection from "@/components/petition-section";
import PetitionForm from "@/components/petition-form";
import { useState } from "react";

export default function Home() {
  const [petitionOpen, setPetitionOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <Navigation onPetitionClick={() => setPetitionOpen(true)} />

      <main>
        <section className="min-h-[100vh] flex items-center">
          <HeroSection />
        </section>

        <section id="donate" className="min-h-[100vh] flex items-center">
          <DonateSection />
        </section>

        <section id="volunteer" className="min-h-[100vh] flex items-center">
          <VolunteerSection />
        </section>

        <section id="get-informed" className="min-h-[100vh] flex items-center">
          <InformationSection />
        </section>

        <section className="min-h-[100vh] flex items-center">
          <PetitionSection onPetitionClick={() => setPetitionOpen(true)} />
        </section>

        <section id="contact" className="min-h-[100vh] flex items-center">
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