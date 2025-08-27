import React from 'react'
// Circular dependency: B imports A
import { CircularA } from './CircularA'

interface CircularBProps {
  value?: string
}

export const CircularB: React.FC<CircularBProps> = ({ value = "B" }) => {
  return (
    <div className="p-2 border border-orange-500">
      <h4>Circular Component B</h4>
      <p>Value from B: {value}</p>
      
      {/* This completes the circular dependency */}
      <CircularA value={`From B: ${value}`} />
    </div>
  )
}