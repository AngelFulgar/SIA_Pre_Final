import type { Product } from '../../types'
import { formatPrice } from '../../utils/formatters'
import { Button, QuantityControl } from '../ui'

interface CartItemProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ product, quantity, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <article className="cart-item">
      <div className="cart-item__image">{product.image}</div>
      <div className="cart-item__info">
        <strong>{product.name}</strong><span>{formatPrice(product.price)}</span>
        <QuantityControl quantity={quantity} max={product.inventory} onChange={onQuantityChange} />
      </div>
      <div className="cart-item__end">
        <strong>{formatPrice(product.price * quantity)}</strong>
        <Button variant="ghost" onClick={onRemove} aria-label={`Remove ${product.name}`}>Remove</Button>
      </div>
    </article>
  )
}
