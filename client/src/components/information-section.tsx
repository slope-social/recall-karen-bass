import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FACTS = [
  {
    title: "Bass' Inside Safe program to combat homelessness only moved 255 people to permanent housing out of the 46,000 in LA(as of April 2024) despite $67 million spent.",
    source: "https://californiaglobe.com/fr/la-mayor-bass-newly-touted-homeless-measures-face-backlash/"
  },
  {
    title: "Violent crime on Metro up 33% compared to pre-pandemic levels",
    source: "https://www.cbsnews.com/losangeles/news/kcal-investigates-violent-crime-on-metro-up-33-compared-to-pre-pandemic-levels/"
  },
  {
    title: "LAFD budget decreased by around $17 million compared to the previous budget cycle.",
    source: "https://www.politico.com/news/2025/01/08/los-angeles-fires-mayor-karen-bass-handling-criticized-00197137"
  },
  {
    title: "Bass amongst the worst Congressional Members at attending votes",
    source: "https://californiaglobe.com/fr/2022-la-mayoral-election-comparing-attendance-records-of-karen-bass-and-rick-caruso/"
  }
];

export default function InformationSection() {
  return (
    <div className="section-content">
      <h2 className="heading-2">Get Informed</h2>
      <h3 className="heading-3 text-center mb-8">
        IF LETTING L.A. BURN ISN'T ENOUGH - HERE ARE MORE REASONS WHY SHE'S TERRIBLE:
      </h3>

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {FACTS.map((fact, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="accordion-item">
            <AccordionTrigger className="accordion-trigger">
              {fact.title}
            </AccordionTrigger>
            <AccordionContent className="accordion-content">
              <a 
                href={fact.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: {fact.source}
              </a>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}