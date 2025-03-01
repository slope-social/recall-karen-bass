import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Reason {
  title: string;
  source: string;
}

const reasons: Reason[] = [
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

const itemVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 }
};

export default function InformationSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="section-content">
      <h2 className="heading-2">IF LETTING L.A. BURN ISN'T ENOUGH - HERE ARE MORE REASONS WHY SHE'S TERRIBLE</h2>
      <div className="card-grid">
        <Card>
          <CardContent className="p-6">
            <motion.div
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="mb-4 last:mb-0"
                >
                  <div
                    className="flex items-start gap-2 p-4 bg-background/10 rounded-lg cursor-pointer transition-colors hover:bg-background/20"
                    onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                  >
                    <ChevronDown
                      className={`w-5 h-5 mt-1 transition-transform ${
                        selectedIndex === index ? "rotate-180" : ""
                      }`}
                    />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                      {selectedIndex === index && (
                        <motion.a
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          href={reason.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Source
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}