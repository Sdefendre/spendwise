"use client";

import { ArrowUpRight, Upload, Moon, ArrowLeftRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BackButton } from "@/components/BackButton";

export default function SavingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">SpendWise</h1>
            <nav className="hidden md:flex space-x-4">
              <a href="/dashboard" className="text-muted-foreground">Dashboard</a>
              <a href="/expenses" className="text-muted-foreground">Expenses</a>
              <a href="/savings" className="font-semibold">Savings</a>
              <a href="/investments" className="text-muted-foreground">Investments</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowLeftRight className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Savings Overview</h2>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2345.67</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2345.67 / $5000.00</div>
              <Progress value={47} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">47% of your goal reached</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Savings Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-1/4 font-medium">Emergency Fund</div>
                <div className="w-1/4">$1000.00</div>
                <div className="w-1/2">
                  <Progress value={40} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 font-medium">Vacation</div>
                <div className="w-1/4">$800.00</div>
                <div className="w-1/2">
                  <Progress value={32} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 font-medium">New Car</div>
                <div className="w-1/4">$545.67</div>
                <div className="w-1/2">
                  <Progress value={22} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Savings Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Transfer to Emergency Fund</p>
                  <p className="text-sm text-muted-foreground">July 1, 2023</p>
                </div>
                <div className="font-medium text-green-600">+$200.00</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Transfer to Vacation Fund</p>
                  <p className="text-sm text-muted-foreground">June 15, 2023</p>
                </div>
                <div className="font-medium text-green-600">+$150.00</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Transfer to New Car Fund</p>
                  <p className="text-sm text-muted-foreground">June 1, 2023</p>
                </div>
                <div className="font-medium text-green-600">+$100.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}