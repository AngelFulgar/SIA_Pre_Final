import { Button } from '../ui'

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
  onAddProduct: () => void
}

export function Navbar({ cartCount, onCartClick, onAddProduct }: NavbarProps) {
  return (
    <header className="navbar">
      <a className="brand" href="#" aria-label="Field & Form home">
        <span className="brand__mark">F</span>
        <span>field<span className="brand__amp">&</span>form</span>
      </a>
      <nav className="navbar__links" aria-label="Main navigation">
        <a href="#catalog">Shop</a>
        <a href="#inventory">Inventory</a>
      </nav>
      <div className="navbar__actions">
        <Button variant="secondary" className="navbar__add" onClick={onAddProduct}>＋ Add product</Button>
        <Button variant="ghost" className="cart-button" onClick={onCartClick} aria-label={`Open cart, ${cartCount} items`}>
          <span aria-hidden="true">♧</span><span className="cart-button__label">Cart</span>
          {cartCount > 0 && <span className="cart-button__count">{cartCount}</span>}
        </Button>
      </div>
    </header>
  )
}
