import ContentGallery, { ImageGallery } from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { Camera, Coffee, GraduationCap, Plane, UsersRound } from 'lucide-react'
import Reveal from '../components/motion/Reveal'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'

const icons = [Coffee, UsersRound, Plane, Camera, GraduationCap, Coffee]

export default function LabLife() {

  const { newsItems } = useSiteData()
  const life = newsItems.filter((item) => item.category === 'lab-life')
  return <>
    <SEO title={contentText("LabLife.001")} description={contentText("LabLife.002")} path="/lab-life" />
    <PageHero eyebrow={contentText("LabLife.003")} title={contentText("LabLife.004")} intro={contentText("LabLife.005")} />
    <section className="section shell" hidden={!sectionVisible("LabLife.section-1")}><div className="lab-life-intro"><Reveal><div><span className="eyebrow">{contentText("LabLife.006")}</span><h2>{contentText("LabLife.007")}</h2></div></Reveal><Reveal delay={.06}><p>{contentText("LabLife.008")}</p></Reveal></div><div className="lab-life-grid">{life.map((item,index) => { const Icon = icons[index % icons.length]; return <Reveal key={item.id} delay={index*.04}><article className="lab-life-card"><div className={`lab-life-visual visual-${(index%4)+1}`}>{item.images?.[0] ? <img src={item.images[0]} alt={item.title} loading="lazy" /> : <Icon/>}<span>{item.year}</span></div><div className="lab-life-body"><small>{item.date}</small><h2>{item.title}</h2><p>{item.summary}</p><ImageGallery images={(item.images ?? []).slice(1).map(src => ({src,alt:item.title,caption:''}))} /></div></article></Reveal> })}</div><div className="media-note"><Camera/><div><strong>{contentText("LabLife.009")}</strong><p>{contentText("LabLife.010")}<code>{contentText("LabLife.011")}</code>{contentText("LabLife.012")}</p></div></div><ContentGallery sectionId="LabLife.section-1" /></section>
  </>
}
