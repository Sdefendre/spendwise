"use client";

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export default function TransportationPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Expenses
      </Button>
      <h1 className="text-3xl font-bold mb-6">Transportation Expenses</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$654.32</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fuel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$234.56</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Public Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$419.76</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}