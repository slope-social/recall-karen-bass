import { Card, CardContent } from "@/components/ui/card";

export default function VolunteerSection() {
  return (
    <div className="container mx-auto py-[8vmin] px-[4vmin] bg-muted/30">
      <h2 className="text-[4vmin] font-bold mb-[4vmin]">Join Our Community</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[3vmin]">
        <Card>
          <CardContent className="p-[3vmin]">
            <h3 className="text-[2.5vmin] font-semibold mb-[2vmin]">Volunteer Opportunities</h3>
            <p className="text-[2.5vmin] text-muted-foreground">
              Discover ways to get involved and make a difference in your community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}