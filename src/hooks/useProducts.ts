import { useMemo, useState } from 'react'
import { useAppContext } from './useAppContext'
import type { ProductCategory } from '../types/product'

export function useProducts() {
  const { products, addProduct } = useAppContext()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'All'>('All')
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) =>
      (category === 'All' || product.category === category) &&
      (!query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query)),
    )
  }, [products, search, category])
  return { products, filteredProducts, search, setSearch, category, setCategory, addProduct }
}
