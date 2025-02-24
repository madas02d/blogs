import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="ml-25 bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4 max-w-2xl">
      {/* Author Avatar */}
      <img
        src={
          "https://banner2.cleanpng.com/20180603/jx/avomq8xby.webp" ||
          post.author?.fullName
        }
        alt="Author"
        className="w-12 h-11 rounded-full"
      />

      {/* Post Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-600">
          {post.tags?.length > 0
            ? `Main Topic #${post.tags.join(", ")}`
            : "No tags"}
          {` by ${post.author?.fullName || "Unknown Author"}`}
        </p>

        <h2 className="text-xl font-semibold mt-2 hover:text-blue-800 hover:cursor-pointer" 
          onClick={() => navigate(`/posts/${post._id}`)}
        >{post.title}</h2>
        <p className="text-gray-700 mt-1">{post.content}</p>

     

        {/* Metadata */}
        <div className="flex items-center space-x-5 text-sm text-gray-600 mt-4">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <button className="text-pink-500">
            <CiHeart size={20} />
          </button>
          <button
            className="text-blue-500"
          
          >
            <FaRegComment />
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/3">
        <img
          src={`https://picsum.photos/seed/${post._id}/400/300`}
          alt="Blog"
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default PostCard;
