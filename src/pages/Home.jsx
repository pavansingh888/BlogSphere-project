import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, PostCardShimmer } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        console.log(posts);

        setPosts(posts.documents);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (!loading && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 bg-cyan-50">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="p-4 w-full md:w-2/3 lg:w-1/2">
              <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
                No Posts Available Yet
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                It looks like there are no posts available at the moment. Log in
                to get started or check back later.
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
    <div className="w-full bg-cyan-50">
      <Container>
        <h1 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-center text-blue-600 mb-6">
          Welcome to Your Next Read: Explore Fresh Insights & Inspiring Stories
        </h1>

        <div className="flex flex-wrap justify-center">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="m-3">
                  <PostCardShimmer />
                </div>
              ))
            : posts.map((post) => (
                <div key={post.$id} className="m-3">
                  <PostCard {...post} />
                </div>
              ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
