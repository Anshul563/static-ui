import * as React from "react"

export function NumberField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props
  return (
    <div className={`inline-flex items-center border border-border rounded-md ${className}`}>
      <input type="number" className="px-2 py-1 bg-transparent outline-none w-full" {...rest} />
    </div>
  )
}

export default NumberField
