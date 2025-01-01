import React from 'react'

const PostCardShimmer = () => {
  return (
    <div className="w-72">
  <div className="w-full bg-white rounded-xl shadow-md p-4">
    {/* Shimmer Image Placeholder */}
    <div className="w-full mb-4 flex justify-center">
      <div className="rounded-xl bg-gray-200 w-full h-48 sm:h-60 md:h-68 animate-pulse"></div>
    </div>

    {/* Shimmer Title Placeholder */}
    <div className="h-6 bg-gray-200 rounded-md mb-2 w-3/4 animate-pulse"></div>

    {/* Optional Description or Metadata Placeholder */}
    <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
  </div>
</div>

  )
}

export default PostCardShimmer