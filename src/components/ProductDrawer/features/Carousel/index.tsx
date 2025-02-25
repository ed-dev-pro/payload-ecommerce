import * as React from 'react'
import {
  Carousel as CarouselWrapper,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'

interface CarouselProps {
  items: Product[]
  selectedItem?: Product
  onItemSelect: (product: Product) => void
}

export function Carousel({ items, selectedItem, onItemSelect }: CarouselProps) {
  const currentIndex = React.useMemo(() => {
    return items.findIndex((item) => item.id === selectedItem?.id) || 0
  }, [items, selectedItem])

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(currentIndex)

  // React.useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  //   // setCurrent(api.selectedScrollSnap())

  //   // api.on('select', () => {
  //   //   setCurrent(api.selectedScrollSnap())
  //   // })
  // }, [api])

  React.useEffect(() => {
    setCurrent(currentIndex)
    if (api) {
      api.scrollTo(currentIndex)
    }
  }, [api, currentIndex])

  const handleItemClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
      setCurrent(index)
      onItemSelect(items[index])
    }
  }

  // ✅ Custom functions to handle navigation
  const handlePrev = () => {
    if (api) api.scrollPrev()
  }
  const handleNext = () => {
    if (api) api.scrollNext()
  }

  return (
    <CarouselWrapper setApi={setApi} className="relative w-full max-w-lg  [&>div]: px-8 mt-2 mb-3">
      <CarouselContent className="flex items-center gap-1 ml-0">
        {items.map((item, index) => (
          <CarouselItem key={item.id} className="basis-auto flex justify-center pl-0">
            <Button
              variant={current === index ? 'default' : 'ghost'}
              className={`h-8 rounded-lg px-4 py-2 text-sm transition-colors ${
                current === index ? 'text-white' : 'text-gray-500'
              }`}
              onClick={() => handleItemClick(index)}
            >
              {item.title}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* ✅ Custom Previous Button */}
      <Button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-transparent hover:bg-transparent rounded-none"
      >
        <svg
          width="8"
          height="19"
          viewBox="0 0 8 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-4.37114e-07 9.5L7.5 0.839744L7.5 18.1603L-4.37114e-07 9.5Z" fill="#959595" />
        </svg>
      </Button>

      {/* ✅ Custom Next Button */}
      <Button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-transparent hover:bg-transparent rounded-none"
      >
        <svg
          width="8"
          height="19"
          viewBox="0 0 8 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 9.5L0.499999 18.1603L0.5 0.839745L8 9.5Z" fill="#959595" />
        </svg>
      </Button>
    </CarouselWrapper>
  )
}
