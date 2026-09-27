export type PersonCategory = 'pi' | 'postdoc' | 'phd' | 'masters' | 'undergraduate' | 'administration'

export interface PersonLink {
  label: string
  url: string
}

export interface Person {
  id: string
  slug: string
  name: string
  nickname?: string
  role: string
  category: PersonCategory
  initials: string
  image?: string
  shortBio?: string
  bio?: string[]
  researchInterests?: string[]
  education?: string[]
  career?: string[]
  email?: string
  links?: PersonLink[]
}

export type AlumniCategory = 'phd' | 'masters' | 'undergraduate'
export interface Alumni {
  id: string
  name: string
  nickname?: string
  previousRole: string
  category: AlumniCategory
  initials: string
  image?: string
  thesisTitle?: string
  bio?: string
  coSupervised?: string
  currentPosition?: string
}

export interface Publication {
  id: string
  year: number
  title: string
  authors: string
  journal: string
  citation: string
  doi?: string
  publisherUrl?: string
  preprintUrl?: string
  image?: string
  topics: string[]
  featured?: boolean
}

export type NewsCategory = 'publication' | 'award' | 'conference' | 'team' | 'recruitment' | 'lab-life'
export interface NewsItem {
  id: string
  slug: string
  date: string
  isoDate?: string
  year: number
  title: string
  summary: string
  content?: string[]
  category: NewsCategory
  images?: string[]
  links?: PersonLink[]
  featured?: boolean
}

export interface ResearchArea {
  slug: string
  title: string
  eyebrow: string
  summary: string
  description: string[]
  image: string
  images?: string[]
  questions: string[]
  methods: string[]
  topicMatches: string[]
}
