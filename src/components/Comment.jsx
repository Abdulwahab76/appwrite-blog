import React, { useState, useEffect } from "react";
import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const client = new Client();

  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

  useEffect(() => {
    const fetchComments = async () => {
      appwriteService.getCommentsOnPost(postId).then((response) => {
        setComments(response.documents);
      });
    };
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText !== "") {
      appwriteService
        .createCommentsOnPost(postId, commentText, userData.$id)
        .then((response) => {
          setComments([...comments, response]);
          setCommentText("");
        });
    }
  };
  const handleDeleteComment = async (commentId) => {
    appwriteService
      .deleteCommentOnPost(commentId)
      .then(
        setComments((prev) => prev.filter((item) => item.$id !== commentId))
      );
  };

  console.log(comments);

  return (
    <div className="flex pt-10 flex-col gap-y-5">
      <h1 className="font-medium text-2xl">Reply to post</h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="flex flex-col gap-y-3   " key={comment.$id}>
            <div className="flex items-center gap-x-3     border-gray-400 ">
              
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
                className="w-10 h-10"
                alt=""
              />
              <p>{userData.name}</p>
            </div>

            <div className="flex  w-3/6 justify-between  border-b-[2px] py-3">
              <p>{comment.text}</p>
              <button
                className="bg-red-400 border border-black rounded-lg p-1"
                onClick={() => handleDeleteComment(comment.$id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>No comment yet!</h1>
      )}
      <form
        onSubmit={handleCommentSubmit}
        className="flex flex-col items-start gap-y-5"
      >
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-3/6 border border-gray-400 p-3 outline-none rounded-md mt-3"
        ></textarea>
        <button
          type="submit"
          className="bg-text-purple/20  font-normal px-3 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
