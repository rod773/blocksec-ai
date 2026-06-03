"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { WalletIcon, LogOutIcon, CheckCircleIcon, Loader2Icon } from "lucide-react"

export function WalletConnect() {
  const { isConnected, address } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background h-8 gap-1.5 px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline font-mono text-xs">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <span className="sm:hidden font-mono text-xs">
            {address.slice(0, 4)}...{address.slice(-2)}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2 text-xs font-normal">
            <CheckCircleIcon className="size-3.5 text-emerald-500" />
            Connected
          </DropdownMenuLabel>
          <div className="px-2 py-1.5">
            <p className="text-xs font-mono text-muted-foreground truncate">{address}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()} className="gap-2 text-destructive focus:text-destructive">
            <LogOutIcon className="size-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {connectors
        .filter((c) => c.name !== "WalletConnect")
        .slice(0, 1)
        .map((connector) => (
          <motion.div
            key={connector.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={() => connect({ connector })}
              disabled={isPending}
              size="sm"
              className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 shadow-sm"
            >
              {isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <WalletIcon className="size-4" />
              )}
              {isPending ? "Connecting..." : "Connect"}
            </Button>
          </motion.div>
        ))}
    </AnimatePresence>
  )
}
