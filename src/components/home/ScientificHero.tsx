import { contentText, useContent } from '../../content/store'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'



export default function ScientificHero() {

  const nodes = [
  { label: contentText("ScientificHero.001"), x: '18%', y: '29%', delay: 0 },
  { label: contentText("ScientificHero.002"), x: '78%', y: '24%', delay: .4 },
  { label: contentText("ScientificHero.003"), x: '83%', y: '73%', delay: .8 },
  { label: contentText("ScientificHero.004"), x: '22%', y: '77%', delay: 1.2 },
]
  const preferredReducedMotion = useReducedMotion()
  const { appearance } = useContent()
  const reduce = preferredReducedMotion || !appearance.heroAnimation
  const heroRef = useRef<HTMLDivElement>(null)
  const inView = useInView(heroRef)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 100, damping: 18 })
  const sy = useSpring(my, { stiffness: 100, damping: 18 })
  const rotateX = useTransform(sy, [-.5,.5], [5,-5])
  const rotateY = useTransform(sx, [-.5,.5], [-6,6])
  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - .5)
    my.set((event.clientY - rect.top) / rect.height - .5)
  }
  return (
    <motion.div ref={heroRef} className={`scientific-hero${inView && !reduce ? ' is-animating' : ''}`} onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0) }} style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }} aria-label={contentText("ScientificHero.005")}>
      <div className="hero-gridlines"/>
      <div className="hero-core"><span>{contentText("ScientificHero.006")}</span><small>{contentText("ScientificHero.007")}</small></div>
      <div className="molecule-ring ring-one"/>
      <div className="molecule-ring ring-two"/>
      <svg className="hero-curve" viewBox="0 0 620 430" aria-hidden="true"><path d="M18 305 C92 301 104 120 172 224 C231 316 251 100 317 219 C378 329 410 94 474 199 C525 283 548 180 606 172"/><path className="curve-echo" d="M18 329 C92 325 104 144 172 248 C231 340 251 124 317 243 C378 353 410 118 474 223 C525 307 548 204 606 196"/></svg>
      {nodes.map((node) => <div key={node.label} className="science-node" style={{ left: node.x, top: node.y, animationDelay: `${node.delay}s` }}>{node.label}</div>)}
      <div className="hero-caption"><span>{contentText("ScientificHero.008")}</span><i/><span>{contentText("ScientificHero.009")}</span><i/><span>{contentText("ScientificHero.010")}</span></div>
    </motion.div>
  )
}
