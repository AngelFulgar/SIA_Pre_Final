import type { Product } from '../../types'
import { ProductDetailModal } from './ProductDetailModal'

export function ProductDetailPage({ product, onClose, onAdd }: {
  product: Product | null
  onClose: () => void
  onAdd: (product: Product) => void
}) {
  return <ProductDetailModal product={product} onClose={onClose} onAdd={onAdd} />
}
