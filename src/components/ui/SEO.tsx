import { useSiteData } from '../../content/store'
import { useEffect } from 'react'

type SEOProps = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value))
}

export default function SEO({ title, description, path = '/', image, type = 'website', jsonLd }: SEOProps) {
  const { site } = useSiteData()
  useEffect(() => {
    const canonical = new URL(path, site.url).toString()
    const imageUrl = new URL(image || site.socialImage, site.url).toString()
    document.title = title
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })

    let canonicalElement = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalElement) { canonicalElement = document.createElement('link'); canonicalElement.rel = 'canonical'; document.head.appendChild(canonicalElement) }
    canonicalElement.href = canonical

    document.querySelectorAll('script[data-team-vw-schema]').forEach((element) => element.remove())
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.teamVwSchema = 'true'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, image, type, jsonLd, site])
  return null
}
