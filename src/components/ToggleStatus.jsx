import React from 'react'

const ToggleStatus = ({showStatus,setShowStatus}) => {
    

  return (
    <div className="flex items-center justify-center mb-8">
      <button
        className={`px-4 py-2 font-bold rounded-s-3xl ${
          showStatus === "Active"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={()=>setShowStatus("Active")}
      >
        Active Posts
      </button> 
      <button
        className={`px-4 py-2 font-bold rounded-e-3xl ${
          showStatus === "Inactive"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={()=>setShowStatus("Inactive")}
      >
        Inactive Posts
      </button>
    </div>
  )
}

export default ToggleStatus