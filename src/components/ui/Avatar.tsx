import { useState } from 'react'
import type { Person } from '../../types'

type Props = { person: Pick<Person, 'name' | 'initials' | 'image'>; className?: string }
export default function Avatar({ person, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  if (person.image && !failed) {
    return <img className={`avatar-image ${className}`} src={person.image} alt={`Portrait of ${person.name}`} loading="lazy" onError={() => setFailed(true)} />
  }
  return <div className={`avatar-fallback ${className}`} role="img" aria-label={`Portrait placeholder for ${person.name}`}><span>{person.initials}</span><i aria-hidden="true"/></div>
}
