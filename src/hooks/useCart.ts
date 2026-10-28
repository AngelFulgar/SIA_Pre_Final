import { useMemo } from 'react'
import { useAppContext } from './useAppContext'
import { getCartTotal } from '../utils/calculations'

export function useCart() {
  const context = useAppContext()
  const total = useMemo(
    () => getCartTotal(context.cart, context.products),
    [context.cart, context.products],
  )
  const itemCount = context.cart.reduce((sum, item) => sum + item.quantity, 0)
  return { ...context, total, itemCount }
}
