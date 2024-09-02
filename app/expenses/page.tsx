"use client";

import { ArrowUpRight, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function ExpensesPage() {
  const router = useRouter();
  const [expenses, setExpenses] = useState([
    { date: '2023-06-15', description: 'Grocery Shopping', category: 'Food & Dining', amount: 125.63 },
    { date: '2023-06-14', description: 'Gas Station', category: 'Transportation', amount: 45.00 },
    { date: '2023-06-13', description: 'Movie Tickets', category: 'Entertainment', amount: 30.00 },
    { date: '2023-06-12', description: 'Restaurant Dinner', category: 'Food & Dining', amount: 78.50 },
    { date: '2023-06-11', description: 'Online Shopping', category: 'Shopping', amount: 156.78 },
  ]);

  const [newExpense, setNewExpense] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.date && newExpense.description && newExpense.category && newExpense.amount) {
      setExpenses(prev => [...prev, { ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ date: '', description: '', category: '', amount: '' });
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Statement
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card onClick={() => router.push('/expenses/total')} className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card onClick={() => router.push('/expenses/food-and-dining')} className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food & Dining</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$892.50</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card onClick={() => router.push('/expenses/transportation')} className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transportation</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$654.32</div>
            <p className="text-xs text-muted-foreground">-3% from last month</p>
          </CardContent>
        </Card>
        <Card onClick={() => router.push('/expenses/entertainment')} className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entertainment</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$321.45</div>
            <p className="text-xs text-muted-foreground">+1% from last month</p>
          </CardContent>
        </Card>
        
        <Card onClick={() => router.push('/expenses/recent')} className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Expenses</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${expenses.slice(0, 5).reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Last 5 transactions</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
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
              {expenses.map((expense, index) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleAddExpense}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                name="date"
                value={newExpense.date}
                onChange={handleInputChange}
                placeholder="Date"
              />
              <Input
                type="text"
                name="description"
                value={newExpense.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="category"
                value={newExpense.category}
                onChange={handleInputChange}
                placeholder="Category"
              />
              <Input
                type="number"
                name="amount"
                value={newExpense.amount}
                onChange={handleInputChange}
                placeholder="Amount"
              />
            </div>
            <Button type="submit" className="w-full">Add Expense</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}