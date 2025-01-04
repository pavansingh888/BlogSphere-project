import React from 'react'
//; not neccessary but recommended.
//advantage is we just change the width here so that it applies to all children
//Why make container?  - it's a box in which we wrap value as it is from children, and we define styling properties for its children so that it applies to all the children.

function Container({ children }) {
  
  return (<div className='w-full max-w-7xl mx-auto px-4' > 
        {children}
    </div>) 
}

export default Container