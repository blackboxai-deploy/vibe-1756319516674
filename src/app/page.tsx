'use client'

import React, { useState, useEffect } from 'react'
import { BrokenComponent } from '@/components/BrokenComponent'
import { InvalidJSX } from '@/components/InvalidJSX'
import { MissingImports } from '@/components/MissingImports'
import { CircularA } from '@/components/CircularA'
import { HookErrors } from '@/components/HookErrors'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
// This import doesn't exist and will cause an error
import { NonExistentComponent } from '@/components/DoesNotExist'
import styles from '@/styles/missing.module.css'

// Invalid interface definition
interface InvalidInterface {
  name: string
  age: number
  // Missing semicolon and invalid property syntax
  invalidProperty
  anotherBroken: unknown & string // Invalid intersection
}

// Type error: trying to extend from a union type
interface AnotherBroken extends string | number {
  value: string
}

// Function with multiple type errors
const brokenFunction = (param: InvalidInterface): Promise<void> => {
  // Type error: return type mismatch
  return param.name + param.age
}

export default function Home() {
  // Type error: useState with wrong initial type
  const [count, setCount] = useState<string>(0)
  const [user, setUser] = useState<InvalidInterface>({
    name: "John",
    // Missing required properties
  })

  // Invalid useEffect dependency
  useEffect(() => {
    // Type error: accessing undefined property
    console.log(user.nonExistentProperty)
    
    // Type error: wrong function call
    brokenFunction()
    
    // Undefined variable reference
    console.log(undefinedVariable)
  }, []) // Missing dependency: user

  // Type error: invalid event handler type
  const handleClick: React.MouseEvent = (event) => {
    // Type error: treating string as number
    setCount(count + 1)
    
    // Type error: calling undefined method
    event.preventDefault.call()
  }

  // Type error: invalid return type annotation
  const renderBrokenContent = (): JSX.Element[] => {
    // Type error: returning wrong type
    return <div>Should return array but returning single element</div>
  }

  return (
    <main className={`${styles.nonExistentClass} flex min-h-screen flex-col items-center justify-between p-24`}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Build Error Testing App
        </h1>
        
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            This app intentionally contains multiple build errors for testing purposes.
          </p>
        </div>

        {/* Type error: using count as number when it's typed as string */}
        <Card className="p-6">
          <h2>Counter: {count}</h2>
          <Button 
            onClick={handleClick}
            // Type error: invalid prop type
            disabled="false"
            // Non-existent prop
            invalidProp={true}
          >
            Increment (Currently: {count.toFixed(2)})
          </Button>
        </Card>

        {/* Components with various errors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Type error: passing wrong prop types */}
          <BrokenComponent 
            name={123} 
            age="not a number"
            // Missing required props
          />
          
          {/* Component with JSX syntax errors */}
          <InvalidJSX 
            data={user}
            // Type error: passing function instead of object
            config={brokenFunction}
          />
          
          {/* Component with missing imports */}
          <MissingImports 
            items={[1, 2, 3]}
            // Type error: array where object expected
            user={["invalid", "user", "data"]}
          />
          
          {/* Circular dependency component */}
          <CircularA />
          
          {/* Component with React hooks errors */}
          <HookErrors 
            // Type error: passing undefined
            initialValue={undefined}
          />
          
          {/* Component that doesn't exist */}
          <NonExistentComponent />
          
        </div>

        {/* Invalid JSX structure */}
        <div>
          <p>Text content
          <!-- HTML comment in JSX (invalid) -->
          </p>
          {/* Missing closing tag */}
          <span>Unclosed span
          
          {/* Type error: trying to render object directly */}
          {user}
          
          {/* Invalid expression in JSX */}
          {count + user.name}
        </div>

        {/* Type error: conditional rendering with wrong types */}
        {count && <div>Count is truthy</div>}
        
        {/* Invalid ternary operator usage */}
        {user.name ? <p>Hello {user.name}</p> : user.age > 18 ? <p>Adult</p>}
        
        {/* Type error: map on non-array */}
        {user.map((item, index) => (
          <div key={index}>{item}</div>
        ))}

        {/* Render broken content function */}
        {renderBrokenContent()}
      </div>
    </main>
  )
}