# Team VW — React + Vite redesign

Production-oriented redesign of the Team VW research-group website at National Sun Yat-sen University.

## Stack

- React 18
- Vite 6
- TypeScript
- React Router
- Framer Motion
- Lucide React
- modular CSS with design tokens

The site is a static-friendly SPA. Large content collections are stored in typed data files instead of hard-coded page markup.

## Development

```bash
npm install
npm run dev
```

Vite will print the local development URL.

## Production build

```bash
npm run build
```

Output is generated in:

```text
dist/
```

Preview the production bundle with:

```bash
npm run preview
```

## Main routes

```text
/
/research
/people
/people/:slug
/people/alumni
/lab-life
/publications
/news
/news/:slug
/join-us
/contact
/404
```

## Content architecture

### People

Edit:

```text
src/data/people.ts
```

A typical person object:

```ts
{
  id: 'given-family',
  slug: 'given-family',
  name: 'Given Family',
  role: 'PhD Student',
  category: 'phd',
  initials: 'GF',
  image: '/images/team/given-family.webp',
  shortBio: 'Short card biography.',
  bio: ['Longer paragraph one.', 'Longer paragraph two.'],
  researchInterests: ['Electrocatalysis', 'Mechanistic chemistry']
}
```

Allowed categories are defined in `src/types.ts`.

### Alumni

Edit:

```text
src/data/alumni.ts
```

Only add graduation years or current positions when they are verified.

### Publications

Edit:

```text
src/data/publications.ts
```

Example:

```ts
{
  id: '2026-short-key',
  year: 2026,
  title: 'Publication title',
  authors: 'Author, A.; Author, B.*',
  journal: 'Journal Name',
  citation: '2026, 10, 100–110',
  doi: '10.xxxx/xxxxx',
  publisherUrl: 'https://...',
  topics: ['Electrocatalysis', 'CO₂ Reduction'],
  featured: true
}
```

Year and topic filters update automatically from the data.

### News

Edit:

```text
src/data/news.ts
```

Example:

```ts
{
  id: '2026-09-example',
  slug: 'example-update',
  date: 'September 2026',
  isoDate: '2026-09-01',
  year: 2026,
  category: 'award',
  title: 'Example title',
  summary: 'Short archive summary.',
  content: ['Optional longer article paragraph.']
}
```

If `content` is omitted, the detail route displays the archived summary and explicitly notes that the original update was concise.

## Images

Do **not** hotlink Google Sites media.

Use:

```text
public/images/team/
public/images/research/
public/images/news/
public/images/publications/
public/images/lab-life/
public/images/branding/
```

Recommended portrait format: WebP/AVIF, square or 4:5, at least 1000 px on the shortest side.

When a person has no `image`, the site renders a branded initials fallback automatically.

## Animation

Framer Motion powers:

- reveal-on-scroll sections
- sticky scroll progress
- mobile navigation transitions
- dropdown transitions
- subtle hover motion
- the interactive molecular hero

The site respects `prefers-reduced-motion` and removes non-essential movement for users who request reduced motion.

## Accessibility

Implemented features include:

- semantic headings and landmark elements
- skip-to-content link
- visible keyboard focus states
- keyboard-accessible navigation
- accessible form labels
- reduced-motion support
- meaningful empty states
- alt text / labelled fallbacks
- no interaction that relies exclusively on hover

Target: WCAG 2.2 AA where practical.

## SEO

The custom SEO component updates:

- document title
- description
- canonical URL
- OpenGraph metadata
- Twitter card metadata
- JSON-LD where appropriate

Included JSON-LD types include ResearchOrganization, Person, ScholarlyArticle and NewsArticle.

`public/robots.txt` and `public/sitemap.xml` are included.

For maximum search-engine coverage of every dynamic route, add a prerender/SSR layer later or generate route snapshots during CI. The current build remains intentionally static-host friendly.

## Deployment and caching

Vite automatically gives built assets content-hashed filenames. This prevents stale JS/CSS after deployments.

Recommended policy:

```text
/assets/*
Cache-Control: public, max-age=31536000, immutable

/index.html
Cache-Control: no-cache
```

### Vercel

A `vercel.json` is included with SPA rewrites and cache headers.

### Netlify

`public/_redirects` and `public/_headers` are included.

### Nginx

Serve `dist/` and use:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /assets/ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location = /index.html {
    add_header Cache-Control "no-cache";
}
```

This means normal deployments do not require visitors to manually hard-refresh.

## Content QA

Read:

```text
CONTENT_REVIEW.md
```

before launch. It records roster/news discrepancies, missing original photography and other items that should be confirmed rather than guessed.

## Original content sources

The migration is based primarily on the live Team VW pages:

- `https://www.teamvw.org/`
- `/research`
- `/people`
- `/people/alumni`
- `/publications`
- `/info/news`
- `/info/contact`
- `/open-positions`

The NSYSU faculty page is used to cross-check Prof. Wang’s contact/office information.
