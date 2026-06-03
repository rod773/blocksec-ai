"use client"

import { motion, type Variants } from "framer-motion"

type LogoProps = {
  size?: number
  animated?: boolean
  showText?: boolean
}

const iconVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
  },
}

const nodeVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, delay: 0.4 + i * 0.15, ease: "easeInOut" as const },
  }),
}

export function Logo({ size = 32, animated = true, showText = true }: LogoProps) {
  const pulse = animated
    ? { scale: [1, 1.08, 1] as number[], opacity: [0.8, 1, 0.8] as number[] }
    : undefined

  const shieldContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <motion.path
        d="M16 2 L28 8 L28 16 C28 23 22 28 16 30 C10 28 4 23 4 16 L4 8 Z"
        fill="url(#logoGrad)"
        initial={animated ? { scale: 0.8 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? { duration: 0.5, ease: "easeOut" } : undefined}
      />

      <motion.circle
        cx="12" cy="13" r="1.8" fill="white"
        animate={pulse}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="20" cy="13" r="1.8" fill="white"
        animate={pulse}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.circle
        cx="16" cy="19" r="1.8" fill="white"
        animate={pulse}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.line
        x1="12" y1="13" x2="20" y2="13"
        stroke="white" strokeWidth="1.2" strokeLinecap="round"
        variants={animated ? nodeVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
        custom={0}
      />
      <motion.line
        x1="12" y1="13" x2="16" y2="19"
        stroke="white" strokeWidth="1.2" strokeLinecap="round"
        variants={animated ? nodeVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
        custom={1}
      />
      <motion.line
        x1="20" y1="13" x2="16" y2="19"
        stroke="white" strokeWidth="1.2" strokeLinecap="round"
        variants={animated ? nodeVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
        custom={2}
      />
    </svg>
  )

  if (!showText) {
    return animated ? (
      <motion.div variants={iconVariants} initial="initial" animate="animate">
        {shieldContent}
      </motion.div>
    ) : (
      shieldContent
    )
  }

  return (
    <motion.div
      className="flex items-center gap-2.5"
      variants={animated ? iconVariants : undefined}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
    >
      {shieldContent}
      <span className="font-bold tracking-tight">
        BlockSec{" "}
        <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
          AI
        </span>
      </span>
    </motion.div>
  )
}

export function LogoSvg({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoSvgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L28 8 L28 16 C28 23 22 28 16 30 C10 28 4 23 4 16 L4 8 Z"
        fill="url(#logoSvgGrad)"
      />
      <circle cx="12" cy="13" r="1.8" fill="white" />
      <circle cx="20" cy="13" r="1.8" fill="white" />
      <circle cx="16" cy="19" r="1.8" fill="white" />
      <line x1="12" y1="13" x2="20" y2="13" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="13" x2="16" y2="19" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="13" x2="16" y2="19" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
