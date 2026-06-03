"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
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
          <DropdownMenuGroup>
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const available = connectors.filter((c) => c.name !== "WalletConnect")

  if (available.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-all outline-none select-none shadow-sm",
          "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600",
          isPending && "pointer-events-none opacity-60"
        )}
      >
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <WalletIcon className="size-4" />
        )}
        {isPending ? "Connecting..." : "Connect"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {available.map((connector) => (
            <DropdownMenuItem
              key={connector.id}
              onClick={() => connect({ connector })}
              className="gap-2"
            >
              {connector.icon ? (
                <img src={connector.icon} alt="" className="size-4 rounded-full" />
              ) : (
                <WalletIcon className="size-4" />
              )}
              {connector.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
