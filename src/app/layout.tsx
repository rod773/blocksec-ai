import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "BlockSec AI — Blockchain Security Analysis",
  description:
    "AI-powered blockchain security analysis, smart contract scanning, and transaction monitoring across Ethereum and L2 networks.",
  keywords: [
    "blockchain",
    "security",
    "smart contract",
    "audit",
    "ethereum",
    "web3",
    "defi",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          <Providers>
            <Header />
            <main className="flex-1 pt-16">{children}</main>
          </Providers>
        </TooltipProvider>
      </body>
    </html>
  )
}
