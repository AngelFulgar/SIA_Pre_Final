import { PRODUCT_CATEGORIES, type Product, type ProductCategory } from '../types/product'

export interface ProductInput {
  name: string
  description: string
  category: ProductCategory
  price: number
  inventory: number
}

export function validateProductInput(
  input: ProductInput,
): string | undefined {
  if (!input.name.trim()) return 'Enter a product name.'
  if (!input.description.trim()) return 'Enter a product description.'
  if (!PRODUCT_CATEGORIES.includes(input.category)) return 'Choose a valid category.'
  if (!Number.isFinite(input.price) || input.price <= 0) {
    return 'Price must be greater than zero.'
  }
  if (!Number.isInteger(input.inventory) || input.inventory < 0) {
    return 'Inventory must be a whole number of zero or more.'
  }
}

export function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false
  const product = value as Record<string, unknown>
  return (
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.description === 'string' &&
    typeof product.category === 'string' &&
    PRODUCT_CATEGORIES.includes(product.category as ProductCategory) &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price) &&
    typeof product.inventory === 'number' &&
    Number.isInteger(product.inventory) &&
    product.inventory >= 0 &&
    typeof product.image === 'string' &&
    typeof product.featured === 'boolean'
  )
}
