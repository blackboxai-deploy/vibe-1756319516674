'use client'

import React from 'react'
// Import that doesn't exist
import { UtilityFunction } from '@/lib/nonExistentUtils'
import { InvalidType } from '@/types/invalid'

// Interface with errors
interface BrokenProps {
  name: string
  age: number
  // Invalid optional syntax
  email?: string & number // Invalid intersection
  // Missing type annotation
  callback
  // Circular type reference
  self: BrokenProps
}

// Type error: extending from primitive
interface ExtendedProps extends string {
  extraProp: boolean
}

// Component with multiple type errors
export const BrokenComponent: React.FC<BrokenProps> = ({ 
  name, 
  age, 
  email,
  callback,
  // Missing destructured prop: self
}) => {
  // Type error: using string method on number
  const processedAge = age.toUpperCase()
  
  // Type error: undefined variable
  console.log(undefinedVar)
  
  // Type error: calling function with wrong parameters
  const result = UtilityFunction(name, age, "extra", true)
  
  // Type error: invalid operation
  const combined = name + age + email
  
  // Invalid state type
  const [state, setState] = React.useState<never>("invalid")
  
  // Type error: wrong event handler signature
  const handleClick: React.FormEvent<HTMLDivElement> = (event: React.MouseEvent) => {
    // Type error: accessing wrong event properties
    console.log(event.target.value)
    setState(name + age)
    
    // Call undefined function
    callback.nonExistentMethod()
  }
  
  // Type error: invalid async function without Promise return
  const invalidAsync = async (): string => {
    // Missing await keyword
    const data = Promise.resolve("test")
    return data
  }
  
  // Type error: wrong return type
  if (name.length < 0) {
    // Should return JSX.Element but returning number
    return 42
  }

  return (
    <div 
      className="p-4 border border-red-500"
      // Type error: wrong event handler type
      onClick={handleClick}
      // Invalid HTML attribute
      invalidAttribute="test"
      // Type error: boolean where string expected
      aria-label={true}
    >
      <h3 className="text-lg font-semibold text-red-600">
        Broken Component
      </h3>
      
      {/* Type error: using number as React child */}
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Processed Age: {processedAge}</p>
      <p>Combined: {combined}</p>
      <p>Result: {result}</p>
      
      {/* Type error: rendering object directly */}
      {state}
      
      {/* Type error: invalid prop spread */}
      <div {...name}>
        Content
      </div>
      
      {/* Missing closing tag - JSX syntax error */}
      <span>Unclosed span
      
      {/* Invalid nested structure */}
      <div>
        <p>Paragraph inside span</p>
      
      {/* Type error: array method on string */}
      {name.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
      
      {/* Invalid conditional rendering */}
      {age && name && callback && (
        <div>
          {/* Type error: using undefined function */}
          {invalidFunction(name)}
        </div>
      )}
      
      {/* Multiple unclosed tags */}
      <div>
        <p>Nested content
        <span>More nesting
    </div>
  )
}

// Export with wrong type
export { BrokenComponent as default }

// Invalid additional export
export const AnotherBrokenExport: number = "string value"

// Function with generic error
export function genericError<T extends never>(param: T): T {
  // Type error: returning wrong type
  return "not T type"
}