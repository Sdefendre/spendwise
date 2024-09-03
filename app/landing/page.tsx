"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, Card } from "@/components/ui/card";
import { BarChart, PiggyBank, TrendingUp, Wallet } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to SpendWise</h1>
      <p>Your personal finance management solution.</p>
    </div>
  );
}