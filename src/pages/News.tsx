import ContentGallery from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { useMemo, useState } from 'react'
import Reveal from '../components/motion/Reveal'
import NewsCard from '../components/news/NewsCard'
import PageHero from '../components/ui/PageHero'
import SEO from '../components/ui/SEO'
import type { NewsCategory } from '../types'

const categories = ['all','publication','award','conference','team','lab-life'] as const

export default function News() {

  const { newsCategoryLabels, newsItems, newsYears } = useSiteData()
  const [year, setYear] = useState<number | 'all'>('all')
  const [category, setCategory] = useState<'all' | NewsCategory>('all')
  const filtered = useMemo(() => newsItems.filter((item) => (year === 'all' || item.year === year) && (category === 'all' || item.category === category)), [year, category, newsItems])
  return <>
    <SEO title={contentText("News.001")} description={contentText("News.002")} path="/news" />
    <PageHero eyebrow={contentText("News.003")} title={contentText("News.004")} intro={contentText("News.005")} />
    <section className="section shell" hidden={!sectionVisible("News.section-1")}>
      <div className="news-filter-panel">
        <div><strong>{contentText("News.006")}</strong><div className="filter-row"><button className={year === 'all' ? 'active' : ''} onClick={() => setYear('all')}>{contentText("News.007")}</button>{newsYears.map((item) => <button key={item} className={year === item ? 'active' : ''} onClick={() => setYear(item)}>{item}</button>)}</div></div>
        <div><strong>{contentText("News.008")}</strong><div className="filter-row">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item === 'all' ? 'All' : newsCategoryLabels[item]}</button>)}</div></div>
      </div>
      <div className="results-line"><span className="result-count">{filtered.length}{contentText("News.009")}{filtered.length === 1 ? '' : 's'}</span>{(year !== 'all' || category !== 'all') && <button className="clear-filters" onClick={() => { setYear('all'); setCategory('all') }}>{contentText("News.010")}</button>}</div>
      <div className="news-grid news-archive-grid">{filtered.map((item, index) => <Reveal key={item.id} delay={Math.min(index*.035,.18)}><NewsCard item={item}/></Reveal>)}</div>
      {filtered.length === 0 && <div className="empty-state"><h3>{contentText("News.011")}</h3><p>{contentText("News.012")}</p></div>}
    <ContentGallery sectionId="News.section-1" /></section>
  </>
}
