"use client";

import { useState } from 'react'
import { ArrowUpRight, Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const initialData = [
  { month: 'Jan', expenses: 2400, income: 4000 },
  { month: 'Feb', expenses: 1398, income: 3000 },
  { month: 'Mar', expenses: 9800, income: 2000 },
  { month: 'Apr', expenses: 3908, income: 2780 },
  { month: 'May', expenses: 4800, income: 1890 },
  { month: 'Jun', expenses: 3800, income: 2390 },
]

const initialPieData = [
  { name: 'Food & Dining', value: 892.5 },
  { name: 'Transportation', value: 654.32 },
  { name: 'Entertainment', value: 321.45 },
  { name: 'Others', value: 1588.51 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function ExpensesPage() {
  const [data, setData] = useState(initialData)
  const [pieData, setPieData] = useState(initialPieData)

  const handleDataChange = (index, field, value) => {
    const newData = [...data]
    newData[index][field] = Number(value)
    setData(newData)
  }

  const handlePieDataChange = (index, value) => {
    const newPieData = [...pieData]
    newPieData[index].value = Number(value)
    setPieData(newPieData)
  }

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
        <Link href="/expenses/total">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3456.78</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/expenses/food-and-dining">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Food & Dining</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$892.50</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/expenses/transportation">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transportation</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$654.32</div>
              <p className="text-xs text-muted-foreground">-3% from last month</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/expenses/entertainment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entertainment</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$321.45</div>
              <p className="text-xs text-muted-foreground">+1% from last month</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Expenses vs Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expenses" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {data.map((item, index) => (
              <div key={item.month} className="flex flex-col">
                <span>{item.month}</span>
                <Input
                  type="number"
                  value={item.expenses}
                  onChange={(e) => handleDataChange(index, 'expenses', e.target.value)}
                  className="mt-1"
                />
                <Input
                  type="number"
                  value={item.income}
                  onChange={(e) => handleDataChange(index, 'income', e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Monthly Expenses Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expenses" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex flex-col">
                <span>{item.name}</span>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => handlePieDataChange(index, e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              <TableRow>
                <TableCell>2023-06-15</TableCell>
                <TableCell>Grocery Shopping</TableCell>
                <TableCell>Food & Dining</TableCell>
                <TableCell className="text-right">$125.63</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-06-14</TableCell>
                <TableCell>Gas Station</TableCell>
                <TableCell>Transportation</TableCell>
                <TableCell className="text-right">$45.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-06-13</TableCell>
                <TableCell>Movie Tickets</TableCell>
                <TableCell>Entertainment</TableCell>
                <TableCell className="text-right">$30.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-06-12</TableCell>
                <TableCell>Restaurant Dinner</TableCell>
                <TableCell>Food & Dining</TableCell>
                <TableCell className="text-right">$78.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-06-11</TableCell>
                <TableCell>Online Shopping</TableCell>
                <TableCell>Shopping</TableCell>
                <TableCell className="text-right">$156.78</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" placeholder="Date" />
              <Input type="text" placeholder="Description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input type="text" placeholder="Category" />
              <Input type="number" placeholder="Amount" />
            </div>
            <Button className="w-full">Add Expense</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}