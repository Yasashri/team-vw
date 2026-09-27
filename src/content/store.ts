import { useSyncExternalStore } from 'react'
import { site } from '../data/site'
import { people, categoryLabels } from '../data/people'
import { alumni } from '../data/alumni'
import { publications } from '../data/publications'
import { newsItems, newsCategoryLabels } from '../data/news'
import { researchAreas } from '../data/research'
import catalog from './catalog.json'
import type { PersonCategory, AlumniCategory, NewsCategory } from '../types'
import { readContent, writeContent } from './database'

export interface GalleryImage { src: string; alt: string; caption: string }
export interface SectionContent { label: string; visible: boolean; images: GalleryImage[] }
export const templates = {
  people: { id: '', slug: '', name: '', nickname: '', role: '', category: 'phd' as PersonCategory, initials: '', image: '', shortBio: '', bio: [''], researchInterests: [''], education: [''], career: [''], email: '', links: [{ label: '', url: '' }] },
  alumni: { id: '', name: '', nickname: '', previousRole: '', category: 'masters' as AlumniCategory, initials: '', image: '', thesisTitle: '', bio: '', coSupervised: '', currentPosition: '' },
  publications: { id: '', year: new Date().getFullYear(), title: '', authors: '', journal: '', citation: '', doi: '', publisherUrl: '', preprintUrl: '', image: '', topics: [''], featured: false },
  newsItems: { id: '', slug: '', date: '', isoDate: '', year: new Date().getFullYear(), title: '', summary: '', content: [''], category: 'team' as NewsCategory, images: [''], links: [{ label: '', url: '' }], featured: false },
  researchAreas: { slug: '', title: '', eyebrow: '', summary: '', description: [''], image: '', images: [''], questions: [''], methods: [''], topicMatches: [''] },
}

function completeRecord<T extends object>(template: T, item: Partial<T>): T {
  const result = { ...template, ...item }
  for (const key of Object.keys(result) as (keyof T)[]) {
    const value = result[key]
    if (Array.isArray(value)) result[key] = value.filter(entry => typeof entry === 'string' ? entry.length > 0 : !(entry && typeof entry === 'object' && 'url' in entry && !entry.url)) as T[keyof T]
  }
  return result
}
const defaults = {
  version: 1 as const,
  savedAt: '',
  site: { ...site, logoImage: '', favicon: '/images/branding/team-vw-mark.svg', socialImage: '/images/branding/social-card.svg' },
  appearance: { navy: '#071a2b', accent: '#28b5c7', gold: '#f2b84b', heroPhoto: true, heroAnimation: true, pageAnimation: true },
  people: people.map(item => completeRecord(templates.people, item)),
  alumni: alumni.map(item => completeRecord(templates.alumni, item)),
  publications: publications.map(item => completeRecord(templates.publications, item)),
  newsItems: newsItems.map(item => completeRecord(templates.newsItems, item)),
  researchAreas: researchAreas.map(item => completeRecord(templates.researchAreas, item)),
  categoryLabels: { ...categoryLabels },
  newsCategoryLabels: { ...newsCategoryLabels },
  copy: Object.fromEntries(Object.entries(catalog.copy).map(([key, value]) => [key, value.value])) as Record<string, string>,
  sections: Object.fromEntries(Object.entries(catalog.sections).map(([key, label]) => [key, { label, visible: true, images: [] }])) as Record<string, SectionContent>,
}
export type WebsiteContent = typeof defaults
export const contentCatalog = catalog
export const getDefaults = (): WebsiteContent => structuredClone(defaults)
let snapshot = getDefaults()
let startupWarning = ''
const listeners = new Set<() => void>()
function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener) } }
export const getContent = () => snapshot
export const getStartupWarning = () => startupWarning
export const useContent = () => useSyncExternalStore(subscribe, getContent, getContent)
export function useSiteData() {
  const value = useContent()
  return { ...value, newsYears: Array.from(new Set(value.newsItems.map(item => item.year))).sort((a,b) => b-a), publicationTopics: Array.from(new Set(value.publications.flatMap(item => item.topics))).sort() }
}
export const contentText = (key: string) => snapshot.copy[key] ?? defaults.copy[key] ?? ''
export const sectionVisible = (key: string) => snapshot.sections[key]?.visible ?? true

