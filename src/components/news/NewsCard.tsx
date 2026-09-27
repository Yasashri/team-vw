import { useSiteData, contentText } from '../../content/store'
import { ArrowRight, Award, BookOpen, FlaskConical, Plane, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { NewsItem } from '../../types'

const icons = { publication: BookOpen, award: Award, conference: Plane, team: UsersRound, recruitment: FlaskConical, 'lab-life': UsersRound }

type Props = { item: NewsItem }
export default function NewsCard({ item }: Props) {
  const { newsCategoryLabels } = useSiteData()
  const Icon = icons[item.category]
  const reduce = useReducedMotion()
  return (
    <motion.article className="news-card" whileHover={reduce ? undefined : { y: -5 }} transition={{ duration: .22 }}>
      <div className={`news-visual news-${item.category}`} aria-hidden="true">{item.images?.[0] ? <img src={item.images[0]} alt="" loading="lazy" /> : <Icon/>}<span>{item.year}</span></div>
      <div className="news-body">
        <div className="news-meta"><span>{newsCategoryLabels[item.category]}</span><time dateTime={item.isoDate}>{item.date}</time></div>
        <h3>{item.title}</h3><p>{item.summary}</p>
        <Link className="text-link" to={`/news/${item.slug}`}>{contentText("NewsCard.001")}<ArrowRight size={15}/></Link>
      </div>
    </motion.article>
  )
}
