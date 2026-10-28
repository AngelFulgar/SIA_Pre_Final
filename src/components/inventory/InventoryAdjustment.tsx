import { useState, type FormEvent } from 'react'
import type { Product } from '../../types'
import { Button, Input } from '../ui'

export function InventoryAdjustment({ products, onAdjust }: {
  products: Product[]
  onAdjust: (productId: string, adjustment: number) => boolean
}) {
  const [productId, setProductId] = useState(products[0]?.id ?? '')
  const [amount, setAmount] = useState('1')
  const [message, setMessage] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const quantity = Number(amount)
    if (!Number.isInteger(quantity) || quantity === 0) {
      setMessage('Enter a non-zero whole number.')
      return
    }
    if (!onAdjust(productId, quantity)) {
      setMessage('This adjustment would make available stock lower than items in customer carts.')
      return
    }
    setMessage('Inventory updated.')
  }

  if (products.length === 0) return null
  return (
    <form className="inventory-adjustment" onSubmit={submit}>
      <label className="field">
        <span className="field__label">Adjust stock for</span>
        <select className="field__control" value={productId} onChange={(event) => setProductId(event.target.value)}>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name} · {product.inventory} available</option>)}
        </select>
      </label>
      <Input label="Change units" type="number" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} />
      <Button type="submit" variant="secondary">Update stock</Button>
      {message && <span className="inventory-adjustment__message" role="status">{message}</span>}
    </form>
  )
}
