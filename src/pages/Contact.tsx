import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { ArrowUpRight, Building2, Copy, FlaskConical, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import Reveal from '../components/motion/Reveal'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'

export default function Contact() {

  const { site } = useSiteData()
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard?.writeText(site.email); setCopied(true); window.setTimeout(()=>setCopied(false),1500) }
  return <>
    <SEO title={contentText("Contact.001")} description={contentText("Contact.002")} path="/contact" />
    <PageHero eyebrow={contentText("Contact.003")} title={contentText("Contact.004")} intro={contentText("Contact.005")} />
    <section className="section shell contact-grid" hidden={!sectionVisible("Contact.section-1")}><Reveal><div className="contact-card"><div><Mail/><div><small>{contentText("Contact.006")}</small><a href={`mailto:${site.email}`}>{site.email}</a><button className="inline-copy" onClick={copy}><Copy size={13}/>{copied ? 'Copied' : 'Copy'}</button></div></div><div><Phone/><div><small>{contentText("Contact.007")}</small><a href={site.phoneHref}>{site.phoneDisplay}</a></div></div><div><Building2/><div><small>{contentText("Contact.008")}</small>{site.addressLines.map((line) => <strong key={line}>{line}</strong>)}</div></div><div><FlaskConical/><div><small>{contentText("Contact.009")}</small><strong>{contentText("Contact.010")}{site.lab}</strong><strong>{contentText("Contact.011")}{site.office}</strong></div></div><a className="button button-dark" href={site.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17}/>{contentText("Contact.012")}<ArrowUpRight size={16}/></a></div></Reveal><Reveal delay={.08}><div className="map-frame"><iframe title={contentText("Contact.013")} src={contentText("Contact.014")} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="map-caption"><MapPin/><div><strong>{contentText("Contact.015")}</strong><span>{contentText("Contact.016")}</span></div></div></div></Reveal><ContentGallery sectionId="Contact.section-1" /></section>
    <section className="section section-mist" hidden={!sectionVisible("Contact.section-2")}><div className="shell getting-here"><Reveal><div><span className="eyebrow">{contentText("Contact.017")}</span><h2>{contentText("Contact.018")}</h2><p>{contentText("Contact.019")}</p></div></Reveal><Reveal delay={.06}><div className="contact-links"><a href={site.chemistryUrl} target="_blank" rel="noopener noreferrer">{contentText("Contact.020")}<ArrowUpRight size={15}/></a><a href={site.nsysuUrl} target="_blank" rel="noopener noreferrer">{contentText("Contact.021")}<ArrowUpRight size={15}/></a></div></Reveal></div><ContentGallery sectionId="Contact.section-2" /></section>
  </>
}
