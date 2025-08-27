import { NextRequest, NextResponse } from 'next/server'
// Import that doesn't exist
import { validateData } from '@/lib/nonExistentValidator'

// Invalid type definition for API response
interface APIResponse {
  success: boolean
  data: unknown[] & string // Invalid intersection
  // Missing semicolon
  error?: string
  timestamp
}

// GET handler with type errors
export async function GET(request: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    // Using undefined function
    const validationResult = validateData(request.url)
    
    // Type error: wrong parameter type
    const searchParams = new URLSearchParams(request.body)
    
    // Type error: accessing non-existent property
    const userAgent = request.headers.userAgent.toLowerCase()
    
    // Invalid object construction
    const response: APIResponse = {
      success: true,
      // Type error: assigning string to array & string intersection
      data: "should be array and string",
      timestamp: Date.now() // Missing type annotation in interface
    }
    
    // Type error: returning wrong type
    return NextResponse.json(response, { 
      status: "200", // Should be number
      headers: {
        'Content-Type': 'application/json',
        // Invalid header value type
        'Custom-Header': true
      }
    })
    
  } catch (error) {
    // Type error: using error without proper type guard
    console.error(error.message.toUpperCase())
    
    // Invalid error response
    return NextResponse.json({
      success: false,
      error: error, // Should be string, not Error object
      // Missing required properties
    }, { 
      status: 500,
      // Invalid header object
      headers: "should be object"
    })
  }
}

// POST handler with different errors
export async function POST(request: NextRequest) {
  // Missing return type annotation
  
  // Type error: using request incorrectly
  const body = await request.json.parse()
  
  // Using non-existent method
  const processedBody = body.invalidMethod()
  
  // Type error: wrong Response constructor usage
  return new NextResponse(
    JSON.stringify({
      message: "Post processed",
      data: processedBody
    }),
    // Invalid options object
    {
      status: "201", // Should be number
      headers: [
        ['Content-Type', 'application/json'] // Should be object, not array
      ]
    }
  )
}

// Invalid HTTP method export
export async function INVALID_METHOD(request: NextRequest) {
  // This method name is not valid for Next.js API routes
  return NextResponse.json({ error: "Invalid method" })
}

// Function without export (won't be accessible)
async function privateHandler(request: NextRequest) {
  return NextResponse.json({ message: "Private" })
}

// Export with wrong type
export const config = "should be object" as RequestInit