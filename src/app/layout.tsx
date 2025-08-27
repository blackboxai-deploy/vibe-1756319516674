import type { Metadata } from 'next/metadata'
import { Inter } from 'next/font/google'
import './globals.css'
// Import broken CSS
import '@/styles/broken.css'

const inter = Inter({ subsets: ['latin'] })

// Invalid metadata with type errors
export const metadata: Metadata = {
  title: 'Build Error Testing App',
  description: 'App with intentional build errors',
  // Type error: invalid property type
  viewport: true, // Should be string or ViewportOptions
  // Invalid metadata property
  invalidProperty: "shouldn't exist"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Using undefined variable
  console.log(undefinedLayoutVariable)
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Type error: using number as children */}
        {42}
        {children}
        
        {/* Invalid script tag in layout */}
        <script>
          console.log("Invalid inline script in JSX")
        </script>
      </body>
    </html>
  )
}