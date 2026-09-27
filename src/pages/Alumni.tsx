import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { useMemo, useState } from 'react'
import Reveal from '../components/motion/Reveal'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'
import Avatar from '../components/ui/Avatar'
import type { AlumniCategory } from '../types'



export default function Alumni() {

  const filters: { label: string; value: 'all' | AlumniCategory }[] = [
  { label: contentText("Alumni.001"), value: 'all' },
  { label: contentText("Alumni.002"), value: 'phd' },
  { label: contentText("Alumni.003"), value: 'masters' },
  { label: contentText("Alumni.004"), value: 'undergraduate' },
]

  const { alumni } = useSiteData()
  const [filter, setFilter] = useState<'all' | AlumniCategory>('all')
  const items = useMemo(() => filter === 'all' ? alumni : alumni.filter((person) => person.category === filter), [filter, alumni])
  return <>
    <SEO title={contentText("Alumni.005")} description={contentText("Alumni.006")} path="/people/alumni" />
    <PageHero eyebrow={contentText("Alumni.007")} title={contentText("Alumni.008")} intro={contentText("Alumni.009")} />
    <section className="section shell" hidden={!sectionVisible("Alumni.section-1")}>
      <div className="filter-row alumni-filters" role="group" aria-label={contentText("Alumni.010")}>{filters.map((item) => <button key={item.value} className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)}>{item.label}</button>)}</div>
      <div className="alumni-grid">{items.map((person, index) => <Reveal key={person.id} delay={index*.04}><article className="alumni-card"><div className="alumni-avatar"><Avatar person={person}/></div><span className="eyebrow">{person.previousRole}</span><h3>{person.name}{person.nickname ? <small>{contentText("Alumni.011")}{person.nickname}</small> : null}</h3>{person.bio && <p>{person.bio}</p>}{person.coSupervised && <p className="alumni-note">{person.coSupervised}</p>}{person.thesisTitle && <div className="thesis-block"><small>{contentText("Alumni.012")}</small><p>{person.thesisTitle}</p></div>}{person.currentPosition && <div className="thesis-block"><small>{contentText("Alumni.013")}</small><p>{person.currentPosition}</p></div>}</article></Reveal>)}</div>
    <ContentGallery sectionId="Alumni.section-1" /></section>
  </>
}
