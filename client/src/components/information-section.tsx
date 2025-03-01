import { Card, CardContent } from "@/components/ui/card";

export default function InformationSection() {
  return (
    <div className="section-content">
      <h2 className="heading-2">Get Informed</h2>
      <div className="card-grid">
        <Card>
          <CardContent className="form-content">
            <h3 className="heading-3">Latest Updates</h3>
            <p className="text-body">
              Stay informed about our initiatives and impact in the community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}