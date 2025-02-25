import { Package, Clock } from 'lucide-react'
import { Producer } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

interface ProducerInfoProps {
  producer: Producer
}

export function ProducerInfo({ producer }: ProducerInfoProps) {
  const avatar = typeof producer?.avatar !== 'string' ? producer?.avatar : undefined

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-3">
      {/* Left Card */}
      <section className="border rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr] h-full">
          <div className="p-6 space-y-4">
            <h1 className="text-2xl">Headline</h1>
            <div className="text-gray-600 text-sm">
              {producer.description ? (
                <RichText className="mb-2" data={producer.description} enableGutter={false} />
              ) : null}
            </div>
            <div className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
              {producer.title}
            </div>
          </div>
          <div className="relative min-h-[350px] rounded-b-xl sm:rounded-tr-xl sm:rounded-bl-none overflow-hidden">
            {avatar ? <Media resource={avatar} alt={avatar?.alt} fill priority={true} /> : null}
          </div>
        </div>
      </section>
      {/* Right Card */}
      <section className="border rounded-xl">
        <div className="space-y-8 p-6 flex flex-col justify-between h-full">
          <div>
            <div className="font-medium">
              Location: <span className="font-normal">{producer.region}</span>
            </div>
            <div className="mt-2">
              <span className="font-medium">Story: </span>
              <span className="text-sm text-gray-600">
                Its simple and flavor makes it perfect for those of you who like you who want
                minimalist taste
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Free Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
