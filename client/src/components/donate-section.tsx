import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function DonateSection() {
  return (
    <div className="section-content">
      <h2 className="heading-2">Support Our Cause</h2>
      <div className="card-grid">
        <Card>
          <CardContent className="p-[3vmin]">
            <h3 className="text-[2.5vmin] font-semibold mb-[2vmin]">Make a Donation</h3>
            <p className="text-body mb-[3vmin]">
              Your contribution helps support our mission. Make a secure donation through our trusted platform.
            </p>
            <Button 
              className="w-full flex items-center justify-center gap-[1vmin] text-[2.2vmin]"
              asChild
            >
              <a 
                href="https://www.efundraisingconnections.com/c/RecallKarenBassCommittee" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Donate Now <ExternalLink className="h-[2.2vmin] w-[2.2vmin]" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}