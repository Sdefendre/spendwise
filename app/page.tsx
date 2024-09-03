"use client";

import { Frame, DollarSign, PieChart, TrendingUp, Settings, Sun, Moon, Upload, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState("loading")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [pdfData, setPdfData] = useState({
    totalBalance: 5280.00,
    monthlyExpenses: 3456.78,
    savings: 2345.67,
    investments: 6543.21,
    recentTransactions: [
      { description: 'Groceries', amount: -120.50 },
      { description: 'Salary', amount: 3000.00 },
      { description: 'Utilities', amount: -200.00 },
    ],
  })

  // Add this data for the Expense Breakdown chart
  const expenseBreakdownData = {
    labels: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment'],
    datasets: [
      {
        data: [1200, 500, 300, 200, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  // Add this data for the Budget Progress chart
  const budgetProgressData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        label: 'Budget Progress',
        data: [2300, 700],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)'],
      },
    ],
  };

  useEffect(() => {
    // Simulate session check
    setTimeout(() => {
      setSession({ user: { name: "Test User" } })
      setStatus("authenticated")
    }, 1000)
  }, [])

  const handleSignIn = () => {
    setSession({ user: { name: "Test User" } })
    setStatus("authenticated")
  }

  const handleSignOut = () => {
    setSession(null)
    setStatus("unauthenticated")
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Save the dark mode preference in local storage
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  useEffect(() => {
    // Check local storage for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference) {
      setIsDarkMode(JSON.parse(darkModePreference));
    }
  }, []);

  // Apply dark mode class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Simulate PDF parsing
      setTimeout(() => {
        setPdfData({
          totalBalance: 5280.00,
          monthlyExpenses: 3456.78,
          savings: 2345.67,
          investments: 6543.21,
          recentTransactions: [
            { description: 'Groceries', amount: -120.50 },
            { description: 'Salary', amount: 3000.00 },
            { description: 'Utilities', amount: -200.00 },
          ],
        })
      }, 1000)
    }
  }

  const handleManualInput = (category, value) => {
    setPdfData(prevData => ({
      ...prevData,
      [category]: parseFloat(value)
    }))
  }

  const handleTransactionEdit = (index, field, value) => {
    setPdfData(prevData => ({
      ...prevData,
      recentTransactions: prevData.recentTransactions.map((transaction, i) => 
        i === index ? { ...transaction, [field]: field === 'amount' ? parseFloat(value) : value } : transaction
      )
    }))
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Button onClick={handleSignIn}>Sign in</Button>
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
          <Frame className="w-6 h-6" />
          <span>SpendWise</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link href="/" className="font-bold">Dashboard</Link>
          <Link href="/expenses" className="text-muted-foreground">Expenses</Link>
          <Link href="/savings" className="text-muted-foreground">Savings</Link>
          <Link href="/investments" className="text-muted-foreground">Investments</Link>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="w-5 h-5" />
            <span className="sr-only">Log out</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manual Data Input</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalBalance" className="text-right">Total Balance</Label>
                  <Input
                    id="totalBalance"
                    value={pdfData.totalBalance}
                    onChange={(e) => handleManualInput('totalBalance', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="monthlyExpenses" className="text-right">Monthly Expenses</Label>
                  <Input
                    id="monthlyExpenses"
                    value={pdfData.monthlyExpenses}
                    onChange={(e) => handleManualInput('monthlyExpenses', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="savings" className="text-right">Savings</Label>
                  <Input
                    id="savings"
                    value={pdfData.savings}
                    onChange={(e) => handleManualInput('savings', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="investments" className="text-right">Investments</Label>
                  <Input
                    id="investments"
                    value={pdfData.investments}
                    onChange={(e) => handleManualInput('investments', e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <Button variant="outline" onClick={() => document.getElementById('pdfUpload').click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload Statement
          </Button>
          <input
            id="pdfUpload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card onClick={() => router.push('/balance')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pdfData.totalBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card onClick={() => router.push('/expenses')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <PieChart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pdfData.monthlyExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>
          <Card onClick={() => router.push('/savings')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pdfData.savings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card onClick={() => router.push('/investments')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pdfData.investments.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+7.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Your top spending categories this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <Pie data={expenseBreakdownData} options={{ maintainAspectRatio: false }} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Your budget progress for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <Bar 
                  data={budgetProgressData} 
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                      x: {
                        stacked: true,
                        max: 3000,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pdfData.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Input
                    value={transaction.description}
                    onChange={(e) => handleTransactionEdit(index, 'description', e.target.value)}
                    className="w-1/2"
                  />
                  <Input
                    value={transaction.amount}
                    onChange={(e) => handleTransactionEdit(index, 'amount', e.target.value)}
                    className={`w-1/4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}