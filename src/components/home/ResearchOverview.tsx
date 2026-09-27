import ContentGallery from '../../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../../content/store'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function ResearchOverview() {

  const { researchAreas } = useSiteData()
  const reduce = useReducedMotion()
  return <section className="section shell" hidden={!sectionVisible("ResearchOverview.section-1")}><Reveal><SectionHeading eyebrow={contentText("ResearchOverview.001")} title={contentText("ResearchOverview.002")} intro={contentText("ResearchOverview.003")} /></Reveal><div className="research-card-grid">{researchAreas.map((area, index) => <Reveal key={area.slug} delay={index*.06}><motion.article className="research-card" whileHover={reduce ? undefined : { y: -7 }} transition={{ duration: .24 }}><div className="research-image"><img src={area.image} alt="" loading="lazy"/><span>{String(index+1).padStart(2,'0')}</span></div><div className="research-card-body"><span className="eyebrow">{area.eyebrow}</span><h3>{area.title}</h3><p>{area.summary}</p><Link className="text-link" to={`/research#${area.slug}`}>{contentText("ResearchOverview.004")}{area.title} <ArrowRight size={16}/></Link></div></motion.article></Reveal>)}</div><ContentGallery sectionId="ResearchOverview.section-1" /></section>
}
