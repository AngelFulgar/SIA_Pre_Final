import { PRODUCT_CATEGORIES } from '../../types/product'
import type { ProductCategory } from '../../types/product'
import { Input, Select } from '../ui'

interface ProductFiltersProps {
  search: string
  onSearch: (value: string) => void
  category: ProductCategory | 'All'
  onCategory: (value: ProductCategory | 'All') => void
  count: number
}

export function ProductFilters({ search, onSearch, category, onCategory, count }: ProductFiltersProps) {
  return (
    <div className="catalog-toolbar">
      <div className="catalog-toolbar__count"><span>{String(count).padStart(2, '0')}</span> thoughtfully chosen things</div>
      <div className="catalog-toolbar__filters">
        <Input label="Search products" placeholder="Search the collection..." value={search} onChange={(event) => onSearch(event.target.value)} />
        <Select label="Category" value={category} onChange={(event) => onCategory(event.target.value as ProductCategory | 'All')} options={['All', ...PRODUCT_CATEGORIES]} />
      </div>
    </div>
  )
}
