import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DonateSection from "@/components/donate-section";
import VolunteerSection from "@/components/volunteer-section";
import InformationSection from "@/components/information-section";
import ContactSection from "@/components/contact-section";
import PetitionSection from "@/components/petition-section";
import { useSectionObserver } from "@/hooks/use-section-observer";

export default function Home() {
  useSectionObserver();

  return (
    <>
      <div className="dark-overlay" />
      <Navigation />

      <main>
        <section className="section">
          <HeroSection />
        </section>

        <section id="petition" className="section">
          <div className="petition-background" />
          <PetitionSection />
        </section>

        <section id="volunteer" className="section">
          <VolunteerSection />
        </section>

        <section id="donate" className="section">
          <DonateSection />
        </section>

        <section id="get-informed" className="section">
          <InformationSection />
        </section>

        <section id="contact" className="section">
          <ContactSection />
        </section>
      </main>
    </>
  );
}