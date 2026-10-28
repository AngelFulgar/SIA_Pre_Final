import type { InventoryStats as InventoryStatsType } from '../../types'
import { formatPrice, formatQuantity } from '../../utils/formatters'

export function InventoryStats({ stats }: { stats: InventoryStatsType }) {
  return (
    <div className="inventory-stats">
      <article><span>UNITS AVAILABLE</span><strong>{formatQuantity(stats.totalUnits)}</strong><small>Across all products</small></article>
      <article><span>INVENTORY VALUE</span><strong>{formatPrice(stats.totalValue)}</strong><small>At current retail price</small></article>
      <article><span>RUNNING LOW</span><strong>{stats.lowStockCount.toString().padStart(2, '0')}</strong><small>Products with 5 or fewer units</small></article>
      <article><span>OUT OF STOCK</span><strong>{stats.outOfStockCount.toString().padStart(2, '0')}</strong><small>Products needing a restock</small></article>
    </div>
  )
}
