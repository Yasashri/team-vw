import ContentGallery, { ImageGallery } from '../content/ContentGallery'
import { useSiteData, contentText, sectionVisible } from '../content/store'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ExternalLink from '../components/ui/ExternalLink'
import SEO from '../components/ui/SEO'
import NotFound from './NotFound'

export default function NewsArticle() {

  const { newsCategoryLabels, newsItems } = useSiteData()
  const { slug } = useParams()
  const item = newsItems.find((entry) => entry.slug === slug)
  if (!item) return <NotFound />
  const schema = { '@context':'https://schema.org', '@type':'NewsArticle', headline:item.title, datePublished:item.isoDate ?? `${item.year}-01-01`, description:item.summary, publisher:{ '@type':'ResearchOrganization', name:'Team VW' } }
  return <>
    <SEO title={`${item.title} | Team VW`} description={item.summary} path={`/news/${item.slug}`} type="article" jsonLd={schema}/>
    <article>
      <header className={`article-hero article-${item.category}`}><div className="hero-noise"/><div className="shell article-wrap"><Link className="back-link" to="/news"><ArrowLeft size={15}/>{contentText("NewsArticle.001")}</Link><span className="news-category-pill">{newsCategoryLabels[item.category]}</span><h1>{item.title}</h1><p className="article-date">{item.date}</p></div></header>
      <section className="section shell article-layout" hidden={!sectionVisible("NewsArticle.section-1")}><div className="article-content"><p className="article-lead">{item.summary}</p><ImageGallery images={(item.images ?? []).map(src => ({src,alt:item.title,caption:''}))} />{item.content?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{!item.content?.length && <p>{contentText("NewsArticle.002")}</p>}{item.links && <div className="article-links"><h2>{contentText("NewsArticle.003")}</h2>{item.links.filter(link => link.url).map((link) => <ExternalLink key={link.url} href={link.url}>{link.label}</ExternalLink>)}</div>}</div><aside className="article-aside"><span>{contentText("NewsArticle.004")}</span><strong>{item.year}</strong><p>{newsCategoryLabels[item.category]}</p><Link to="/news">{contentText("NewsArticle.005")}<ArrowUpRight size={14}/></Link></aside><ContentGallery sectionId="NewsArticle.section-1" /></section>
    </article>
  </>
}
