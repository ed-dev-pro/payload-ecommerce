import { Media as MediaWrapper } from '@/components/Media'
import { Media } from '@/payload-types'

interface GalleryProps {
  gallery: Media[]
}

export function OriginGellery({ gallery }: GalleryProps) {
  return (
    <section className="border rounded-xl">
      <div className="p-6">
        <h2 className="text-xl mb-4">Origin Gallery</h2>
        <div className="grid grid-cols-3">
          {gallery.map((image, i) => (
            <div key={i} className="relative aspect-square overflow-hidden">
              {image ? <MediaWrapper resource={image} alt={image.alt} fill /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
