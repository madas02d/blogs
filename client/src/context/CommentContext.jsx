import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);

  // Fetch comments for a given post
  const fetchComments = async (postId) => {
    setLoadingComments(true);
    try {
      const response = await fetch(`http://localhost:8000/comments/${postId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      console.log("Comments API response:", data);
      // Since your API returns { success: true, data: comments }
      setComments(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingComments(false);
    }
  };

  // Add a new comment for a given post

  const addComment = async (postId, text) => {
    try {
      const token = user?.token || localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const result = await response.json();
      let newComment = result.data; // new comment from the backend

      // merge in the current user's details.
      if (!newComment.user || Object.keys(newComment.user).length === 0) {
        newComment = {
          ...newComment,
          user: {
            _id: user.id,
            fullname: user.fullname || user.fullName || "unknown",
            profilePic: user.profilePic,
          },
          // Ensure createdAt is a valid date if missing.
          createdAt: newComment.createdAt || new Date().toISOString(),
        };
      }

      // Prepend the new comment (newest first)
      setComments((prevComments) => [newComment, ...prevComments]);
      return newComment;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a comment by its ID
  const deleteComment = async (commentId) => {
    try {
      const token = user?.token || localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      // Update local state by filtering out the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loadingComments,
        error,
        fetchComments,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
