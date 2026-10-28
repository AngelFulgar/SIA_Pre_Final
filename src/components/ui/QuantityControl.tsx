import { Button } from './Button'

interface QuantityControlProps {
  quantity: number
  onChange: (quantity: number) => void
  min?: number
  max?: number
  label?: string
}

export function QuantityControl({
  quantity,
  onChange,
  min = 1,
  max = Number.MAX_SAFE_INTEGER,
  label = 'Quantity',
}: QuantityControlProps) {
  return (
    <div className="quantity" aria-label={label}>
      <Button variant="ghost" aria-label="Decrease quantity" disabled={quantity <= min} onClick={() => onChange(quantity - 1)}>−</Button>
      <span aria-live="polite">{quantity}</span>
      <Button variant="ghost" aria-label="Increase quantity" disabled={quantity >= max} onClick={() => onChange(quantity + 1)}>+</Button>
    </div>
  )
}
