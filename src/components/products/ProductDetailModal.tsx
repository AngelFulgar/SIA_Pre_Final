import type { Product } from '../../types'
import { formatPrice } from '../../utils/formatters'
import { InventoryStatus } from '../inventory'
import { Button, Modal } from '../ui'

export function ProductDetailModal({ product, onClose, onAdd }: {
  product: Product | null
  onClose: () => void
  onAdd: (product: Product) => void
}) {
  return (
    <Modal title={product?.name ?? 'Product details'} isOpen={product !== null} onClose={onClose}>
      {product && <div className="product-detail">
        <div className="product-detail__art">{product.image}</div>
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-detail__meta"><strong>{formatPrice(product.price)}</strong><InventoryStatus inventory={product.inventory} /></div>
        <Button disabled={product.inventory === 0} onClick={() => onAdd(product)}>Add to bag</Button>
      </div>}
    </Modal>
  )
}
