import { formatPrice } from '../../utils/formatters'
import { Button } from '../ui'

export function CartSummary({ total, itemCount, onCheckout }: {
  total: number
  itemCount: number
  onCheckout: () => void
}) {
  return (
    <div className="cart-summary">
      <div><span>Subtotal · {itemCount} items</span><strong>{formatPrice(total)}</strong></div>
      <p>Shipping and taxes calculated at checkout.</p>
      <Button className="cart-summary__checkout" disabled={itemCount === 0} onClick={onCheckout}>Continue to checkout <span aria-hidden="true">→</span></Button>
    </div>
  )
}
