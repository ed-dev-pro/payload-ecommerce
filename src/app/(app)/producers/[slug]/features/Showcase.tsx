import Image from 'next/image'

export function Showcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr] lg:grid-cols-1 gap-3">
      <section className="border rounded-xl">
        <div className="p-6">
          <h2 className="text-xl mb-4">Art Collection 1</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative rounded-lg overflow-hidden">
                <Image
                  src="/assets/producer/wine-bottle.png"
                  alt={`Wine bottle ${i}`}
                  width={150}
                  height={225}
                />
              </div>
            ))}
          </div>
          <p className="text-md mt-4 mb-1">This months sticker collection.</p>
          <p className="text-sm text-gray-600">
            Its simple and flavour makes it perfect for those of you who like you who want
            minimalist taste
          </p>
        </div>
      </section>

      <section className="border rounded-xl">
        <div className="p-6">
          <h2 className="text-xl mb-4">Wines</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative rounded-lg overflow-hidden">
                <Image
                  src="/assets/producer/wine-bottles.jpg"
                  alt={`Wine pair ${i}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
          <p className="text-md mt-4 mb-1">This months wines collection.</p>
          <p className="text-sm text-gray-600">
            This months sticker collection. Its simple and flavour makes it perfect for those of you
            who like you who want minimalist taste
          </p>
        </div>
      </section>
    </div>
  )
}
