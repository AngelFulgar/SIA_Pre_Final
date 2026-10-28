export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatQuantity(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}
