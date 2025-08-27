'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'

interface HookErrorsProps {
  initialValue: number
}

export const HookErrors: React.FC<HookErrorsProps> = ({ initialValue }) => {
  // Hook called conditionally (violates rules of hooks)
  if (initialValue > 10) {
    const [conditionalState] = useState(0)
  }
  
  const [count, setCount] = useState(initialValue)
  const [name, setName] = useState("")
  
  // useEffect with missing dependencies
  useEffect(() => {
    console.log(count, name, initialValue)
    setCount(count + 1) // Missing count dependency
  }, []) // Empty dependency array but using count, name, initialValue
  
  // Hook inside a loop (violates rules of hooks)
  for (let i = 0; i < 3; i++) {
    const [loopState] = useState(i)
  }
  
  // useMemo with incorrect dependencies
  const expensiveCalculation = useMemo(() => {
    return count * initialValue + name.length
  }, [count]) // Missing initialValue and name dependencies
  
  // useCallback with wrong dependencies
  const handleClick = useCallback((newValue: string) => {
    setName(newValue)
    setCount(count + 1) // Using stale closure
  }, [name]) // Missing count dependency
  
  // Nested hook call (violates rules of hooks)
  const nestedHook = () => {
    const [nestedState] = useState("nested") // Hook inside regular function
    return nestedState
  }
  
  // Hook after early return (violates rules of hooks)
  if (count > 100) {
    return <div>Count too high</div>
  }
  
  const [lateHook] = useState("should be before return")
  
  // Invalid hook dependency
  useEffect(() => {
    // Accessing state that might be stale
    const timer = setTimeout(() => {
      setCount(count + 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, []) // Missing count dependency
  
  // Hook in try-catch (not recommended pattern)
  try {
    const [tryState] = useState("in try block")
  } catch (error) {
    const [catchState] = useState("in catch block")
  }
  
  return (
    <div className="p-4 border border-red-500">
      <h3>Hook Errors Component</h3>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <p>Expensive calc: {expensiveCalculation}</p>
      <p>Late hook: {lateHook}</p>
      <p>Nested hook result: {nestedHook()}</p>
      
      <button onClick={() => handleClick("new name")}>
        Update Name
      </button>
      
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
    </div>
  )
}