import ContentGallery, { ImageGallery } from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { ArrowRight, Check, ExternalLink as ExternalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal'
import PublicationCard from '../components/publications/PublicationCard'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'

export default function Research() {

  const { publications, researchAreas } = useSiteData()
  return <>
    <SEO title={contentText("Research.001")} description={contentText("Research.002")} path="/research" />
    <PageHero eyebrow={contentText("Research.003")} title={contentText("Research.004")} intro={contentText("Research.005")} />

    <section className="section shell research-intro-section" hidden={!sectionVisible("Research.section-1")}><div className="research-intro-grid"><Reveal><div><span className="eyebrow">{contentText("Research.006")}</span><h2>{contentText("Research.007")}</h2></div></Reveal><Reveal delay={.06}><div className="research-intro-copy"><p>{contentText("Research.008")}</p><p>{contentText("Research.009")}</p></div></Reveal></div><ContentGallery sectionId="Research.section-1" /></section>

    <div className="research-sections">
      {researchAreas.map((area, index) => {
        const related = publications.filter((publication) => publication.topics.some((topic) => area.topicMatches.includes(topic))).slice(0, 2)
        return <section className={`section research-detail ${index % 2 ? 'research-detail-alt' : ''}`} id={area.slug} key={area.slug} hidden={!sectionVisible("Research.section-2")}><div className="shell research-detail-grid">
          <Reveal className="research-detail-media"><div className="research-figure"><img src={area.image} alt={`Conceptual illustration for ${area.title}`} loading="lazy"/><div className="research-figure-caption"><span>{String(index+1).padStart(2,'0')}</span><p>{contentText("Research.010")}</p></div></div><ImageGallery images={(area.images ?? []).map(src => ({src,alt:area.title,caption:''}))} /></Reveal>
          <Reveal delay={.06} className="research-detail-copy"><span className="eyebrow">{area.eyebrow}</span><h2>{area.title}</h2>{area.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="research-columns"><div><h3>{contentText("Research.011")}</h3><ul className="check-list">{area.questions.map((item) => <li key={item}><Check/>{item}</li>)}</ul></div><div><h3>{contentText("Research.012")}</h3><div className="tag-cloud">{area.methods.map((method) => <span key={method}>{method}</span>)}</div></div></div></Reveal>
        </div>{related.length > 0 && <div className="shell selected-publications"><div className="mini-heading"><span>{contentText("Research.013")}</span><Link to="/publications">{contentText("Research.014")}<ArrowRight size={14}/></Link></div><div className="publication-stack">{related.map((publication) => <PublicationCard publication={publication} compact key={publication.id}/>)}</div></div>}<ContentGallery sectionId="Research.section-2" /></section>
      })}
    </div>

    <section className="section section-ink" hidden={!sectionVisible("Research.section-3")}><div className="shell research-source-note"><Reveal><div><span className="eyebrow eyebrow-light">{contentText("Research.015")}</span><h2>{contentText("Research.016")}</h2><p>{contentText("Research.017")}</p></div></Reveal><Reveal delay={.08}><a className="button button-accent" href={contentText("Research.018")} target="_blank" rel="noopener noreferrer">{contentText("Research.019")}<ExternalIcon size={16}/></a></Reveal></div><ContentGallery sectionId="Research.section-3" /></section>
  </>
}
