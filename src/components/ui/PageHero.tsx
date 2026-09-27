import ContentGallery from '../../content/ContentGallery'
import { sectionVisible, useContent } from '../../content/store'
import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type Props = { eyebrow?: string; title: string; intro: string; children?: ReactNode }
export default function PageHero({ eyebrow, title, intro, children }: Props) {
  const preferredReducedMotion = useReducedMotion()
  const { appearance } = useContent()
  const reduce = preferredReducedMotion || !appearance.pageAnimation
  const orbitRef = useRef<HTMLDivElement>(null)
  const orbitInView = useInView(orbitRef)
  return <section className="page-hero" hidden={!sectionVisible("PageHero.section-1")}><div className="hero-noise"/><div className="shell page-hero-inner"><motion.div initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><span className="eyebrow eyebrow-light">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{children}</motion.div><div ref={orbitRef} className={`page-orbit${orbitInView && !reduce ? ' is-animating' : ''}`} aria-hidden="true"><span/><span/><span/><i/></div></div><ContentGallery sectionId="PageHero.section-1" /></section>
}
