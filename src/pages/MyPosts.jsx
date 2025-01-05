import React, { useState, useEffect } from "react";
import { Container, PostCard, PostCardShimmer } from "../components";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ToggleStatus from "../components/ToggleStatus";

function MyPosts() {
  const [posts, setPosts] = useState([]); //inside which we will take array of posts.
  const [loading, setLoading] = useState(true);
  const userId = useSelector((store) => store?.auth?.userData?.$id);
  const [showStatus, setShowStatus] = useState("Active");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    appwriteService.getUserPosts(userId, showStatus).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, [showStatus, setShowStatus]); //when the component will get loaded, useEffect will be used.

  if (!loading && posts.length === 0) {
    return (
      <div className="w-full mt-4 bg-cyan-50 min-h-screen">
        <Container>
          <ToggleStatus
            showStatus={showStatus}
            setShowStatus={(status) => setShowStatus(status)}
          />

          <div className="flex flex-wrap justify-center mt-20 py-8">
            <div className="p-4 w-full md:w-2/3 lg:w-1/2">
              <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
                No {showStatus} Posts Available
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                It looks like there are no posts available at the moment. Click
                below to get started with a post.
              </p>
              <div className="text-center">
                <Link to="/add-post">
                  <button className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 duration-200">
                    Add Post
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 bg-cyan-50 min-h-screen">
      <Container>
        <ToggleStatus
          showStatus={showStatus}
          setShowStatus={(status) => setShowStatus(status)}
        />
        <div className="flex flex-wrap justify-center mt-16">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="m-4">
                  <PostCardShimmer />
                </div>
              ))
            : posts.map((post) => (
                <div key={post.$id} className="m-4">
                  <PostCard {...post} />
                </div>
              ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
