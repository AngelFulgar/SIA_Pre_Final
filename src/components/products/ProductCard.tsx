import type { Product } from '../../types'
import { formatPrice } from '../../utils/formatters'
import { Button } from '../ui'
import { InventoryStatus } from '../inventory'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onAdd, onSelect }: ProductCardProps) {
  return (
    <article className="product-card">
      <button className={`product-card__image product-card__image--${product.category.replace(/[^a-z]/gi, '').toLowerCase()}`} onClick={() => onSelect(product)} aria-label={`View ${product.name}`}>
        <span>{product.image}</span>
        {product.featured && <span className="product-card__badge">Staff pick</span>}
      </button>
      <div className="product-card__details">
        <div className="product-card__category">{product.category}</div>
        <button className="product-card__name" onClick={() => onSelect(product)}>{product.name}</button>
        <div className="product-card__bottom">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <InventoryStatus inventory={product.inventory} />
        </div>
        <Button variant="secondary" className="product-card__add" disabled={product.inventory === 0} onClick={() => onAdd(product)}>
          {product.inventory > 0 ? 'Add to bag  +' : 'Out of stock'}
        </Button>
      </div>
    </article>
  )
}
