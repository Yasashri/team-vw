import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/ui/Avatar'
import SEO from '../components/ui/SEO'
import NotFound from './NotFound'

export default function PersonProfile() {

  const { people } = useSiteData()
  const { slug } = useParams()
  const person = people.find((entry) => entry.slug === slug)
  if (!person) return <NotFound />
  const schema = { '@context':'https://schema.org', '@type':'Person', name:person.name, jobTitle:person.role, affiliation:{ '@type':'ResearchOrganization', name:'Team VW, National Sun Yat-sen University' }, ...(person.email ? { email: `mailto:${person.email}` } : {}) }
  return <>
    <SEO title={`${person.name} | Team VW`} description={person.shortBio ?? `${person.name}, ${person.role} at Team VW.`} path={`/people/${person.slug}`} type="profile" jsonLd={schema}/>
    <section className="profile-hero" hidden={!sectionVisible("PersonProfile.section-1")}><div className="hero-noise"/><div className="shell profile-grid"><div className="profile-portrait"><Avatar person={person}/></div><div><Link className="back-link" to="/people"><ArrowLeft size={15}/>{contentText("PersonProfile.001")}</Link><span className="eyebrow eyebrow-light">{person.role}</span><h1>{person.name}</h1>{person.nickname && <p className="profile-nickname">{contentText("PersonProfile.002")}{person.nickname}</p>}<p className="profile-lead">{person.shortBio}</p>{person.email && <a className="button button-accent" href={`mailto:${person.email}`}><Mail size={16}/>{contentText("PersonProfile.003")}</a>}</div></div><ContentGallery sectionId="PersonProfile.section-1" /></section>
    <section className="section shell profile-content" hidden={!sectionVisible("PersonProfile.section-2")}><div><span className="eyebrow">{contentText("PersonProfile.004")}</span><h2>{contentText("PersonProfile.005")}</h2>{person.bio?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{!person.bio?.length && <p>{contentText("PersonProfile.006")}</p>}</div><aside>{person.researchInterests && <div className="profile-aside-block"><h3>{contentText("PersonProfile.007")}</h3><div className="tag-cloud">{person.researchInterests.map((interest) => <span key={interest}>{interest}</span>)}</div></div>}{person.education && <div className="profile-aside-block"><h3>{contentText("PersonProfile.008")}</h3><ul>{person.education.map((entry) => <li key={entry}>{entry}</li>)}</ul></div>}{person.career && <div className="profile-aside-block"><h3>{contentText("PersonProfile.009")}</h3><ul>{person.career.map((entry) => <li key={entry}>{entry}</li>)}</ul></div>}{person.links && <div className="profile-aside-block"><h3>{contentText("PersonProfile.010")}</h3>{person.links.filter(link => link.url).map((link) => <a className="external-link" href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.label}<ArrowUpRight size={14}/></a>)}</div>}</aside><ContentGallery sectionId="PersonProfile.section-2" /></section>
  </>
}
