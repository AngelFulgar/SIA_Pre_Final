import { useState } from 'react'
import type { Product } from '../types'
import { CartDrawer } from '../components/cart'
import { EmptyState } from '../components/feedback'
import { HeroSlider } from '../components/hero'
import { Footer, Navbar } from '../components/layout'
import { InventoryAdjustment, InventoryStats } from '../components/inventory'
import { FeaturedProducts, ProductDetailPage, ProductFilters, ProductGrid, ProductTable } from '../components/products'
import { AddProductModal } from '../components/forms'
import { Button } from '../components/ui'
import { useCart } from '../hooks/useCart'
import { useInventory } from '../hooks/useInventory'
import { useProducts } from '../hooks/useProducts'

export function CatalogPage({ notify }: { notify: (message: string, kind?: 'success' | 'error' | 'info') => void }) {
  const { products, filteredProducts, search, setSearch, category, setCategory, addProduct } = useProducts()
  const { cart, itemCount, addToCart, setCartQuantity, removeFromCart, checkout } = useCart()
  const { stats, adjustStock } = useInventory()
  const [cartOpen, setCartOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [view, setView] = useState<'grid' | 'table'>('grid')

  function addProductToCart(product: Product) {
    if (addToCart(product.id)) notify(`${product.name} added to your bag.`, 'success')
    else notify(`Only ${product.inventory} ${product.inventory === 1 ? 'unit is' : 'units are'} available.`, 'error')
  }

  return (
    <div id="top" className="site-shell">
      <Navbar cartCount={itemCount} onCartClick={() => setCartOpen(true)} onAddProduct={() => setFormOpen(true)} />
      <main>
        <HeroSlider onExplore={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} />
        <FeaturedProducts products={products} onAdd={addProductToCart} onSelect={setSelectedProduct} />
        <section className="catalog-section" id="catalog">
          <div className="section-heading">
            <div><p className="eyebrow">THE FULL COLLECTION</p><h2>Find your next favorite.</h2></div>
            <div className="view-switch" aria-label="Catalog view">
              <Button variant={view === 'grid' ? 'secondary' : 'ghost'} aria-pressed={view === 'grid'} onClick={() => setView('grid')}>Grid</Button>
              <Button variant={view === 'table' ? 'secondary' : 'ghost'} aria-pressed={view === 'table'} onClick={() => setView('table')}>List</Button>
            </div>
          </div>
          <ProductFilters search={search} onSearch={setSearch} category={category} onCategory={setCategory} count={filteredProducts.length} />
          {filteredProducts.length === 0
            ? <EmptyState title="Nothing here just yet." message="Try a different search or category." />
            : view === 'grid'
              ? <ProductGrid products={filteredProducts} onAdd={addProductToCart} onSelect={setSelectedProduct} />
              : <ProductTable products={filteredProducts} />}
        </section>
        <section className="inventory-section" id="inventory">
          <div className="section-heading">
            <div><p className="eyebrow">BEHIND THE SHELVES</p><h2>Inventory at a glance.</h2></div>
            <span className="inventory-section__note">Stock levels update as orders are checked out.</span>
          </div>
          <InventoryStats stats={stats} />
          <InventoryAdjustment products={products} onAdjust={adjustStock} />
        </section>
      </main>
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} products={products}
        onQuantityChange={setCartQuantity} onRemove={removeFromCart}
        onCheckout={() => {
          if (checkout()) {
            setCartOpen(false)
            notify('Your order has been placed. Thank you!', 'success')
          } else {
            notify('The bag could not be checked out. Please review stock availability.', 'error')
          }
        }} />
      <AddProductModal isOpen={formOpen} onClose={() => setFormOpen(false)} onSubmit={(input) => {
        const error = addProduct(input)
        if (!error) notify('Product added to your collection.', 'success')
        return error
      }} />
      <ProductDetailPage product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={(product) => {
        addProductToCart(product)
        setSelectedProduct(null)
      }} />
    </div>
  )
}
