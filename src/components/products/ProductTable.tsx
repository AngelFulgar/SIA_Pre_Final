import type { Product } from '../../types'
import { formatPrice } from '../../utils/formatters'
import { InventoryStatus } from '../inventory'

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="table-scroll">
      <table className="product-table">
        <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Available stock</th></tr></thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><span className="table-product__icon">{product.image}</span>{product.name}</td>
              <td>{product.category}</td><td>{formatPrice(product.price)}</td><td><InventoryStatus inventory={product.inventory} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
