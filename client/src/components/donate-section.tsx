import { Card, CardContent } from "@/components/ui/card";

export default function DonateSection() {
  return (
    <div className="container mx-auto py-[8vmin] px-[4vmin]">
      <h2 className="text-[4vmin] font-bold mb-[4vmin]">Support Our Cause</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3vmin]">
        {/* Placeholder for donation options */}
        <Card>
          <CardContent className="p-[3vmin]">
            <h3 className="text-[2.5vmin] font-semibold mb-[2vmin]">One-time Donation</h3>
            <p className="text-[1.8vmin] text-muted-foreground">
              Make a direct impact with a one-time contribution to our cause.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
