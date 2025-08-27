// Invalid type definitions file

// Type alias with syntax error
export type InvalidType = string &  // Missing second type in intersection

// Interface with invalid extends
export interface BadInterface extends unknown {
  value: string
  // Invalid property syntax
  brokenProp:
  anotherProp: never & string // Invalid intersection with never
}

// Generic type with invalid constraint
export type InvalidGeneric<T extends any & never> = {
  data: T
  // Self-referencing type causing infinite recursion
  self: InvalidGeneric<T>
}

// Enum with invalid values
export enum BrokenEnum {
  FIRST = "first",
  SECOND = 2,
  // Mixing types incorrectly
  THIRD = FIRST + SECOND // Invalid operation
}

// Type with circular reference
export type CircularType = {
  value: string
  next: CircularType
  // Invalid recursive structure
  children: CircularType[]
  parent: CircularType | null
  // This creates impossible type constraints
  self: CircularType & string
}

// Invalid union type
export type BadUnion = string | | number // Syntax error: double pipe

// Interface merging with conflicts
export interface ConflictingInterface {
  value: string
}

export interface ConflictingInterface {
  value: number // Conflicts with above definition
}

// Invalid mapped type
export type BrokenMapped<T> = {
  [K in keyof T]: T[K] extends string ? never : // Invalid conditional type
}

// Type with invalid index signature
export interface InvalidIndexSignature {
  [key: string & number]: boolean // Invalid key type
}

// Utility type with errors
export type ExtractInvalid<T> = T extends { value: infer U } 
  ? U extends string 
    ? U 
    : never 
  : // Missing else clause

// Invalid function type
export type BrokenFunction = (param: unknownType) => invalidReturnType

// Module declaration with errors
declare module "non-existent-module" {
  // Invalid export syntax
  export = invalidExport
  
  // Missing type for export
  export const brokenExport:
}