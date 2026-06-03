# BlockSec AI — Blockchain Security Analysis Platform

Plataforma de análisis de seguridad blockchain con inteligencia artificial, construida con **Next.js 16**, **Wagmi v3** y **shadcn/ui**.

## Stack Tecnológico

### Frontend & UI
| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | 16 (App Router) | Framework React full-stack |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 4 | Estilos utilitarios |
| shadcn/ui | latest | Componentes UI accesibles (Base UI / Radix) |
| Framer Motion | 12 | Animaciones declarativas |
| GSAP + ScrollTrigger | 3.15 | Animaciones de scroll avanzadas |
| ScrollReveal | 4 | Animaciones de entrada al hacer scroll |
| Lucide React | latest | Iconografía |

### Blockchain & Web3
| Tecnología | Propósito |
|---|---|
| **Wagmi v3** | Hooks React para Ethereum (conexión wallet, contratos, transacciones) |
| **Viem** | Interface TypeScript para Ethereum (tipos, ABI, chains) |
| **ethers v6** | Librería Ethereum (parseo de datos, utilidades) |
| **TanStack React Query** | Cache y estado de datos asíncronos |
| **SIWE** | Sign-In with Ethereum |

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz (Providers, Header, fonts)
│   ├── page.tsx                # Landing page con Hero + herramientas
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard con Tabs (Scanner / Monitor / Dashboard)
│   └── globals.css             # Tailwind v4 + variables CSS shadcn
├── components/
│   ├── ui/                     # Componentes shadcn/ui generados
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── alert.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tooltip.tsx
│   │   ├── separator.tsx
│   │   └── scroll-area.tsx
│   ├── providers.tsx           # WagmiProvider + QueryClientProvider
│   ├── header.tsx              # Navbar fija con NavigationMenu
│   ├── wallet-connect.tsx      # Botón de conexión wallet (DropdownMenu)
│   ├── hero-section.tsx        # Hero animado (GSAP ScrollTrigger)
│   ├── animated-section.tsx    # Wrapper ScrollReveal + Framer Motion
│   ├── contract-scanner.tsx    # Escáner de contratos ERC-20
│   ├── security-dashboard.tsx  # Dashboard de seguridad y métricas
│   └── transaction-monitor.tsx # Monitor de transacciones blockchain
└── lib/
    ├── web3.ts                 # Configuración Wagmi (mainnet, sepolia, base)
    └── utils.ts                # Utilidad cn() para clases condicionales
```

## Funcionalidades

### 1. Conexión de Wallet
- Conexión con MetaMask, WalletConnect y wallets inyectados
- DropdownMenu con dirección, estado y opción de desconexión
- Badge animado de estado (conectado/desconectado)

### 2. Smart Contract Scanner
- Escanea contratos ERC-20 ingresando una dirección
- Valida dirección (checksum EIP-55)
- Detecta nombre, símbolo y total supply del token
- Checklist visual de seguridad con estados passed/failed
- Animaciones de entrada con framer-motion

### 3. Transaction Monitor
- Busca transacciones por hash
- Muestra estado (Success/Failed), bloque, gas usado, from/to
- Feedback visual con loading spinner y estados de error
- Detalles formateados con iconos por campo

### 4. Security Dashboard
- Estado de conexión de wallet
- Balance nativo de la red conectada
- Detección de red (Ethereum Mainnet, Base, Sepolia, etc.)
- Número de bloque actual de Ethereum
- Badge de estado Secure / Alert

### 5. Animaciones
- **Framer Motion**: Transiciones suaves, entradas con whileInView, AnimatePresence
- **GSAP ScrollTrigger**: Animaciones de cards al hacer scroll
- **ScrollReveal**: Efectos de entrada en componentes al viewport
- Efectos glassmorphism, gradientes, sombras

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/blockchain_security_ai.git
cd blockchain_security_ai

# Instalar dependencias
yarn install

# Configurar variables de entorno
cp .env.example .env.local
# Editar NEXT_PUBLIC_WC_PROJECT_ID con tu Project ID de WalletConnect
```

## Scripts

| Comando | Descripción |
|---|---|
| `yarn dev` | Inicia servidor de desarrollo en `localhost:3000` |
| `yarn build` | Compila para producción |
| `yarn start` | Sirve la build de producción |
| `yarn lint` | Ejecuta ESLint |

## Variables de Entorno

```env
NEXT_PUBLIC_WC_PROJECT_ID=tu_project_id_walletconnect
```

^(Opcional — si no se configura, solo funcionará el connector inyectado/MetaMask)

## Redes Soportadas

| Red | Chain ID | RPC |
|---|---|---|
| Ethereum Mainnet | 1 | http (público) |
| Sepolia | 11155111 | http (público) |
| Base | 8453 | http (público) |

## Licencia

MIT
