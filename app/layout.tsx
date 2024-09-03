import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import dynamic from 'next/dynamic';

const AIChatCard = dynamic(() => import('@/components/AIChatCard').then((mod) => mod.AIChatCard), {
  ssr: false
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpendWise",
  description: "Your personal finance dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <AIChatCard />
      </body>
    </html>
  );
}
