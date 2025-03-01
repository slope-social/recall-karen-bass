import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function DonateSection() {
  return (
    <div className="section-content">
      <h2 className="heading-2">Support Our Cause</h2>
      <div className="card-grid">
        <Card>
          <CardContent className="form-content">
            <h3 className="heading-3">Make a Donation</h3>
            <p className="text-body">
              Your contribution helps support our mission. Make a secure donation through our trusted platform.
            </p>
            <Button 
              className="form-submit"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}