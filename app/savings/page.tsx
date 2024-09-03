"use client";

import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SavingsPage() {
  return (
    <div className="container mx-auto p-6">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Savings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Savings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add your savings content here */}
          <p>Your savings information and charts will be displayed here.</p>
        </CardContent>
      </Card>
      {/* Add more cards or components for detailed savings information */}
    </div>
  );
}