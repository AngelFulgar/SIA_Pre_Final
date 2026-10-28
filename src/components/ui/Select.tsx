import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: readonly string[]
}

export function Select({ label, id, options, ...props }: SelectProps) {
  const selectId = id ?? props.name
  return (
    <label className="field" htmlFor={selectId}>
      <span className="field__label">{label}</span>
      <select className="field__control" id={selectId} {...props}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}
