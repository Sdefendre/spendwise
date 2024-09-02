"use client";

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RecentExpensesPage() {
  const router = useRouter();
  const [recentExpenses] = useState([
    { date: '2023-06-15', description: 'Grocery Shopping', category: 'Food & Dining', amount: 125.63 },
    { date: '2023-06-14', description: 'Gas Station', category: 'Transportation', amount: 45.00 },
    { date: '2023-06-13', description: 'Movie Tickets', category: 'Entertainment', amount: 30.00 },
    { date: '2023-06-12', description: 'Restaurant Dinner', category: 'Food & Dining', amount: 78.50 },
    { date: '2023-06-11', description: 'Online Shopping', category: 'Shopping', amount: 156.78 },
    { date: '2023-06-10', description: 'Utility Bill', category: 'Bills', amount: 120.00 },
    { date: '2023-06-09', description: 'Gym Membership', category: 'Health & Fitness', amount: 50.00 },
    { date: '2023-06-08', description: 'Coffee Shop', category: 'Food & Dining', amount: 15.75 },
    { date: '2023-06-07', description: 'Bookstore', category: 'Entertainment', amount: 42.99 },
    { date: '2023-06-06', description: 'Parking Fee', category: 'Transportation', amount: 10.00 },
  ]);

  const totalRecentExpenses = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Expenses
      </Button>
      <h1 className="text-3xl font-bold mb-6">Recent Expenses</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Total Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalRecentExpenses.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentExpenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}