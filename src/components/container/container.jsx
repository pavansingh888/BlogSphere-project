import React, { Children } from 'react'

//Why make container?  - it's a box in which we wrap value as it is from children, and we define styling properties for its children so that it applies to all the children.

function container() {
  return <div className='w-full max-w-7xl mx-auto px-4'> // advantage is we just change the width here so that it applies to all children.
        {Children}
    </div> ; //; not neccessary but recommended.
}

export default container