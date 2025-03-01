import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function DonateSection() {
  return (
    <div className="section-content">
      <h2 className="heading-2">Support Our Cause</h2>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-black/80 border-primary/20">
          <CardContent className="p-8">
            <h3 className="heading-3 text-center">Make a Donation</h3>
            <p className="text-body text-center mb-8">
              Your contribution helps support our mission. Make a secure donation through our trusted platform.
            </p>
            <div className="flex justify-center">
              <Button 
                className="form-submit min-w-[200px]"
                asChild
              >
                <a 
                  href="https://www.efundraisingconnections.com/c/RecallKarenBassCommittee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Donate Now <ExternalLink className="button-icon" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}