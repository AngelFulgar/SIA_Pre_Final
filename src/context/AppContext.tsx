import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AppContext } from './AppContextStore'
import { adjustInventory } from '../services/inventoryService'
import { loadProducts } from '../services/productService'
import { writeStorage } from '../services/storageService'
import type { CartItem, Product } from '../types'
import { generateId } from '../utils/generateId'
import { validateProductInput, type ProductInput } from '../utils/validators'
import { useLocalStorage } from '../hooks/useLocalStorage'

const PRODUCTS_KEY = 'productmanagement.products'
const CART_KEY = 'productmanagement.cart'

function isCart(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item.productId === 'string' &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    )
  )
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState(loadProducts)
  const [cart, setCart] = useLocalStorage(CART_KEY, isCart, [])

  useEffect(() => writeStorage(PRODUCTS_KEY, products), [products])

  const addProduct = useCallback((input: ProductInput) => {
    const error = validateProductInput(input)
    if (error) return error
    const product: Product = {
      ...input,
      id: generateId(),
      name: input.name.trim(),
      description: input.description.trim(),
      image: '📦',
      featured: false,
    }
    setProducts((current) => [...current, product])
  }, [])

  const adjustStock = useCallback((productId: string, adjustment: number) => {
    const product = products.find((item) => item.id === productId)
    if (!product) return false
    const reservedQuantity = cart.find((item) => item.productId === productId)?.quantity ?? 0
    const next = adjustInventory(product, adjustment)
    if (!next || next.inventory < reservedQuantity) return false
    setProducts((current) => current.map((item) => item.id === productId ? next : item))
    return true
  }, [cart, products])

  const addToCart = useCallback((productId: string, quantity = 1) => {
    const product = products.find((item) => item.id === productId)
    if (!product || !Number.isInteger(quantity) || quantity <= 0) return false
    const currentQuantity = cart.find((item) => item.productId === productId)?.quantity ?? 0
    if (currentQuantity + quantity > product.inventory) return false
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId)
      return existing
        ? current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...current, { productId, quantity }]
    })
    return true
  }, [cart, products, setCart])

  const setCartQuantity = useCallback((productId: string, quantity: number) => {
    const product = products.find((item) => item.id === productId)
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > product.inventory) {
      return false
    }
    setCart((current) =>
      current.map((item) => item.productId === productId ? { ...item, quantity } : item),
    )
    return true
  }, [products, setCart])

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId))
  }, [setCart])

  const clearCart = useCallback(() => setCart([]), [setCart])

  const checkout = useCallback(() => {
    if (cart.some((item) => {
      const product = products.find((candidate) => candidate.id === item.productId)
      return !product || item.quantity > product.inventory
    })) return false
    setProducts((current) => current.map((product) => {
      const purchased = cart.find((item) => item.productId === product.id)
      return purchased ? { ...product, inventory: product.inventory - purchased.quantity } : product
    }))
    setCart([])
    return true
  }, [cart, products, setCart])

  const value = useMemo(
    () => ({ products, cart, addProduct, adjustStock, addToCart, setCartQuantity, removeFromCart, clearCart, checkout }),
    [products, cart, addProduct, adjustStock, addToCart, setCartQuantity, removeFromCart, clearCart, checkout],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
