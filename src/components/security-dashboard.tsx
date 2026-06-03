"use client"

import { useAccount, useBalance, useBlockNumber, useChainId } from "wagmi"
import { mainnet } from "wagmi/chains"
import { formatUnits } from "viem"
import { motion } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "./animated-section"
import {
  WalletIcon,
  ActivityIcon,
  GlobeIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  LinkIcon,
} from "lucide-react"

const chainNames: Record<number, string> = {
  1: "Ethereum Mainnet",
  10: "Optimism",
  137: "Polygon",
  42161: "Arbitrum",
  8453: "Base",
  11155111: "Sepolia",
}

function StatCard({
  icon: Icon,
  label,
  value,
  status = "neutral",
  delay = 0,
}: {
  icon: typeof WalletIcon
  label: string
  value: string
  status?: "safe" | "warning" | "neutral"
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`inline-flex size-7 items-center justify-center rounded-md ${
              status === "safe"
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                : status === "warning"
                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Icon className="size-3.5" />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        </div>
        {status === "safe" && (
          <Badge variant="default" className="h-5 text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
            Secure
          </Badge>
        )}
        {status === "warning" && (
          <Badge variant="destructive" className="h-5 text-[10px]">
            Alert
          </Badge>
        )}
      </div>
      <p className="text-base font-semibold tracking-tight truncate">{value}</p>
    </motion.div>
  )
}

export function SecurityDashboard() {
  const { isConnected, address } = useAccount()
  const { data: balance } = useBalance({ address })
  const { data: blockNumber } = useBlockNumber({ chainId: mainnet.id })
  const chainId = useChainId()
  const networkName = chainId ? chainNames[chainId] ?? `Chain ${chainId}` : "Unknown"

  return (
    <AnimatedSection delay={0.2}>
      <Card className="overflow-hidden border-emerald-500/10 dark:border-emerald-500/20 h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
              <ShieldCheckIcon className="size-5" />
            </div>
            <div>
              <CardTitle>Security Dashboard</CardTitle>
              <CardDescription>
                Real-time security metrics and network status
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={WalletIcon}
              label="Status"
              value={isConnected ? "Connected" : "Disconnected"}
              status={isConnected ? "safe" : "warning"}
              delay={0}
            />
            <StatCard
              icon={ActivityIcon}
              label="Balance"
              value={
                balance
                  ? `${formatUnits(balance.value, balance.decimals)} ${balance.symbol}`
                  : "\u2014"
              }
              delay={0.05}
            />
            <StatCard
              icon={GlobeIcon}
              label="Network"
              value={networkName}
              delay={0.1}
            />
            <StatCard
              icon={LinkIcon}
              label="Ethereum Block"
              value={blockNumber ? `#${blockNumber.toString()}` : "—"}
              delay={0.15}
            />
          </div>

          {isConnected && address && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 rounded-lg bg-muted/50 p-3"
            >
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Connected Wallet
              </p>
              <p className="text-xs font-mono text-foreground/80 truncate">
                {address}
              </p>
            </motion.div>
          )}

          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30"
            >
              <div className="flex items-start gap-2">
                <AlertTriangleIcon className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    No wallet connected
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                    Connect your wallet to view balances and security metrics.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
