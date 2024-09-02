"use client";

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export default function EntertainmentPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Expenses
      </Button>
      <h1 className="text-3xl font-bold mb-6">Entertainment Expenses</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$321.45</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$87.50</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Concerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$233.95</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}