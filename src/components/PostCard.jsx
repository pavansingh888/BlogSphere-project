import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import { replacePreviewWithView } from '../utils/utils';

function PostCard({ $id, title, featuredImage, $updatedAt }) {
  //$id = written like this coz its appwrite syntax
  const originalUrl = service.getFilePreview(featuredImage).href;
  const updatedUrl = replacePreviewWithView(originalUrl);
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-60 bg-white rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col ">
        {/* Image Container */}
        <div className="flex justify-center ">
          <img
            src={updatedUrl}
            alt={title}
            className="rounded-t-md object-cover w-full h-56"
          />
        </div>

        {/* Title & metadata*/}
        <div className="mx-4 my-2">
          <h2
            className="text-xl font-semibold text-blue-900 hover:text-emerald-500 transition-colors duration-200 text-left  text-nowrap overflow-hidden"
            alt={title}
            title={title}
          >
            {title}
          </h2>

          <p className="text-sm text-left opacity-70">
            {new Date($updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
