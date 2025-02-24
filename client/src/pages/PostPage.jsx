// src/pages/PostPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { MdDelete } from "react-icons/md";

const PostPage = () => {
  const { postId } = useParams(); // Post ID from the URL
  const [post, setPost] = useState(null);
  const [postError, setPostError] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const { user } = useContext(AuthContext);
  const {
    comments,
    fetchComments,
    addComment,
    deleteComment,
    loadingComments,
    error: commentError,
  } = useContext(CommentContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/posts/${postId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const data = await response.json();
        console.log(data);
        setPost(data.data);
        setPostLoading(false);
      } catch (err) {
        setPostError(err.message);
        setPostLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to comment.");
      return;
    }
    if (!commentText.trim()) {
      return;
    }
    try {
      await addComment(postId, commentText);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId, commentAuthorId) => {
    if (!user) {
      alert("Please log in to delete a comment.");
      return;
    }
    if (user._id !== commentAuthorId) {
      alert("You can only delete your own comments.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await deleteComment(commentId);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (postLoading) return <p>Loading post...</p>;
  if (postError) return <p className="text-red-500">{postError}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 shadow-s max-w-4xl mx-auto">
        <div className="flex">
          <div className="flex-col">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {` by ${post?.author.fullName || "Unknown Author"}`} <br />
              <span className="bg-gray-600 p-1 m-2 text-white">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </p>
            <img
              src={
                "https://banner2.cleanpng.com/20180603/jx/avomq8xby.webp" ||
                post.user?.profilePic
              }
              alt={post.user?.fullName || "Author"}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <img
            src={`https://picsum.photos/seed/${post._id}/600/300`}
            alt="Blog"
            className="w-full h-60 object-cover rounded mb-4"
          />
        </div>
        <p className="text-gray-700 mb-6">{post.content}</p>
      </div>

      <div className="bg-gray-900 p-4 shadow-s max-w-4xl mx-auto mt-6">
        <h2 className="text-xl text-white font-semibold mb-4">Comments</h2>

        <div className="flex gap-2">
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : commentError ? (
            <p className="text-red-500">{commentError}</p>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-3 border border-gray-600 rounded-s flex items-start gap-3"
                >
                  <img
                    src={
                      "https://banner2.cleanpng.com/20180603/jx/avomq8xby.webp" ||
                      comment.user?.profilePic
                    }
                    alt={comment.user?.fullName || "User"}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{comment.text}</p>
                    <p className="text-xs text-gray-400">
                      By {comment.user?.fullName || "Unknown"} on{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    {user && user._id === comment.user?._id && (
                      <button
                        onClick={() =>
                          handleDeleteComment(comment._id, comment.user._id)
                        }
                        className="text-red-500 text-sm mt-2 flex items-center"
                        title="Delete Comment"
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No comments yet.</p>
          )}
          <div>
            {user && (
              <form onSubmit={handleAddComment} className="mb-6">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-2 text-white"
                  rows="3"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Post Comment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
