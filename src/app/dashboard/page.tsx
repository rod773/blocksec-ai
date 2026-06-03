"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionMonitor } from "@/components/transaction-monitor"
import { ContractScanner } from "@/components/contract-scanner"
import { SecurityDashboard } from "@/components/security-dashboard"
import { AnimatedSection } from "@/components/animated-section"
import { FileCodeIcon, ActivityIcon, ShieldCheckIcon } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Security Scanner</h1>
          <p className="mt-2 text-muted-foreground">
            Analyze contracts, monitor transactions, and track security metrics in real time.
          </p>
        </motion.div>

        <AnimatedSection>
          <Tabs defaultValue="scanner" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="scanner" className="gap-2">
                <FileCodeIcon className="size-4" />
                Contract Scanner
              </TabsTrigger>
              <TabsTrigger value="monitor" className="gap-2">
                <ActivityIcon className="size-4" />
                Transaction Monitor
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="gap-2">
                <ShieldCheckIcon className="size-4" />
                Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scanner">
              <div className="max-w-2xl">
                <ContractScanner />
              </div>
            </TabsContent>

            <TabsContent value="monitor">
              <div className="max-w-2xl">
                <TransactionMonitor />
              </div>
            </TabsContent>

            <TabsContent value="dashboard">
              <div className="max-w-lg">
                <SecurityDashboard />
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </section>
    </div>
  )
}
