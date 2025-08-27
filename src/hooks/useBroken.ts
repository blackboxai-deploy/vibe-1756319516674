'use client'

import { useState, useEffect, useCallback } from 'react'
// Import from non-existent module
import { apiCall } from '@/lib/api'

// Invalid hook interface
interface UseBrokenReturn {
  data: unknown & never // Invalid type intersection
  loading: boolean
  error: string | Error | undefined // Inconsistent error type
  // Missing function signature
  refetch(): 
}

// Hook that violates rules of hooks
export const useBroken = (initialData?: any): UseBrokenReturn => {
  
  // Conditional hook usage (violates rules of hooks)
  if (initialData) {
    const [conditionalState] = useState(initialData)
  }
  
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  
  // Hook in try-catch block (not recommended)
  try {
    const [tryState] = useState("dangerous")
  } catch {
    const [catchState] = useState("also dangerous")
  }
  
  // useEffect with incorrect dependency array
  useEffect(() => {
    console.log(data, loading, error, initialData)
    setData(data + " modified") // Stale closure issue
  }, []) // Missing dependencies
  
  // Hook inside loop (violates rules)
  for (let i = 0; i < data.length; i++) {
    const [loopHook] = useState(i)
  }
  
  // useCallback with wrong dependencies
  const refetch = useCallback(async () => {
    setLoading(true)
    setError(undefined)
    
    try {
      // Using undefined function
      const response = await apiCall(data)
      setData(response.data)
      setLoading(false)
    } catch (err) {
      // Type error: assigning Error object to string state
      setError(err)
      setLoading(false)
    }
  }, [data]) // Missing setLoading, setError dependencies (though they're stable)
  
  // Hook after early return (violates rules)
  if (error) {
    return {
      data: null,
      loading: false,
      error,
      refetch
    }
  }
  
  const [postReturnHook] = useState("after return") // Hook after conditional return
  
  // Invalid return type
  return {
    data: data as unknown & never, // Invalid type assertion
    loading,
    error,
    // Type error: function signature doesn't match interface
    refetch: () => refetch("invalid parameter")
  }
}

// Hook that doesn't start with "use" (invalid naming)
export const brokenHookNaming = () => {
  const [state] = useState("should start with use")
  return state
}

// Hook with invalid generic constraints
export function useGenericBroken<T extends any & never>(
  initialValue: T
): { value: T; setValue: (val: T) => void } {
  
  const [value, setValue] = useState<T>(initialValue)
  
  // Hook inside nested function (violates rules)
  const nestedFunction = () => {
    const [nested] = useState("invalid nesting")
    return nested
  }
  
  return {
    value,
    // Type error: wrong function signature
    setValue: (newValue) => setValue(newValue + "modified")
  }
}