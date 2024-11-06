import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import ArrowIcons from "../assets/Arrow";
import Pagination from "../components/PaginatedList";
import { formatDateWithDayName } from "../utils/formateDate";
function Home() {
  const [posts, setPosts] = useState([]);
  const searchTerm = useSelector((state) => state.search);

  function formatDateWithDayName(timestamp) {
    const date = new Date(timestamp);
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
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
          {posts.slice(7, 8).map((post) => (
            <div key={post.$id} className="p-2">
              <div className="   rounded-xl p-4">
                <div className=" max-w-7xl w-full justify-center mb-4">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg object-contain  md:object-cover w-full  md:w-[1200px]   h-96 "
                  />
                </div>
                <h2 className="text-xl font-medium text-text-purple py-3">
                  {formatDateWithDayName(post.$createdAt)}
                </h2>
                <div className="flex justify-between">
                  <h2 className="text-4xl  font-medium py-5 items-center">
                    {post.title}
                  </h2>
                  <Link to={`/post/${post.$id}`}>
                    {/* <img src={ArrowIcon} className="h-4 w-4"/> */}
                    <ArrowIcons />
                  </Link>
                </div>
                <h2 className="text-2xl   py-5 text-gray-500 pb-7">
                  {parse(post.content)}
                </h2>
                <span className="bg-text-purple/10 p-1 rounded-xl  text-text-purple font-medium px-2">
                  {post.categories}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.slice(0, 2).map((post) => (
              <div key={post.$id} className="p-2 w-full ">
                <Link to={`/post/${post.$id}`}>
                  <div className="w-full flex-col md:flex-row rounded-xl p-4 flex">
                    <div className="w-full md:w-3/6  justify-center mb-4">
                      <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl h-80 object-cover w-11/12"
                      />
                    </div>
                    <div className="w-full md:w-4/12">
                      <h2 className="text-xl font-medium text-text-purple py-3">
                        {formatDateWithDayName(post.$createdAt)}
                      </h2>

                      <h2 className="text-2xl font-medium">{post.title}</h2>
                      <h2 className="text-xl   py-5 text-gray-500 pb-7">
                        {parse(post.content.substring(0, 50))}
                      </h2>
                      <span className="bg-text-purple/10 p-1 rounded-xl  text-text-purple font-medium px-2">
                        {post.categories}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div></div>
        </Container>
      </div>

      <PaginatedItems items={posts} itemsPerPage={5} />
    </div>
  );
}

export default Home;

 
const PaginatedItems = ({ items = [], itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
      <div>
          <div className="w-full py-8">
              <Container>
                  <p className="text-2xl font-semibold py-10">All blog posts</p>
                  <div className="grid  grid-cols-12 ">
                      {currentItems.length > 0 ? (
                          currentItems.map((post) => (
                              <div key={post.$id} className="col-span-12 sm:col-span-6 md:col-span-4    ">
                                  <Link to={`/post/${post.$id}`}>
                                      <div className="w-full flex-col rounded-xl p-4 flex">
                                          <div className="w-full mb-4">
                                              <img
                                                  src={appwriteService.getFilePreview(post.featuredImage)}
                                                  alt={post.title}
                                                  className="rounded-xl h-80 object-cover "
                                              />
                                          </div>
                                          <div className="w-full">
                                              <h2 className="text-xl font-medium text-text-purple py-3">
                                                  {formatDateWithDayName(post.$createdAt)}
                                              </h2>
                                              <h2 className="text-2xl font-medium">{post.title}</h2>
                                              <h2 className="text-xl py-5 text-gray-500 pb-7">
                                                  {parse(post.content.substring(0, 50))}
                                              </h2>
                                              <span className="bg-text-purple/10 p-1 rounded-xl text-text-purple font-medium px-2">
                                                  {post.categories}
                                              </span>
                                          </div>
                                      </div>
                                  </Link>
                              </div>
                          ))
                      ) : (
                          <p className="text-gray-500">No posts available.</p>
                      )}
                  </div>
              </Container>
          </div>

          {/* Show Pagination only if there are items */}
          {items.length > itemsPerPage && (
              <Pagination
                  totalItems={items.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
              />
          )}
      </div>
  );
};
