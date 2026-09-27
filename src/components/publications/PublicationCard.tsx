import { contentText } from '../../content/store'
import { Copy, ExternalLink as ExternalIcon, FileText } from 'lucide-react'
import { useState } from 'react'
import type { Publication } from '../../types'
import ExternalLink from '../ui/ExternalLink'

type Props = { publication: Publication; compact?: boolean }
export default function PublicationCard({ publication, compact = false }: Props) {
  const [copied, setCopied] = useState(false)
  const citationText = `${publication.authors} ${publication.title}. ${publication.journal} ${publication.citation}${publication.doi ? `. https://doi.org/${publication.doi}` : ''}`
  const copy = async () => {
    await navigator.clipboard?.writeText(citationText)
    setCopied(true); window.setTimeout(() => setCopied(false), 1600)
  }
  return (
    <article className={`publication-card ${compact ? 'publication-card-compact' : ''}`}>
      <div className="pub-year">{publication.year}</div>
      <div className="pub-main">
        <div className="tag-row">{publication.topics.slice(0, compact ? 2 : 4).map((topic) => <span key={topic}>{topic}</span>)}</div>
        <h3>{publication.title}</h3>
        {publication.image && <img className="publication-image" src={publication.image} alt={publication.title} loading="lazy" />}
        <p className="pub-authors">{publication.authors}</p>
        <p className="pub-journal"><strong>{publication.journal}</strong>{contentText("PublicationCard.001")}{publication.citation}</p>
        {!compact && <div className="pub-actions">
          {publication.doi && <ExternalLink href={`https://doi.org/${publication.doi}`}><FileText size={15}/>{contentText("PublicationCard.002")}</ExternalLink>}
          {publication.publisherUrl && <ExternalLink href={publication.publisherUrl}><ExternalIcon size={15}/>{contentText("PublicationCard.003")}</ExternalLink>}
          {publication.preprintUrl && <ExternalLink href={publication.preprintUrl}>{contentText("PublicationCard.004")}</ExternalLink>}
          <button type="button" onClick={copy} className="copy-citation"><Copy size={14}/>{copied ? 'Copied' : 'Copy citation'}</button>
        </div>}
      </div>
    </article>
  )
}
