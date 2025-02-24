import React, { useState, useContext, use } from "react";
import { PostsContext } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const WritePost = () => {
  const { createPost } = useContext(PostsContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [author, setAuthor] = useState(user.data._id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState("general");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const postData = {
        author,
        title,
        content,
        tags: tags.split(","), // in case user inputs more than one tag | example: "react, javascript"
        categories,
      };

      await createPost(postData);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Post creation failed");
    }
    // Handle post submission here
    console.log({ title, content });
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 ml-6">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <label htmlFor="content" className="block font-semibold mb-1">
            Content
          </label>
          <textarea
            id="content"
            placeholder="Write your post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none "
          />
          <button
            type="button"
            className="absolute top-1 left-[-2.5rem] p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div>
          <label htmlFor="tags" className="block font-semibold mb-1">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="categories" className="block font-semibold mb-1">
            Categories
          </label>
          <select
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="border w-full p-2 mb-4"
          >
            <option value="general">General</option>
            <option value="tech">Tech</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
};
export default WritePost;
