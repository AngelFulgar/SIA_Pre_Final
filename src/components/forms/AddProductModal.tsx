import { useState, type FormEvent } from 'react'
import { PRODUCT_CATEGORIES, type ProductCategory } from '../../types/product'
import type { ProductInput } from '../../utils/validators'
import { Button, Input, Modal, Select } from '../ui'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (input: ProductInput) => string | undefined
}

export function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ProductCategory>(PRODUCT_CATEGORIES[0])
  const [price, setPrice] = useState('')
  const [inventory, setInventory] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationError = onSubmit({
      name, description, category, price: Number(price), inventory: Number(inventory),
    })
    if (validationError) {
      setError(validationError)
      return
    }
    setName('')
    setDescription('')
    setCategory(PRODUCT_CATEGORIES[0])
    setPrice('')
    setInventory('')
    setError('')
    onClose()
  }

  return (
    <Modal title="Add a product" isOpen={isOpen} onClose={onClose}>
      <form className="product-form" onSubmit={submit}>
        <p className="product-form__intro">Add a thoughtful find to your collection.</p>
        <Input label="Product name" name="name" required maxLength={70} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Sunday ceramic mug" />
        <label className="field" htmlFor="description">
          <span className="field__label">Description</span>
          <textarea className="field__control field__textarea" id="description" required maxLength={240} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What makes it special?" />
        </label>
        <Select label="Category" name="category" value={category} onChange={(event) => setCategory(event.target.value as ProductCategory)} options={PRODUCT_CATEGORIES} />
        <div className="product-form__row">
          <Input label="Price (USD)" name="price" type="number" min="0.01" step="0.01" required value={price} onChange={(event) => setPrice(event.target.value)} />
          <Input label="Available units" name="inventory" type="number" min="0" step="1" required value={inventory} onChange={(event) => setInventory(event.target.value)} />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <Button type="submit">Add to collection</Button>
      </form>
    </Modal>
  )
}
