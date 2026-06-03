import { createConfig, http, injected } from "wagmi"
import { mainnet, sepolia, base } from "wagmi/chains"
import { walletConnect } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? ""

export const config = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [
    injected(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
