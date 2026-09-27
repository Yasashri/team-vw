import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import Reveal from '../components/motion/Reveal'
import PublicationCard from '../components/publications/PublicationCard'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'


export default function Publications() {

  const { publications, publicationTopics } = useSiteData()
  const yearOptions = ['All', ...Array.from(new Set(publications.map(item => item.year))).sort((a,b) => b-a).map(String)]
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('All')
  const [topic, setTopic] = useState('All topics')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publications.filter((publication) => {
      const yearMatch = year === 'All' || publication.year === Number(year)
      const topicMatch = topic === 'All topics' || publication.topics.includes(topic)
      const textMatch = !q || [publication.title, publication.authors, publication.journal, publication.citation, ...publication.topics].join(' ').toLowerCase().includes(q)
      return yearMatch && topicMatch && textMatch
    })
  }, [query, year, topic, publications])

  const grouped = useMemo(() => Array.from(new Set(filtered.map((publication) => publication.year))).sort((a,b)=>b-a).map((groupYear) => ({ year: groupYear, publications: filtered.filter((publication) => publication.year === groupYear) })), [filtered])
  const clear = () => { setQuery(''); setYear('All'); setTopic('All topics') }
  const hasFilters = query || year !== 'All' || topic !== 'All topics'

  const schema = publications.slice(0, 8).map((publication) => ({ '@context':'https://schema.org', '@type':'ScholarlyArticle', name:publication.title, datePublished:String(publication.year), author:publication.authors, isPartOf:{ '@type':'Periodical', name:publication.journal }, ...(publication.doi ? { sameAs:`https://doi.org/${publication.doi}` } : {}) }))

  return <>
    <SEO title={contentText("Publications.001")} description={contentText("Publications.002")} path="/publications" jsonLd={schema}/>
    <PageHero eyebrow={contentText("Publications.003")} title={contentText("Publications.004")} intro={contentText("Publications.005")} />
    <section className="section shell publications-page" hidden={!sectionVisible("Publications.section-1")}>
      <div className="publication-tools">
        <label className="search-box"><Search/><span className="sr-only">{contentText("Publications.006")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={contentText("Publications.007")}/>{query && <button aria-label={contentText("Publications.008")} onClick={() => setQuery('')}><X size={16}/></button>}</label>
        <div className="publication-filter-line"><div className="filter-row" role="group" aria-label={contentText("Publications.009")}>{yearOptions.map((item) => <button key={item} className={year === item ? 'active' : ''} onClick={() => setYear(item)}>{item}</button>)}</div><label className="topic-select"><SlidersHorizontal size={16}/><span className="sr-only">{contentText("Publications.010")}</span><select value={topic} onChange={(event) => setTopic(event.target.value)}><option value="All topics">{contentText("Publications.011")}</option>{publicationTopics.map((item) => <option key={item}>{item}</option>)}</select></label></div>
        <div className="results-line"><span className="result-count">{filtered.length}{contentText("Publications.012")}{filtered.length === 1 ? '' : 's'}</span>{hasFilters && <button className="clear-filters" onClick={clear}>{contentText("Publications.013")}</button>}</div>
      </div>

      {grouped.map((group) => <section className="publication-year-group" key={group.year} hidden={!sectionVisible("Publications.section-2")}><Reveal><div className="year-heading"><h2>{group.year}</h2><span>{group.publications.length}{contentText("Publications.014")}{group.publications.length === 1 ? '' : 's'}</span></div></Reveal><div className="publication-stack">{group.publications.map((publication, index) => <Reveal key={publication.id} delay={Math.min(index*.025,.18)}><PublicationCard publication={publication}/></Reveal>)}</div><ContentGallery sectionId="Publications.section-2" /></section>)}
      {filtered.length === 0 && <div className="empty-state"><h3>{contentText("Publications.015")}</h3><p>{contentText("Publications.016")}</p><button className="button button-dark" onClick={clear}>{contentText("Publications.017")}</button></div>}
    <ContentGallery sectionId="Publications.section-1" /></section>
  </>
}
