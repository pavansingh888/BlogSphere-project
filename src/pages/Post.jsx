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
        <div className="py-8 bg-gray-50">
  <Container>
    <div className="post-subcontainer flex flex-col items-center border-2 border-blue-500 p-6 rounded-lg bg-white shadow-lg">
      {/* Featured Image */}
      <div className="w-full flex justify-center mb-6 relative rounded-xl">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl object-cover w-4/6 max-h-[500px]"
        />

        {/* Edit/Delete Buttons (Visible for Author Only) */}
        {isAuthor && (
          <div className="absolute right-3 top-3 flex gap-2">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="px-4 py-2 text-sm">
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-500"
              className="px-4 py-2 text-sm"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Post Title */}
      <div className="w-full mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
      </div>

      {/* Post Content */}
      <div className="text-justify text-gray-700 leading-relaxed max-w-3xl">
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
              <div className="rounded-xl bg-gray-200 w-4/6 max-h-[500px] h-[400px]"></div>
            </div>
      
            {/* Shimmer Title */}
            <div className="w-full mb-6 text-center">
              <div className="bg-gray-200 h-8 w-3/5 mx-auto rounded"></div>
            </div>
      
            {/* Shimmer Content */}
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
            </div>
          </div>
        </Container>
      </div>
      );
}