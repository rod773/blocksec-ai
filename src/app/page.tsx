import { HeroSection } from "@/components/hero-section"
import { ContractScanner } from "@/components/contract-scanner"
import { SecurityDashboard } from "@/components/security-dashboard"
import { TransactionMonitor } from "@/components/transaction-monitor"

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ContractScanner />
          <div className="space-y-8">
            <SecurityDashboard />
            <TransactionMonitor />
          </div>
        </div>
      </section>
    </>
  )
}
