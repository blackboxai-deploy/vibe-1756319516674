import React from 'react'
// Circular dependency: A imports B
import { CircularB } from './CircularB'

interface CircularAProps {
  value?: string
}

export const CircularA: React.FC<CircularAProps> = ({ value = "A" }) => {
  return (
    <div className="p-4 border border-purple-500">
      <h3>Circular Component A</h3>
      <p>Value from A: {value}</p>
      
      {/* This creates the circular dependency */}
      <CircularB value={`From A: ${value}`} />
    </div>
  )
}