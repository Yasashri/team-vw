const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
const MAX_IMAGE_EDGE = 2400
const WEBP_QUALITY = 0.82
const INPUT_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']

export function imageDimensions(width: number, height: number) {
  if (width <= 0 || height <= 0 || !Number.isFinite(width + height)) throw new Error('The image has invalid dimensions.')
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(width, height))
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) }
}

export async function optimizeImage(file: File): Promise<{ src: string; originalBytes: number; optimizedBytes: number }> {
  if (!INPUT_TYPES.includes(file.type)) throw new Error('Choose a PNG, JPG, WebP, GIF, or AVIF image.')
  if (file.size > MAX_UPLOAD_BYTES) throw new Error('Each image must be smaller than 8 MB.')
  let bitmap: ImageBitmap
  try { bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }) }
  catch { throw new Error(`Could not decode ${file.name}. Choose a valid image supported by this browser.`) }
  const canvas = document.createElement('canvas')
  try {
    const dimensions = imageDimensions(bitmap.width, bitmap.height)
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    const context = canvas.getContext('2d', { alpha: true })
    if (!context) throw new Error('Image conversion is unavailable in this browser.')
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(result => result ? resolve(result) : reject(new Error('Could not convert this image to WebP.')), 'image/webp', WEBP_QUALITY)
    })
    // Some browsers silently fall back to PNG when an encoder is unavailable.
    if (blob.type !== 'image/webp') throw new Error('This browser cannot create WebP images. Try an up-to-date browser.')
    const src = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error('Could not read the converted image.'))
      reader.readAsDataURL(blob)
    })
    return { src, originalBytes: file.size, optimizedBytes: blob.size }
  } finally {
    bitmap.close()
    canvas.width = 0
    canvas.height = 0
  }
}
