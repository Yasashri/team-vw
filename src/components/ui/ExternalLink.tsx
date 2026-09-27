import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
export default function ExternalLink({ children, className = '', ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return <a {...props} className={`external-link ${className}`} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={15}/></a>
}
