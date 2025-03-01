import { Card, CardContent } from "@/components/ui/card";

export default function InformationSection() {
  return (
    <div className="container mx-auto py-[8vmin] px-[4vmin]">
      <h2 className="text-[4vmin] font-bold mb-[4vmin]">Get Informed</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3vmin]">
        {/* Placeholder for information content */}
        <Card>
          <CardContent className="p-[3vmin]">
            <h3 className="text-[2.5vmin] font-semibold mb-[2vmin]">Latest Updates</h3>
            <p className="text-[1.8vmin] text-muted-foreground">
              Stay informed about our initiatives and impact in the community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
