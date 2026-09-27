import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { ArrowRight, Atom, FlaskConical, Lightbulb, Microscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import ResearchOverview from '../components/home/ResearchOverview'
import ResearchPathway from '../components/home/ResearchPathway'
import ScientificHero from '../components/home/ScientificHero'
import Reveal from '../components/motion/Reveal'
import NewsCard from '../components/news/NewsCard'
import PersonCard from '../components/people/PersonCard'
import PublicationCard from '../components/publications/PublicationCard'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'

export default function Home() {

  const { newsItems, people, publications, site, appearance } = useSiteData()
  const reduce = useReducedMotion()
  const featuredPeople = people.slice(0, 4)
  const latestPublications = publications.slice(0, 3)
  const latestNews = newsItems.slice(0, 3)
  const researchMemberCount = people.filter((person) => person.category !== 'administration').length

  const organizationSchema = {
    '@context': 'https://schema.org', '@type': 'ResearchOrganization', name: 'Team VW', url: site.url,
    parentOrganization: { '@type': 'CollegeOrUniversity', name: site.university, url: site.nsysuUrl },
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: 'No. 70 Lien-Hai Rd.', addressLocality: 'Kaohsiung', postalCode: '80424', addressCountry: 'TW' },
    knowsAbout: ['Sustainable catalysis', 'Electrocatalysis', 'Photoelectrocatalysis', 'Photoredox catalysis']
  }

  return <>
    <SEO title={contentText("Home.001")} description={contentText("Home.002")} jsonLd={organizationSchema} />

    <section className="home-hero" hidden={!sectionVisible("Home.section-1")}>
      <div className="hero-cover" aria-hidden="true" hidden={!appearance.heroPhoto}><img src={contentText("Home.003")} alt="" width={1369} height={595} fetchPriority="high" /></div>
      <div className="hero-noise"/>
      <div className="shell hero-grid">
        <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.22,1,0.36,1] }}>
          <span className="hero-kicker">{contentText("Home.004")}</span>
          <h1><span className="hero-title-line">{contentText("Home.005")}</span>{' '}<em><span className="hero-title-line">{contentText("Home.006")}</span>{' '}<span className="hero-title-line">{contentText("Home.007")}</span></em></h1>
          <p>{contentText("Home.008")}</p>
          <div className="hero-actions"><Link className="button button-accent" to="/research">{contentText("Home.009")}<ArrowRight size={18}/></Link><Link className="button button-ghost" to="/people">{contentText("Home.010")}</Link><Link className="hero-inline-link" to="/publications">{contentText("Home.011")}<ArrowRight size={14}/></Link></div>
          <div className="hero-proof"><div><strong>{researchMemberCount}</strong><span>{contentText("Home.012")}</span></div><div><strong>{contentText("Home.013")}</strong><span>{contentText("Home.014")}</span></div><div><strong>{publications.length}</strong><span>{contentText("Home.015")}</span></div></div>
        </motion.div>
        <motion.div initial={reduce ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }}><ScientificHero /></motion.div>
      </div>
      <div className="hero-edge-label"><span>{contentText("Home.016")}</span><i/>{contentText("Home.017")}</div>
    <ContentGallery sectionId="Home.section-1" /></section>

    <ResearchOverview />
    <ResearchPathway />

    <section className="section shell" hidden={!sectionVisible("Home.section-2")}>
      <Reveal><SectionHeading eyebrow={contentText("Home.018")} title={contentText("Home.019")} intro={contentText("Home.020")} /></Reveal>
      <div className="feature-grid">
        {[
          { Icon: Atom, title: contentText("Home.021"), text: contentText("Home.022") },
          { Icon: Microscope, title: contentText("Home.023"), text: contentText("Home.024") },
          { Icon: Lightbulb, title: contentText("Home.025"), text: contentText("Home.026") },
        ].map(({ Icon, title, text }, index) => <Reveal key={title} delay={index*.07}><article className="feature-card"><div className="feature-icon"><Icon/></div><span>{contentText("Home.027")}{index+1}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}
      </div>
    <ContentGallery sectionId="Home.section-2" /></section>

    <section className="section section-ink" hidden={!sectionVisible("Home.section-3")}>
      <div className="shell">
        <Reveal><div className="highlight-header"><SectionHeading eyebrow={contentText("Home.028")} title={contentText("Home.029")} intro={contentText("Home.030")} /><Link className="text-link text-link-light" to="/research">{contentText("Home.031")}<ArrowRight size={16}/></Link></div></Reveal>
        <div className="highlight-grid">
          <Reveal><article className="highlight-primary"><div className="highlight-glyph"><span>{contentText("Home.032")}</span><i>{contentText("Home.033")}</i></div><div><span className="eyebrow eyebrow-light">{contentText("Home.034")}</span><h3>{contentText("Home.035")}</h3><p>{contentText("Home.036")}</p><Link className="text-link text-link-light" to="/publications">{contentText("Home.037")}<ArrowRight size={15}/></Link></div></article></Reveal>
          <div className="highlight-side">
            <Reveal delay={.06}><article><FlaskConical/><span className="eyebrow eyebrow-light">{contentText("Home.038")}</span><h3>{contentText("Home.039")}</h3><p>{contentText("Home.040")}</p></article></Reveal>
            <Reveal delay={.12}><article><Lightbulb/><span className="eyebrow eyebrow-light">{contentText("Home.041")}</span><h3>{contentText("Home.042")}</h3><p>{contentText("Home.043")}</p></article></Reveal>
          </div>
        </div>
      </div>
    <ContentGallery sectionId="Home.section-3" /></section>

    <section className="section shell" hidden={!sectionVisible("Home.section-4")}>
      <Reveal><div className="section-row"><SectionHeading eyebrow={contentText("Home.044")} title={contentText("Home.045")} intro={contentText("Home.046")} /><Link className="button button-outline" to="/publications">{contentText("Home.047")}<ArrowRight size={17}/></Link></div></Reveal>
      <div className="publication-stack home-publications">{latestPublications.map((publication, index) => <Reveal key={publication.id} delay={index*.05}><PublicationCard publication={publication} compact /></Reveal>)}</div>
    <ContentGallery sectionId="Home.section-4" /></section>

    <section className="section section-mist" hidden={!sectionVisible("Home.section-5")}>
      <div className="shell">
        <Reveal><div className="section-row"><SectionHeading eyebrow={contentText("Home.048")} title={contentText("Home.049")} intro={contentText("Home.050")} /><Link className="button button-dark" to="/people">{contentText("Home.051")}<ArrowRight size={17}/></Link></div></Reveal>
        <div className="people-grid home-people">{featuredPeople.map((person, index) => <Reveal key={person.id} delay={index*.05}><PersonCard person={person} featured={index === 0}/></Reveal>)}</div>
      </div>
    <ContentGallery sectionId="Home.section-5" /></section>

    <section className="section shell" hidden={!sectionVisible("Home.section-6")}>
      <Reveal><div className="section-row"><SectionHeading eyebrow={contentText("Home.052")} title={contentText("Home.053")} intro={contentText("Home.054")} /><Link className="button button-outline" to="/news">{contentText("Home.055")}<ArrowRight size={17}/></Link></div></Reveal>
      <div className="news-grid">{latestNews.map((item, index) => <Reveal key={item.id} delay={index*.05}><NewsCard item={item}/></Reveal>)}</div>
    <ContentGallery sectionId="Home.section-6" /></section>

    <section className="join-banner" hidden={!sectionVisible("Home.section-7")}><div className="hero-noise"/><div className="shell join-banner-inner"><Reveal><div><span className="eyebrow eyebrow-light">{contentText("Home.056")}</span><h2>{contentText("Home.057")}<br/>{contentText("Home.058")}</h2><p>{contentText("Home.059")}</p></div></Reveal><Reveal delay={.08}><div className="join-actions"><Link className="button button-accent" to="/join-us">{contentText("Home.060")}<ArrowRight size={18}/></Link><a className="button button-ghost" href={`mailto:${site.email}`}>{contentText("Home.061")}</a></div></Reveal></div><ContentGallery sectionId="Home.section-7" /></section>
  </>
}
