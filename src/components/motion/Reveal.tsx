import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RevealProps = PropsWithChildren<{ className?: string; delay?: number; y?: number }>

export default function Reveal({ children, className, delay = 0, y = 12 }: RevealProps) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '0px 0px 80px 0px' }}
      transition={{ duration: 0.25, delay: Math.min(delay, 0.05), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
