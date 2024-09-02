import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { createClient } from '@vercel/postgres'
import { promises as fs } from 'fs'
import pdf from 'pdf-parse'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  try {
    // Read the PDF file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const pdfData = await pdf(buffer)

    // Use GPT-4 to parse the PDF content
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant that extracts financial information from bank statements." },
        { role: "user", content: `Extract the following information from this bank statement: total balance, monthly expenses, savings, investments, and recent transactions. The statement content is: ${pdfData.text}` }
      ],
    })

    const parsedData = JSON.parse(completion.data.choices[0].message.content)

    // Store the data in the database
    const client = createClient()
    await client.connect()

    await client.sql`
      INSERT INTO statements (total_balance, monthly_expenses, savings, investments)
      VALUES (${parsedData.totalBalance}, ${parsedData.monthlyExpenses}, ${parsedData.savings}, ${parsedData.investments})
    `

    for (const transaction of parsedData.recentTransactions) {
      await client.sql`
        INSERT INTO transactions (description, amount, date)
        VALUES (${transaction.description}, ${transaction.amount}, ${transaction.date})
      `
    }

    await client.end()

    // Prepare the data for the frontend
    const monthlyData = [
      // Transform parsedData into the format expected by the charts
    ]

    const categoryData = [
      // Transform parsedData into the format expected by the pie chart
    ]

    return NextResponse.json({ 
      success: true, 
      monthlyData, 
      categoryData,
      totalBalance: parsedData.totalBalance,
      monthlyExpenses: parsedData.monthlyExpenses,
      savings: parsedData.savings,
      investments: parsedData.investments,
      recentTransactions: parsedData.recentTransactions
    })
  } catch (error) {
    console.error('Error processing statement:', error)
    return NextResponse.json({ success: false, error: 'Failed to process statement' })
  }
}