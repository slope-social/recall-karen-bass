import { Card, CardContent } from "@/components/ui/card";

export default function InformationSection() {
  return (
    <div className="section-content">
      <h2 className="heading-2">Get Informed</h2>
      <div className="card-grid">
        <Card>
          <CardContent className="p-[3vmin]">
            <h3 className="text-[2.5vmin] font-semibold mb-[2vmin]">Latest Updates</h3>
            <p className="text-body">
              Stay informed about our initiatives and impact in the community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}