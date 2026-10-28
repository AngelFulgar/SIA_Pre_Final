import type { Product } from '../types'

export function adjustInventory(
  product: Product,
  adjustment: number,
): Product | undefined {
  if (!Number.isInteger(adjustment)) return undefined
  const inventory = product.inventory + adjustment
  if (inventory < 0) return undefined
  return { ...product, inventory }
}
