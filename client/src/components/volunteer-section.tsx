import { Card, CardContent } from "@/components/ui/card";

export default function VolunteerSection() {
  return (
    <div className="section-content">
      <h2 className="heading-2">Join Our Community</h2>
      <div className="card-grid">
        <Card>
          <CardContent className="p-[3vmin]">
            <h3 className="text-[2.5vmin] font-semibold mb-[2vmin]">Volunteer Opportunities</h3>
            <p className="text-body">
              Discover ways to get involved and make a difference in your community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}