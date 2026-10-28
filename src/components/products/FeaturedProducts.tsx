import type { Product } from '../../types'
import { ProductGrid } from './ProductGrid'

export function FeaturedProducts({ products, onAdd, onSelect }: {
  products: Product[]
  onAdd: (product: Product) => void
  onSelect: (product: Product) => void
}) {
  const featured = products.filter((product) => product.featured).slice(0, 3)
  if (featured.length === 0) return null
  return (
    <section className="featured">
      <div className="section-heading">
        <div><p className="eyebrow">A FEW FAVORITES</p><h2>Considered classics</h2></div>
        <span>01 — 03</span>
      </div>
      <ProductGrid products={featured} onAdd={onAdd} onSelect={onSelect} />
    </section>
  )
}
