import React from 'react'

// Invalid JSX component with multiple syntax errors
export const InvalidJSX = ({ data, config }) => {
  return (
    <div>
      <h2>Invalid JSX Component</h2>
      
      {/* Invalid self-closing tag */}
      <br></br>
      
      {/* Mixed HTML/JSX syntax */}
      <div class="should-be-className">
        <p for="should-be-htmlFor">Label text</p>
      </div>
      
      {/* Invalid attribute names */}
      <input 
        type="text"
        onclick="alert('should be onClick')"
        value="test"
        readonly="should be readOnly"
      />
      
      {/* Malformed JSX expressions */}
      <div>
        {/* Missing closing brace */}
        {data && 
          <p>Data exists</p>
        
        {/* Invalid expression syntax */}
        {config.}}
        
        {/* HTML entities instead of JSX */}
        <p>&nbsp;Non-breaking space&copy;</p>
      </div>
      
      {/* Invalid nesting */}
      <table>
        <div>Invalid div in table</div>
        <tr>
          <p>Invalid p in tr</p>
          <td>Valid cell</td>
        </tr>
      </table>
      
      {/* Fragment syntax errors */}
      <React.Fragment key="invalid-fragment-key">
        <div>Fragment with key</div>
      </React.Fragment>
      
      {/* Short fragment with invalid usage */}
      <>
        <div>Content 1</div>
      </>
      <>
        <div>Content 2</div>
      </>
      
      {/* Invalid component name (lowercase) */}
      <invalidComponent />
      
      {/* Multiple root elements without fragment */}
      <div>Root 1</div>
      <div>Root 2</div>
      
      {/* Invalid SVG in JSX */}
      <svg>
        <path d="invalid path data" />
        <g>
          <rect x="invalid" y="also invalid" />
        </g>
      </svg>
      
      {/* Invalid style object */}
      <div style={{
        backgroundColor: invalidVariable,
        margin: "10px 20px 30px", // Missing 4th value
        padding: true, // Invalid type
        zIndex: "should be number"
      }}>
        Styled content
      </div>
      
      {/* Missing return statement */}
}