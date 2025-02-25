import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative bg-zinc-800 py-9">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              No Brands, Just Quality
            </h1>
            <h2 className="text-2xl md:text-3xl text-white/90">Supporting local businesses</h2>
            <p className="text-lg text-white/70 max-w-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has beenLorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been
            </p>
            <Button
              variant="default"
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8"
            >
              Discover now
            </Button>
          </div>

          <div>
            <div className="text-2xl font-bold text-white">ECHO TAG</div>
          </div>
        </div>
      </div>
    </section>
  )
}
