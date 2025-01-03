import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  //$id = written like this coz its appwrite syntax
  return (
    <Link to={`/post/${$id}`} >
      <div className="w-64 bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-200">
        {/* Image Container */}
        <div className="mb-2 flex justify-center">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-lg object-cover w-56 h-68"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-blue-600 hover:text-emerald-500 transition-colors duration-200 text-left  text-nowrap overflow-hidden" alt={title} title={title}>
          {title}
        </h2>

        {/* Optional Description or Metadata */}
        {/* You can add a short description or metadata here if required */}
        {/* <p className="text-sm text-gray-700 truncate">{description}</p> */}
      </div>
    </Link>
  );
}

export default PostCard;
