import React from 'react'
import BlogSphereLogo from '../assets/BlogLogo.jpg'

function Logo({width = 80}) {
  return (
    <div className={`w-[80px]`}>
      <img alt='BlogSphere Icon' src={BlogSphereLogo} className='rounded-full'/>
    </div>
  )
}

export default Logo