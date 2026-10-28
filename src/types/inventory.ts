export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export interface InventoryStats {
  totalUnits: number
  totalValue: number
  lowStockCount: number
  outOfStockCount: number
}
