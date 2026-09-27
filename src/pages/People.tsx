import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal'
import PersonCard from '../components/people/PersonCard'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'
import SectionHeading from '../components/ui/SectionHeading'
import type { PersonCategory } from '../types'

const order: PersonCategory[] = ['pi','postdoc','phd','masters','undergraduate','administration']

export default function People() {

  const { categoryLabels, people } = useSiteData()
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return people
    return people.filter((person) => [person.name, person.nickname, person.role, person.shortBio, ...(person.researchInterests ?? [])].filter(Boolean).join(' ').toLowerCase().includes(q))
  }, [query, people])

  return <>
    <SEO title={contentText("People.001")} description={contentText("People.002")} path="/people" />
    <PageHero eyebrow={contentText("People.003")} title={contentText("People.004")} intro={contentText("People.005")} />
    <section className="section shell people-page" hidden={!sectionVisible("People.section-1")}>
      <div className="people-toolbar"><div><span className="eyebrow">{contentText("People.006")}</span><h2>{filtered.length}{contentText("People.007")}</h2></div><label className="search-box people-search"><Search/><span className="sr-only">{contentText("People.008")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={contentText("People.009")}/></label></div>
      {order.map((category) => {
        const members = filtered.filter((person) => person.category === category)
        if (!members.length) return null
        return <section className="people-group" key={category} hidden={!sectionVisible("People.section-2")}><Reveal><SectionHeading eyebrow={category === 'pi' ? 'Leadership' : 'Team'} title={categoryLabels[category]} /></Reveal><div className={`people-grid ${category === 'pi' ? 'people-grid-pi' : ''}`}>{members.map((person, index) => <Reveal key={person.id} delay={index*.04}><PersonCard person={person} featured={category === 'pi'}/></Reveal>)}</div><ContentGallery sectionId="People.section-2" /></section>
      })}
      {filtered.length === 0 && <div className="empty-state"><h3>{contentText("People.010")}{query}{contentText("People.011")}</h3><p>{contentText("People.012")}</p><button className="button button-outline" onClick={() => setQuery('')}>{contentText("People.013")}</button></div>}
      <div className="alumni-callout"><div><span className="eyebrow">{contentText("People.014")}</span><h2>{contentText("People.015")}</h2><p>{contentText("People.016")}</p></div><Link className="button button-dark" to="/people/alumni">{contentText("People.017")}</Link></div>
    <ContentGallery sectionId="People.section-1" /></section>
  </>
}
