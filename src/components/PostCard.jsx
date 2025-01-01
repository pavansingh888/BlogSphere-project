import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  //$id = written like this coz its appwrite syntax
  return (
    <Link to={`/post/${$id}`} className="w-72">
      <div className="w-full bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
        {/* Image Container */}
        <div className="w-full mb-4 flex justify-center">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover h-48 sm:h-60 md:h-68 md:h-72"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-blue-600 hover:text-emerald-500 mb-2 transition-colors duration-200">
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
