import type { CartItem, InventoryStats, Product } from '../types'

export function getLineSubtotal(product: Product, quantity: number): number {
  return product.price * quantity
}

export function getCartTotal(
  cart: CartItem[],
  products: Product[],
): number {
  return cart.reduce((total, item) => {
    const product = products.find(({ id }) => id === item.productId)
    return product ? total + getLineSubtotal(product, item.quantity) : total
  }, 0)
}

export function getInventoryStats(products: Product[]): InventoryStats {
  return products.reduce<InventoryStats>(
    (stats, product) => {
      stats.totalUnits += product.inventory
      stats.totalValue += product.inventory * product.price
      if (product.inventory === 0) stats.outOfStockCount += 1
      else if (product.inventory <= 5) stats.lowStockCount += 1
      return stats
    },
    { totalUnits: 0, totalValue: 0, lowStockCount: 0, outOfStockCount: 0 },
  )
}
