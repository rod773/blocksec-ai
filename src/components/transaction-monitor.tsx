"use client"

import { useEffect, useRef, useState } from "react"
import { isHash } from "viem"
import { useWaitForTransactionReceipt } from "wagmi"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "./animated-section"
import {
  SearchIcon,
  ActivityIcon,
  CheckCircle2Icon,
  XCircleIcon,
  Loader2Icon,
  ExternalLinkIcon,
  HashIcon,
  BlocksIcon,
  FuelIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
} from "lucide-react"

export function TransactionMonitor() {
  const [txHash, setTxHash] = useState("")
  const [searched, setSearched] = useState(false)

  const isValidHash = isHash(txHash)

  const { data: receipt, isLoading, isError } = useWaitForTransactionReceipt({
    hash: searched && isValidHash ? (txHash as `0x${string}`) : undefined,
  })

  const handleSearch = () => {
    if (!isValidHash) return
    setSearched(true)
  }

  const items = receipt
    ? [
        {
          label: "Status",
          value: receipt.status === "success" ? "Success" : "Failed",
          icon: receipt.status === "success" ? CheckCircle2Icon : XCircleIcon,
          highlight: true,
        },
        { label: "Block", value: `#${receipt.blockNumber.toString()}`, icon: BlocksIcon },
        { label: "Gas Used", value: receipt.gasUsed.toString(), icon: FuelIcon },
        { label: "From", value: receipt.from, icon: ArrowUpRightIcon, mono: true },
        {
          label: "To",
          value: receipt.to ?? "Contract creation",
          icon: ArrowDownLeftIcon,
          mono: true,
        },
      ]
    : []

  const lastPersistedHashRef = useRef<string | null>(null)

  useEffect(() => {
    const persist = async () => {
      if (!receipt) return
      if (!searched) return
      if (!txHash) return
      if (lastPersistedHashRef.current === txHash) return

      lastPersistedHashRef.current = txHash

      try {
        const res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hash: txHash,
            blockNumber: receipt.blockNumber.toString(),
            status: receipt.status,
            gasUsed: receipt.gasUsed.toString(),
            from: receipt.from,
            to: receipt.to ?? null,
          }),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => null)
          console.error(
            "Failed to persist transaction:",
            err ?? res.statusText
          )
        }
      } catch (e) {
        console.error("Failed to persist transaction:", e)
      }
    }

    persist()
  }, [receipt, searched, txHash])

  return (
    <AnimatedSection delay={0.1}>
      <Card className="overflow-hidden border-emerald-500/10 dark:border-emerald-500/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-sm">
              <ActivityIcon className="size-5" />
            </div>
            <div>
              <CardTitle>Transaction Monitor</CardTitle>
              <CardDescription>
                Track and verify blockchain transactions in real time
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <HashIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                value={txHash}
                onChange={(e) => {
                  setTxHash(e.target.value)
                  setSearched(false)
                }}
                placeholder="0x... (transaction hash)"
                className="pl-9 font-mono text-sm"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!isValidHash || isLoading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-sm"
            >
              {isLoading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <SearchIcon className="size-4" />
              )}
              {isLoading ? "Tracking..." : "Track"}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {searched && isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 py-8"
              >
                <Loader2Icon className="size-5 animate-spin text-cyan-500" />
                <span className="text-sm text-muted-foreground">Fetching transaction receipt...</span>
              </motion.div>
            )}

            {searched && isError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30"
              >
                <div className="flex items-start gap-2">
                  <XCircleIcon className="size-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                      Transaction not found
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                      Check the hash and try again. It may still be pending or the hash may be incorrect.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {receipt && (
              <motion.div
                key="receipt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <CheckCircle2Icon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    Transaction{" "}
                    {receipt.status === "success" ? "Confirmed" : "Failed"}
                  </span>
                  <Badge
                    variant={receipt.status === "success" ? "default" : "destructive"}
                    className="ml-auto text-[10px] h-5"
                  >
                    {receipt.status === "success" ? "Success" : "Failed"}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  {items.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className={`flex items-center justify-between rounded-lg bg-muted/30 p-2.5 ${
                          item.highlight
                            ? receipt.status === "success"
                              ? "border border-emerald-200 dark:border-emerald-900/30"
                              : "border border-red-200 dark:border-red-900/30"
                            : ""
                        }`}
                      >
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon className="size-3.5" />
                          {item.label}
                        </span>
                        <span
                          className={`text-xs font-medium truncate max-w-[180px] sm:max-w-[250px] text-right ${
                            item.mono ? "font-mono" : ""
                          } ${
                            item.highlight
                              ? receipt.status === "success"
                                ? "text-emerald-700 dark:text-emerald-400"
                                : "text-red-700 dark:text-red-400"
                              : "text-foreground"
                          }`}
                        >
                          {item.value}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {!searched && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <ExternalLinkIcon className="size-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  Enter a transaction hash to track its status and view details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