export function safeUrl(value: string, image = false): boolean {
  if (!value) return true
  if (image && /^data:image\/(png|jpeg|webp|gif|avif);base64,[a-z0-9+/=]+$/i.test(value)) return true
  if (value.trim() !== value || [...value].some(char => char.charCodeAt(0) < 32 || char === '\\')) return false
  if (/^(\/[^/]|\/$|#)/.test(value)) return true
  try { return (image ? ['https:', 'http:'] : ['https:', 'http:', 'mailto:', 'tel:']).includes(new URL(value).protocol) } catch { return false }
}

function checkShape(value: unknown, template: unknown, path: string): void {
  if (Array.isArray(template)) {
    if (!Array.isArray(value)) throw new Error(`${path} must be a list.`)
    value.forEach((item, index) => checkShape(item, template[0], `${path} ${index + 1}`))
  } else if (template !== null && typeof template === 'object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${path} must be an object.`)
    for (const [key, child] of Object.entries(template)) checkShape((value as Record<string, unknown>)[key], child, `${path}.${key}`)
  } else if (typeof value !== typeof template || (typeof value === 'number' && !Number.isFinite(value))) throw new Error(`${path} has an invalid value.`)
}

export function validateContent(value: unknown): asserts value is WebsiteContent {
  if (!value || typeof value !== 'object' || (value as WebsiteContent).version !== 1) throw new Error('Choose a version 1 Team VW content backup.')
  const doc = value as WebsiteContent
  if (typeof doc.savedAt !== 'string') throw new Error('Backup is missing its saved date.')
  for (const key of ['site', 'appearance', 'categoryLabels', 'newsCategoryLabels', 'copy'] as const) checkShape(doc[key], defaults[key], key)
  for (const key of Object.keys(templates) as (keyof typeof templates)[]) {
    checkShape(doc[key], [templates[key]], key)
    for (const field of ['id', 'slug']) {
      const ids = doc[key].map(item => (item as unknown as Record<string, unknown>)[field]).filter(item => item !== undefined)
      if (ids.some(id => typeof id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) || new Set(ids).size !== ids.length) throw new Error(`${key}: ${field} values must be unique lowercase words separated by hyphens.`)
    }
  }
  const allowed = { people: ['pi','postdoc','phd','masters','undergraduate','administration'], alumni: ['phd','masters','undergraduate'], newsItems: ['publication','award','conference','team','recruitment','lab-life'] }
  for (const key of Object.keys(allowed) as (keyof typeof allowed)[]) if (doc[key].some(item => !allowed[key].includes(item.category))) throw new Error(`Invalid category in ${key}.`)
  for (const key of ['publications', 'newsItems'] as const) if (doc[key].some(item => !Number.isInteger(item.year) || item.year < 1900 || item.year > 2200)) throw new Error(`${key}: enter a year between 1900 and 2200.`)
  for (const key of Object.keys(defaults.sections)) checkShape(doc.sections?.[key], { label: '', visible: true, images: [{ src: '', alt: '', caption: '' }] }, `Section ${key}`)
  for (const key of ['navy','accent','gold'] as const) if (!/^#[\da-f]{6}$/i.test(doc.appearance[key])) throw new Error('Theme colors must be six-digit hex colors.')
  if (!/^https?:\/\//.test(doc.site.url) || !safeUrl(doc.site.url)) throw new Error('Website URL must start with https:// or http://.')
  function walk(current: unknown, path: string) {
    if (typeof current === 'string') {
      const key = path.split('.').at(-1) ?? ''
      const parent = path.split('.').at(-2) ?? ''
      const meta = path.startsWith('copy.') ? catalog.copy[path.slice(5) as keyof typeof catalog.copy] : undefined
      const kind = meta?.kind
      const isImage = /^(image|src|logoImage|favicon|socialImage)$/.test(key) || parent === 'images' || kind === 'image'
      const isLink = /url$|href$/i.test(key) || kind === 'link'
      if ((isImage || isLink) && !safeUrl(current, isImage)) throw new Error(`Invalid ${isImage ? 'image' : 'link'} URL at ${path}.`)
    } else if (Array.isArray(current)) current.forEach((item, i) => walk(item, `${path}.${i}`))
    else if (current && typeof current === 'object') Object.entries(current).forEach(([key, child]) => walk(child, path ? `${path}.${key}` : key))
  }
  walk(doc, '')
}

function publish(next: WebsiteContent) { snapshot = next; listeners.forEach(listener => listener()) }
export async function initializeContent() {
  try {
    const response = await fetch('/website-content.json', { cache: 'no-store' })
    if (response.ok) { const seed: unknown = await response.json(); if ((seed as WebsiteContent).version === 1) { validateContent(seed); snapshot = seed } }
  } catch { startupWarning = 'Published content could not be loaded; using bundled content.' }
  try { const saved = await readContent(); if (saved) { validateContent(saved); snapshot = saved } }
  catch { startupWarning = 'Browser content could not be read. Existing data has not been overwritten. Export a backup before clearing browser storage.' }
}
export async function saveContent(draft: WebsiteContent) {
  validateContent(draft)
  const next = structuredClone(draft)
  next.savedAt = new Date().toISOString()
  await writeContent(next, snapshot.savedAt)
  publish(next)
  return next
}
