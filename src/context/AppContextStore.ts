import { createContext } from 'react'
import type { CartItem, Product } from '../types'
import type { ProductInput } from '../utils/validators'

export interface AppContextValue {
  products: Product[]
  cart: CartItem[]
  addProduct: (input: ProductInput) => string | undefined
  adjustStock: (productId: string, adjustment: number) => boolean
  addToCart: (productId: string, quantity?: number) => boolean
  setCartQuantity: (productId: string, quantity: number) => boolean
  removeFromCart: (productId: string) => void
  clearCart: () => void
  checkout: () => boolean
}

export const AppContext = createContext<AppContextValue | null>(null)
