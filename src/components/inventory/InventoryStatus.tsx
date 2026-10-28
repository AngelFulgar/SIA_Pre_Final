import type { InventoryStatus as InventoryStatusType } from '../../types'
import { getInventoryStatus } from '../../utils/inventory'

const LABELS: Record<InventoryStatusType, string> = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Sold out',
}

export function InventoryStatus({ inventory }: { inventory: number }) {
  const status = getInventoryStatus(inventory)
  return <span className={`stock stock--${status}`}><span />{LABELS[status]}</span>
}
