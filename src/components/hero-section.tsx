"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import Link from "next/link"
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const initGsap = async () => {
      const gsap = (await import("gsap")).default
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      const cards = containerRef.current.querySelectorAll(".hero-card")
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.15 * i,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }

    initGsap()
  }, [])

  const features = [
    {
      title: "Smart Contract Scanner",
      desc: "Analyze any ERC-20 contract for vulnerabilities, compliance, and security risks in real time.",
      icon: ShieldCheckIcon,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Transaction Monitor",
      desc: "Track and verify blockchain transactions with detailed receipt data and status checks.",
      icon: ArrowRightIcon,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Security Dashboard",
      desc: "Real-time overview of wallet balances, network status, and security metrics across chains.",
      icon: ShieldCheckIcon,
      gradient: "from-violet-500 to-purple-600",
    },
  ]

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent dark:from-emerald-500/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            AI-Powered Blockchain Security
          </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex justify-center mb-6"
            >
              <Logo size={64} animated showText={false} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Blockchain Security{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Reimagined
              </span>
            </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Analyze smart contracts, monitor transactions, and detect threats
            across Ethereum, Base, and L2 networks — powered by advanced AI
            analysis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="h-11 px-6 text-base gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/25">
                Get Started
                <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="h-11 px-6 text-base">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="hero-card group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.25, 0.1, 0, 1] }}
              >
                <div className={`inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white mb-4 shadow-sm`}>
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
