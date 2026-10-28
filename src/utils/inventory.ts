import type { InventoryStatus } from '../types'

export function getInventoryStatus(inventory: number): InventoryStatus {
  if (inventory === 0) return 'out-of-stock'
  if (inventory <= 5) return 'low-stock'
  return 'in-stock'
}
