import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DonateSection from "@/components/donate-section";
import VolunteerSection from "@/components/volunteer-section";
import InformationSection from "@/components/information-section";
import ContactSection from "@/components/contact-section";
import PetitionSection from "@/components/petition-section";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <section className="section">
          <HeroSection />
        </section>

        <section id="petition" className="section">
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