import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  // Here you would typically fetch the user's data from your database
  // For this example, we'll return mock data
  const userData = {
    totalBalance: 5280.00,
    monthlyExpenses: 3456.78,
    recentTransactions: [
      { description: 'Groceries', amount: -120.50 },
      { description: 'Salary', amount: 3000.00 },
      { description: 'Utilities', amount: -200.00 },
    ],
  }

  res.status(200).json(userData)
}