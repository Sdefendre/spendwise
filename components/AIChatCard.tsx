'use client';  // Add this line at the top of the file

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageCircle, X } from "lucide-react"

export function AIChatCard() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Here you would typically send the message to your AI backend
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'ai', content: "I'm an AI assistant. How can I help you with your finances today?" }]);
    }, 1000);
  };

  return (
    <>
      {isOpen ? (
        <Card className="fixed bottom-4 right-4 w-80 h-96 flex flex-col shadow-lg">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Chat with AI</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto space-y-2 pt-2">
            {messages.map((message, index) => (
              <div key={index} className={`text-sm ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {message.content}
                </span>
              </div>
            ))}
          </CardContent>
          <div className="p-2 border-t flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="text-sm"
            />
            <Button onClick={handleSend} className="ml-2 px-2 py-1">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}