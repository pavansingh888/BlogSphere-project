import React from 'react'

const PostCardShimmer = () => {
  return (
    <div className="w-60 flex flex-col">
  <div className="w-full bg-white rounded-md shadow-md">
    {/* Shimmer Image Placeholder */}
    <div className="w-full mb-4 flex justify-center">
      <div className="rounded-t-md bg-gray-200 w-full h-52 animate-pulse"></div>
    </div>

    <div className="mx-4 my-2">
    <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-1 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-1 animate-pulse"></div>
    </div>
  </div>
</div>

  )
}

export default PostCardShimmer