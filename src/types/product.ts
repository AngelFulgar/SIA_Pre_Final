export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Home & Living',
  'Accessories',
  'Audio',
  'Office',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  price: number
  inventory: number
  image: string
  featured: boolean
}
