"use client";

import { ArrowUpRight, Upload, Moon, ArrowLeftRight, Menu, DollarSign, Wallet, TrendingUp, ArrowDown, ArrowUp, Brain, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
//import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"; // Ensure this path is correct

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">SpendWise</h1>
            <nav className="hidden md:flex space-x-4">
              <a href="/dashboard" className="font-semibold">Dashboard</a>
              <a href="/expenses" className="text-muted-foreground">Expenses</a>
              <a href="/savings" className="text-muted-foreground">Savings</a>
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Financial Overview</h2>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$73,168.55</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,456.78</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,345.67</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$65,432.10</div>
              <p className="text-xs text-muted-foreground">+7.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-1/3 font-medium">Housing</div>
                  <div className="w-1/3">$1,200.00</div>
                  <div className="w-1/3">
                    <Progress value={35} />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/3 font-medium">Food</div>
                  <div className="w-1/3">$800.00</div>
                  <div className="w-1/3">
                    <Progress value={23} />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/3 font-medium">Transportation</div>
                  <div className="w-1/3">$600.00</div>
                  <div className="w-1/3">
                    <Progress value={17} />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/3 font-medium">Utilities</div>
                  <div className="w-1/3">$400.00</div>
                  <div className="w-1/3">
                    <Progress value={12} />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/3 font-medium">Entertainment</div>
                  <div className="w-1/3">$300.00</div>
                  <div className="w-1/3">
                    <Progress value={9} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total Budget</span>
                    <span>$3,500.00</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Budget Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Spent</span>
                      <span className="font-medium">$2,975.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Remaining</span>
                      <span className="font-medium">$525.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Unusual Spending Detected</AlertTitle>
                <AlertDescription>
                  Your entertainment expenses are 30% higher than your monthly average. Consider reviewing your recent purchases in this category.
                </AlertDescription>
              </Alert>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Savings Opportunity</AlertTitle>
                <AlertDescription>
                  Based on your spending patterns, you could potentially save an additional $200 per month by reducing your dining out expenses.
                </AlertDescription>
              </Alert>
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Investment Recommendation</AlertTitle>
                <AlertDescription>
                  Your risk profile and financial goals suggest that increasing your stock allocation by 5% could potentially improve your long-term returns.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Groceries</p>
                  <p className="text-sm text-muted-foreground">July 15, 2023</p>
                </div>
                <div className="flex items-center font-medium text-red-600">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  $120.50
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Salary Deposit</p>
                  <p className="text-sm text-muted-foreground">July 1, 2023</p>
                </div>
                <div className="flex items-center font-medium text-green-600">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  $3,500.00
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Electric Bill</p>
                  <p className="text-sm text-muted-foreground">June 28, 2023</p>
                </div>
                <div className="flex items-center font-medium text-red-600">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  $85.20
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Restaurant</p>
                  <p className="text-sm text-muted-foreground">June 25, 2023</p>
                </div>
                <div className="flex items-center font-medium text-red-600">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  $65.30
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}