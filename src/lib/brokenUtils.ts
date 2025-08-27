// Invalid type imports
import { InvalidInterface } from '@/types/invalid'

// Type error: generic constraint on primitive
export function brokenGeneric<T extends string & number>(param: T): T {
  // Type error: returning wrong type
  return param.toString() as T
}

// Function with invalid parameter types
export const processData = (
  data: unknown[], // Too broad type
  callback: Function, // Should be properly typed
  options?: { [key: string]: any } // Avoid any type
) => {
  // Type error: using array methods on unknown
  return data.filter(item => item.isValid)
    .map(item => callback(item.value))
    .reduce((acc, curr) => acc + curr, "")  // Type error: string + unknown
}

// Async function with wrong return type annotation
export async function fetchData(url: string): Promise<string> {
  const response = await fetch(url)
  // Type error: returning Response instead of string
  return response
}

// Function that uses undefined variables
export const calculateTotal = (items: number[]): number => {
  // Using undefined variable
  const multiplier = undefinedMultiplier
  
  // Type error: using string method on number array
  return items.toUpperCase().length * multiplier
}

// Class with type errors
export class BrokenClass {
  // Missing type annotation
  private value
  
  // Invalid constructor parameter types
  constructor(initialValue: string & number) {
    // Type error: assigning union to untyped property
    this.value = initialValue
  }
  
  // Method with wrong return type
  public getValue(): number {
    // Type error: returning string when number expected
    return this.value.toString()
  }
  
  // Static method with errors
  static createInstance(param): BrokenClass {
    // Type error: missing return statement
    const instance = new BrokenClass(param)
  }
}

// Interface with invalid properties
export interface DataProcessor {
  // Invalid method signature
  process(data): Promise<>
  
  // Missing type for property
  config: 
  
  // Invalid optional syntax
  name?: & string
}

// Enum with errors
export enum BrokenEnum {
  FIRST = "first",
  SECOND = 2,
  // Type error: mixing string and number values inconsistently
  THIRD, // Should have explicit value
  FOURTH = "fourth" + 1 // Invalid string + number
}

// Function with recursive type error
export function recursiveError(param: any): any {
  // Calling itself with wrong parameters
  return recursiveError(param.toString(), "extra param")
}

// Export with wrong type assertion
export const wrongAssertion = "string" as number

// Function with promise error
export function promiseError(): Promise<void> {
  // Type error: not returning a Promise
  return "not a promise"
}

// Invalid object spread
export const invalidSpread = {
  ...undefinedObject,
  property: "value"
}

// Arrow function with generic error
export const genericArrow = <T,>(param: T): T => {
  // Type error: returning different type
  return {} as T
}

// Function with destructuring errors
export const destructureError = ({ name, age }: { name: string }) => {
  // Type error: destructuring property that doesn't exist
  return name + age
}