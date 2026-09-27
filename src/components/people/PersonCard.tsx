import { contentText } from '../../content/store'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { Person } from '../../types'
import Avatar from '../ui/Avatar'

type Props = { person: Person; featured?: boolean }
export default function PersonCard({ person, featured = false }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.article className={`person-card ${featured ? 'person-card-featured' : ''}`} whileHover={reduce ? undefined : { y: -5 }} transition={{ duration: .22 }}>
      <Avatar person={person} className="person-avatar" />
      <div className="person-card-body">
        <div className="person-role">{person.role}</div>
        <h3>{person.name}</h3>
        {person.nickname && <span className="nickname">{contentText("PersonCard.001")}{person.nickname}</span>}
        <p>{person.shortBio}</p>
        {person.researchInterests && <div className="tag-row compact">{person.researchInterests.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>}
        <Link className="text-link" to={`/people/${person.slug}`}>{contentText("PersonCard.002")}<ArrowRight size={15}/></Link>
      </div>
    </motion.article>
  )
}
