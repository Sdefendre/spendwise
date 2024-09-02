import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const pdfFile = files.pdfFile;
      const dataBuffer = fs.readFileSync(pdfFile.filepath);

      try {
        const pdfData = await pdf(dataBuffer);
        const parsedData = parsePdfContent(pdfData.text);
        
        // Here you would typically save the parsed data to your database
        // associated with the user's ID (session.user.id)

        res.status(200).json(parsedData);
      } catch (error) {
        res.status(500).json({ error: 'Error parsing PDF' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function parsePdfContent(text) {
  // Implement your parsing logic here
  // This function should extract relevant financial data from the PDF text
  // and return it in a structured JSON format
  // Example:
  return {
    totalBalance: 5280.00,
    monthlyExpenses: 3456.78,
    recentTransactions: [
      { description: 'Groceries', amount: -120.50 },
      { description: 'Salary', amount: 3000.00 },
      { description: 'Utilities', amount: -200.00 },
    ],
    // ... other relevant data
  };
}