# Website admin

Open `/admin` on the website. No API or server is required. IndexedDB stores a complete content document, including uploaded images, in the current browser and origin.

## Editing

- **Page text & images:** choose a page/component to edit headings, text, labels, SEO metadata, external links, and existing image slots. Home includes the cover image and the three separate headline lines.
- **Sections & galleries:** show/hide sections; upload multiple photos; add alternative text and captions; reorder or remove photos. Shared components apply on every page using them.
- **People, alumni, research, publications, news:** add, edit, reorder, and remove records. Keep IDs/slugs unique. Category choices control public filtering. The first four people appear on the home page; news and publication ordering controls latest listings.
- **Research:** the main image appears on overview cards; additional images appear on the research detail page.
- **News & lab life:** the first photo appears on cards, and all photos appear in articles; lab-life records also display their remaining photos on the lab-life page.
- **Site & contact:** contact details, external destinations, logo, favicon, and social preview image.
- **Appearance:** colors, hero cover visibility, and animation preferences.

Changes remain a draft until **Save changes** succeeds. A storage error leaves the draft intact. The editor detects conflicting saves from another tab. Existing open website tabs can be refreshed to load saved changes. An exported backup includes the draft; importing a backup also creates a draft that must be saved.

Raster uploads support JPG, PNG, WebP, GIF, and AVIF, up to 8 MB each. Every uploaded image is converted locally to WebP at 82% quality before it enters the draft or database. Images larger than 2400 pixels on their longest edge are resized proportionally; smaller images are not enlarged. Transparency and photo orientation are preserved. Animated inputs become still images. Gallery uploads are converted one at a time to limit memory use, and the editor reports the resulting size and savings. Existing saved images, image URLs, and imported backups are not automatically recompressed. Existing site SVG paths can still be used as image URLs.

## Publishing to everyone

1. Export `website-content.json` from **Backups & publishing**.
2. Replace `public/website-content.json` with that file.
3. Run `npm run build` and deploy `dist` as usual.

On startup, the application loads published content, then uses any local IndexedDB override. A browser with older local edits keeps those edits until a new backup is imported and saved. New visitors load the published content. Clearing browser data removes local changes; keep exported backups.

This editor is not an authentication system. Anyone who can use the browser can edit its local content; those edits do not affect other visitors until the exported file is deployed. There is no password or secret bundled in the client.

## Development

`src/content/catalog.json` holds the original public copy and section names. Components use its stable keys. New content fields should be added to the catalog and wired to `contentText`; new structured fields should be added to the templates, types, and renderer. Styling and application logic remain in source code.

Run `node scripts/test-content.cjs`, `npm run lint`, and `npm run build` to verify changes. The extraction/connection scripts were one-time migration tools and must not be rerun on the migrated source.
