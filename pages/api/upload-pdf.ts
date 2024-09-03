import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const file = files.file as formidable.File;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        const dataBuffer = fs.readFileSync(file.filepath);
        const pdfData = await pdf(dataBuffer);

        // Here you would implement your logic to extract financial data from the PDF text
        // For this example, we'll just return the full text
        res.status(200).json({ text: pdfData.text });
      } catch (error) {
        res.status(500).json({ error: 'Error parsing PDF' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}