export function LoadingState({ label = 'Loading products' }: { label?: string }) {
  return <p className="loading-state" role="status">{label}<span className="loading-state__dots">...</span></p>
}
