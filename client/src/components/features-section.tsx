import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Smartphone, Zap } from "lucide-react";

interface Props {
  onNewsletterClick: () => void;
}

export default function FeaturesSection({ onNewsletterClick }: Props) {
  return (
    <section className="px-6 py-20 lg:px-20 bg-muted/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we can help transform your business with our comprehensive digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Code2 className="h-8 w-8" />}
            title="Web Development"
            description="Custom websites built with modern technologies and best practices."
          />
          <FeatureCard
            icon={<Smartphone className="h-8 w-8" />}
            title="Responsive Design"
            description="Websites that look great on any device, from mobile to desktop."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Performance"
            description="Lightning fast websites optimized for speed and conversions."
          />
        </div>

        <div className="text-center pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onNewsletterClick}
          >
            Subscribe to Updates
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4 text-primary">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
