import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
      <div className="py-6 bg-gray-50 mx-2 md:mx-4 rounded-xl">
      <Container>
        <div className="post-subcontainer flex flex-col items-center border-2 border-blue-500 p-6 rounded-lg bg-white shadow-lg">
          {/* Featured Image */}
          <div className="w-full flex justify-center mb-6 relative rounded-xl">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl object-cover w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
            />
    
            {/* Edit/Delete Buttons (Visible for Author Only) */}
            {isAuthor && (
              <div className="absolute right-3 top-3 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base focus:bg-green-600 "
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base focus:bg-red-600"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
    
          {/* Post Title */}
          <div className="w-full mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              {post.title}
            </h1>
          </div>
    
          {/* Post Content */}
          <div className="w-full break-words text-justify text-gray-700 leading-relaxed max-w-xl sm:max-w-2xl md:max-w-3xl text-sm sm:text-base md:text-lg">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
    

    ) : (<div className="py-8 bg-gray-50">
      <Container>
        <div className="post-subcontainer flex flex-col items-center border-2 border-blue-500 p-6 rounded-lg bg-white shadow-lg animate-pulse">
          {/* Shimmer Image */}
          <div className="w-full flex justify-center mb-6 relative rounded-xl">
            <div className="rounded-xl bg-gray-200 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl max-h-[300px] sm:max-h-[400px] md:max-h-[500px] h-[200px] sm:h-[300px] md:h-[400px]"></div>
          </div>
    
          {/* Shimmer Title */}
          <div className="w-full mb-6 text-center">
            <div className="bg-gray-200 h-6 sm:h-8 md:h-10 w-3/5 mx-auto rounded"></div>
          </div>
    
          {/* Shimmer Content */}
          <div className="space-y-4 w-full flex flex-col items-center">
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 md:h-5 w-4/5 sm:w-3/4 md:w-2/3 rounded"></div>
          </div>
        </div>
      </Container>
    </div>
    
      );
}