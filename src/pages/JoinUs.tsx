import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { ArrowRight, ArrowUpRight, Check, Clipboard, GraduationCap, Microscope, School, Users } from 'lucide-react'
import { useState } from 'react'
import Reveal from '../components/motion/Reveal'
import ExternalLink from '../components/ui/ExternalLink'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'



export default function JoinUs() {

  const opportunities = [
  { id:'postdoc', Icon:Microscope, title:contentText("JoinUs.001"), text:contentText("JoinUs.002"), requirements:[contentText("JoinUs.003"),contentText("JoinUs.004"),contentText("JoinUs.005"),contentText("JoinUs.006")] },
  { id:'phd', Icon:GraduationCap, title:contentText("JoinUs.007"), text:contentText("JoinUs.008"), requirements:[contentText("JoinUs.009"),contentText("JoinUs.010"),contentText("JoinUs.011")] },
  { id:'masters', Icon:School, title:contentText("JoinUs.012"), text:contentText("JoinUs.013"), requirements:[contentText("JoinUs.014"),contentText("JoinUs.015"),contentText("JoinUs.016")] },
  { id:'undergraduate', Icon:Users, title:contentText("JoinUs.017"), text:contentText("JoinUs.018"), requirements:[contentText("JoinUs.019"),contentText("JoinUs.020"),contentText("JoinUs.021")] },
]

  const { site } = useSiteData()
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => { await navigator.clipboard?.writeText(site.email); setCopied(true); window.setTimeout(()=>setCopied(false),1500) }
  return <>
    <SEO title={contentText("JoinUs.022")} description={contentText("JoinUs.023")} path="/join-us" />
    <PageHero eyebrow={contentText("JoinUs.024")} title={contentText("JoinUs.025")} intro={contentText("JoinUs.026")}><div className="hero-mini-actions"><a className="button button-accent" href={`mailto:${site.email}`}>{contentText("JoinUs.027")}<ArrowRight size={17}/></a></div></PageHero>
    <section className="section shell" hidden={!sectionVisible("JoinUs.section-1")}><Reveal><SectionHeading eyebrow={contentText("JoinUs.028")} title={contentText("JoinUs.029")} intro={contentText("JoinUs.030")} /></Reveal><div className="opportunity-grid">{opportunities.map(({ id,Icon,title,text,requirements },index) => <Reveal key={id} delay={index*.05}><article className="opportunity-card" id={id}><div className="opportunity-icon"><Icon/></div><span className="opportunity-index">{contentText("JoinUs.031")}{index+1}</span><h2>{title}</h2><p>{text}</p><ul className="check-list">{requirements.map((item) => <li key={item}><Check/>{item}</li>)}</ul></article></Reveal>)}</div><ContentGallery sectionId="JoinUs.section-1" /></section>
    <section className="section section-mist" id="internships" hidden={!sectionVisible("JoinUs.section-2")}><div className="shell internship-grid"><Reveal><div><span className="eyebrow">{contentText("JoinUs.032")}</span><h2>{contentText("JoinUs.033")}</h2><p>{contentText("JoinUs.034")}</p><p>{contentText("JoinUs.035")}</p></div></Reveal><Reveal delay={.08}><div className="program-links"><ExternalLink href={site.teepUrl}><div><small>{contentText("JoinUs.036")}</small><strong>{contentText("JoinUs.037")}</strong></div></ExternalLink><ExternalLink href={site.iippUrl}><div><small>{contentText("JoinUs.038")}</small><strong>{contentText("JoinUs.039")}</strong></div></ExternalLink></div></Reveal></div><ContentGallery sectionId="JoinUs.section-2" /></section>
    <section className="section shell" hidden={!sectionVisible("JoinUs.section-3")}><Reveal><div className="recruitment-contact"><div><span className="eyebrow">{contentText("JoinUs.040")}</span><h2>{contentText("JoinUs.041")}</h2><p>{contentText("JoinUs.042")}</p><div className="recruitment-email">{site.email}</div></div><div className="recruitment-actions"><a className="button button-dark" href={`mailto:${site.email}`}>{contentText("JoinUs.043")}<ArrowUpRight size={16}/></a><button className="button button-outline" onClick={copyEmail}><Clipboard size={16}/>{copied ? 'Copied' : 'Copy email'}</button></div></div></Reveal><ContentGallery sectionId="JoinUs.section-3" /></section>
  </>
}
