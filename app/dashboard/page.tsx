"use client";

import { Frame, DollarSign, PieChart, TrendingUp, Settings, Sun, Moon, Upload, LogOut, Menu, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
// ... other imports

// Define the validation schema
const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(-1000000, "Amount must be greater than -1,000,000").max(1000000, "Amount must be less than 1,000,000"),
});

export default function Dashboard() {
  // ... existing state and functions

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTransactionEdit = (index: number, field: 'description' | 'amount', value: string) => {
    try {
      let parsedValue = field === 'amount' ? parseFloat(value) : value;
      const validatedData = transactionSchema.parse({ 
        description: field === 'description' ? parsedValue : pdfData.recentTransactions[index].description, 
        amount: field === 'amount' ? parsedValue : pdfData.recentTransactions[index].amount 
      });

      setPdfData(prevData => ({
        ...prevData,
        recentTransactions: prevData.recentTransactions.map((transaction, i) => 
          i === index ? { ...transaction, [field]: validatedData[field] } : transaction
        )
      }));

      // Clear any existing errors for this field
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Parsed PDF text:', data.text);
          // Here you would implement logic to extract financial data from the parsed text
          // and update the pdfData state accordingly
        } else {
          throw new Error('Failed to upload and parse PDF');
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* ... existing header and other content */}

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* ... other cards and content */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Recent Transactions</CardTitle>
            <Link href="/expenses" className="text-sm text-blue-500 hover:underline flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pdfData.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center">
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
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
        <Link href="/dashboard" className="font-bold">Dashboard</Link>
        <Link href="/expenses" className="text-muted-foreground">Expenses</Link>
        <Link href="/savings" className="text-muted-foreground">Savings</Link>
        <Link href="/investments" className="text-muted-foreground">Investments</Link>
      </nav>

      {/* ... existing footer or other content */}
    </div>
  );
}