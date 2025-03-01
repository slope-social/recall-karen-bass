import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function DonateSection() {
  return (
    <div className="w-full container mx-auto py-[8vmin] px-[4vmin]">
      <h2 className="text-[4vmin] font-bold mb-[4vmin]">Support Our Cause</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3vmin]">
        <Card>
          <CardContent className="p-[3vmin]">
            <h3 className="text-[2.5vmin] font-semibold mb-[2vmin]">Make a Donation</h3>
            <p className="text-[2.5vmin] text-muted-foreground mb-[3vmin]">
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