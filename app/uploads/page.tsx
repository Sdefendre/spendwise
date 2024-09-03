"use client";

import { useState, useEffect } from 'react';
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  date: string;
  size: string;
}

export default function UploadsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    setUploadedFiles([
      { id: '1', name: 'January_Statement.pdf', date: '2023-01-15', size: '1.2 MB' },
      { id: '2', name: 'February_Statement.pdf', date: '2023-02-15', size: '1.1 MB' },
      { id: '3', name: 'March_Statement.pdf', date: '2023-03-15', size: '1.3 MB' },
    ]);
  }, []);

  const handleDownload = (fileId: string) => {
    // Implement download functionality
    console.log(`Downloading file with id: ${fileId}`);
  };

  const handleDelete = (fileId: string) => {
    // Implement delete functionality
    console.log(`Deleting file with id: ${fileId}`);
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  return (
    <div className="container mx-auto p-6">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Uploaded Files</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Uploaded Statements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">
                    <FileText className="inline mr-2" size={16} />
                    {file.name}
                  </TableCell>
                  <TableCell>{file.date}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(file.id)}>
                      <Download size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}