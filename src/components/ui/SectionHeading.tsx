type Props = { eyebrow?: string; title: string; intro?: string; align?: 'left' | 'center'; className?: string }
export default function SectionHeading({ eyebrow, title, intro, align = 'left', className = '' }: Props) {
  return <div className={`section-heading ${align === 'center' ? 'section-heading-center' : ''} ${className}`}>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{intro && <p>{intro}</p>}</div>
}
