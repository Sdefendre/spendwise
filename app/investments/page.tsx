"use client";

import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvestmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Investments</h1>
      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add your investments content here */}
          <p>Your investment information and charts will be displayed here.</p>
        </CardContent>
      </Card>
      {/* Add more cards or components for detailed investment information */}
    </div>
  );
}