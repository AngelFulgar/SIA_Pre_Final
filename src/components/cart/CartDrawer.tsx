import type { CartItem as CartLine, Product } from '../../types'
import { getCartTotal } from '../../utils/calculations'
import { EmptyState } from '../feedback'
import { Drawer } from '../ui'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartLine[]
  products: Product[]
  onQuantityChange: (productId: string, quantity: number) => boolean
  onRemove: (productId: string) => void
  onCheckout: () => void
}

export function CartDrawer({ isOpen, onClose, cart, products, onQuantityChange, onRemove, onCheckout }: CartDrawerProps) {
  const lines = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId)
    return product ? [{ item, product }] : []
  })
  const total = getCartTotal(cart, products)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <Drawer title={`Your bag (${itemCount})`} isOpen={isOpen} onClose={onClose}>
      {lines.length === 0
        ? <EmptyState title="Your bag is taking a breather." message="Add something considered from the collection." />
        : <div className="cart-drawer">
          <div className="cart-drawer__items">
            {lines.map(({ item, product }) => (
              <CartItem key={item.productId} product={product} quantity={item.quantity}
                onQuantityChange={(quantity) => onQuantityChange(item.productId, quantity)}
                onRemove={() => onRemove(item.productId)} />
            ))}
          </div>
          <CartSummary total={total} itemCount={itemCount} onCheckout={onCheckout} />
        </div>}
    </Drawer>
  )
}
