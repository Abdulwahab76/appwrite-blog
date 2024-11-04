import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const searchTerm = useSelector((state) => state.search);


  function formatDateWithDayName(timestamp) {
     const date = new Date(timestamp);

    // Get day name using Intl.DateTimeFormat
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Return formatted date as Day, YYYY-MM-DD
    return `${dayName}, ${year}-${month}-${day}`;
}

  useEffect(() => {
    if (!searchTerm) {
      appwriteService.getPosts().then((allPosts) => {
        if (allPosts) {
          setPosts(allPosts.documents);
        }
      });
    } else {
      setPosts((prev) =>
        prev.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);
  console.log(posts,'posts==');
  

  if (posts.length === 0)
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </div>
      </Container>
    </div>;

  return (
    <div>
      <div>
        <h1 className="text-9xl font-semibold text-center border-b border-gray-200 py-5">
          THE BLOGS
        </h1>
      </div>
      <Container>
        <p className="text-2xl font-semibold py-10">Recent blog posts</p>
        <div className="flex flex-wrap">
          {posts.slice(7,8).map((post) => (
            <div key={post.$id} className="p-2">
              <Link to={`/post/${post.$id}`}>
                <div className="   rounded-xl p-4">
                  <div className=" max-w-7xl w-full justify-center mb-4">
                    <img
                      src={appwriteService.getFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="rounded-lg object-cover w-[1200px] min-w-7xl h-96 "
                    />
                  </div>
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <h2 className="text-xl font-bold">{formatDateWithDayName(post.$createdAt)}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
