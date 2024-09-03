"use client";

import { ArrowUpRight, Upload, Moon, ArrowLeftRight, Menu, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/BackButton";

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">SpendWise</h1>
            <nav className="hidden md:flex space-x-4">
              <a href="/dashboard" className="text-muted-foreground">Dashboard</a>
              <a href="/expenses" className="text-muted-foreground">Expenses</a>
              <a href="/savings" className="text-muted-foreground">Savings</a>
              <a href="/investments" className="font-semibold">Investments</a>
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
          <h2 className="text-3xl font-bold">Investment Overview</h2>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Import Portfolio
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$65,432.10</div>
              <p className="text-xs text-muted-foreground">+7.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Year-to-Date Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12.3%</div>
              <Progress value={62} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">$7,234.56 total gain</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Portfolio Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-1/4 font-medium">Stocks</div>
                <div className="w-1/4">$39,259.26</div>
                <div className="w-1/2">
                  <Progress value={60} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 font-medium">Bonds</div>
                <div className="w-1/4">$13,086.42</div>
                <div className="w-1/2">
                  <Progress value={20} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 font-medium">Real Estate</div>
                <div className="w-1/4">$6,543.21</div>
                <div className="w-1/2">
                  <Progress value={10} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 font-medium">Cryptocurrencies</div>
                <div className="w-1/4">$6,543.21</div>
                <div className="w-1/2">
                  <Progress value={10} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Investment Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Bought AAPL</p>
                  <p className="text-sm text-muted-foreground">July 15, 2023</p>
                </div>
                <div className="flex items-center font-medium text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  $2,500.00
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Sold TSLA</p>
                  <p className="text-sm text-muted-foreground">July 10, 2023</p>
                </div>
                <div className="flex items-center font-medium text-red-600">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  $1,800.00
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Dividend Payment</p>
                  <p className="text-sm text-muted-foreground">July 1, 2023</p>
                </div>
                <div className="flex items-center font-medium text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  $320.50
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}