import { useMemo } from 'react'
import { useAppContext } from './useAppContext'
import { getInventoryStats } from '../utils/calculations'

export function useInventory() {
  const { products, adjustStock } = useAppContext()
  const stats = useMemo(() => getInventoryStats(products), [products])
  return { products, stats, adjustStock }
}
