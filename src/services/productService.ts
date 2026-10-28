import { DEFAULT_PRODUCTS } from '../data/defaultProducts'
import type { Product } from '../types'
import { isProduct } from '../utils/validators'
import { readStorage } from './storageService'

const PRODUCTS_KEY = 'productmanagement.products'

function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct)
}

export function loadProducts(): Product[] {
  return readStorage(PRODUCTS_KEY, isProductList, DEFAULT_PRODUCTS)
}
