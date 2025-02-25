import { ProductCard } from '@/components/Card/Product'
import { Product } from '@/payload-types'

interface CollectionProps {
  products: Product[]
}

export function AvailableCollection({ products }: CollectionProps) {
  return (
    <section className="border rounded-xl">
      <div className="p-6">
        <h2 className="text-xl text-center mb-4">Available Collection</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
