import { useContent, type GalleryImage } from './store'

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  if (!images.some(image => image.src)) return null
  return <div className="content-gallery">{images.filter(image => image.src).map((image,index) => <figure key={`${image.src.slice(0,80)}-${index}`}><img src={image.src} alt={image.alt} loading="lazy" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div>
}
export default function ContentGallery({ sectionId }: { sectionId: string }) {
  const content = useContent()
  return <ImageGallery images={content.sections[sectionId]?.images ?? []} />
}
