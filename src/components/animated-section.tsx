"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("scrollreveal").then((sr) => {
        const ScrollReveal = sr.default
        if (ScrollReveal && sectionRef.current) {
          ScrollReveal().reveal(sectionRef.current, {
            origin: "bottom",
            distance: "60px",
            duration: 1000,
            delay,
            easing: "cubic-bezier(0.5, 0, 0, 1)",
            reset: false,
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
