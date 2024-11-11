import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Comment from "../components/Comment";
import { Helmet } from "react-helmet";
import { formatDateWithDayName } from "../utils/formateDate";

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

  if (!post) return null;

  // Structured data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title, // Title of the post
    "datePublished": post.$createdAt, // Use the created date
    "articleBody": post.content, // Content of the post
    "author": {
      "@type": "Person",
      "name": post.authorName, // Assuming you store author's name
    },
    "publisher": {
      "@type": "Organization",
      "name": "My Blog", // Your website's name
      "logo": {
        "@type": "ImageObject",
        "url": "https://appwrite-blog-one-topaz.vercel.app/", // Your site's logo URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://appwrite-blog-one-topaz.vercel.app/post/${post.$id}`, // Dynamic URL for the post
    },
    "image": post.featuredImage, // Image of the post
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.content} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content} />
        <meta property="og:image" content={post.featuredImage} />
        {/* Add JSON-LD structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Container>
        <div className="w-full mb-6">
          <h2 className="text-xl font-medium text-text-purple py-3">
            {formatDateWithDayName(post.$createdAt)}
          </h2>
          <div className="relative flex items-center justify-around">
            <h1 className="text-4xl font-bold">{post.title}</h1>

            {isAuthor && (
              <div>
                <Link to={`/edit-post/${post.$id}`}>
                  <a
                    href="#_"
                    className="relative z-30 mr-2 inline-flex items-center justify-center w-auto px-5 py-2 overflow-hidden font-bold text-gray-500 transition-all duration-500 border border-gray-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white"
                  >
                    <span className="w-full h-0.5 absolute bottom-0 group-active:bg-transparent left-0 bg-gray-100"></span>
                    <span className="h-full w-0.5 absolute bottom-0 group-active:bg-transparent right-0 bg-gray-100"></span>
                    Edit
                  </a>
                </Link>
                <Button
                  bgColor="bg-red-500 hover:bg-red-400"
                  className="font-bold"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex mb-4 relative rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-10/12 rounded-xl text-left"
          />
        </div>

        <div className="browser-css w-10/12">{parse(post.content)}</div>
        <div className="browser-css">{parse(post.categories)}</div>

        <Comment postId={slug} />
      </Container>
    </div>
  );
}
