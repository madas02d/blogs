import React, { createContext, useState, useEffect } from "react";

// create the Context

export const PostsContext = createContext();

// Provider component

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isNewPostCreated, setIsNewPostCreated] = useState(false);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Adjust the URL if your backend runs on a different Port
      const response = await fetch("http://localhost:8000/posts", {
        credentials: "include", // the backend  requires cookies
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.data); // "data.data" based on the postsController's JSON structure
    } catch (err) {
      console.error("Fetching posts failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a Post
  const createPost = async (postData) => {
    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookies
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();

      // The new post data is in data.data (based on createPost controller)
      // Add it to the local state, so the dashboard can reflect immediately
      setPosts((prev) => [...prev, data.data]);
      setIsNewPostCreated(!isNewPostCreated);

      return data.data;
    } catch (error) {
      console.error("Error creating post:", err.message);
      throw err;
    }
  };

  // Update a post
  const updatePost = async (PostsProvider, updatedFields) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const data = await response.json();
      const updatedPost = data.data;

      // Update local state with the updated post
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );

      return updatedPost;
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    }
  };

  // Delete a Post (optional)
  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // On success, remove the post from local state
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err;
    }
  };

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [isNewPostCreated]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
