import React, { useContext } from "react";
import PostCard from "../components/PostCard.jsx";
import { PostsContext } from "../context/PostsContext";

const Dashboard = () => {
  // 1) Get the posts and relevant states from context
  const { posts, loading, error } = useContext(PostsContext);

  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState("All");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Unique tags/categories
  const tags = [
    "All",
    ...new Set(posts.flatMap((post) => post.tags).filter(Boolean)),
  ];
  const categories = [
    "All",
    ...new Set(posts.map((p) => p.categories).filter(Boolean)),
  ];

  // Filter logic
  React.useEffect(() => {
    let filtered = [...posts];


    if (selectedTag !== "All") {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (post) => post.categories === selectedCategory
      );
    }

    setFilteredPosts(filtered);
  }, [selectedTag, selectedCategory, posts]);

  // Check for loading or error
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Render filteredPosts
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex mx-22">
      {/* Blog Post Section */}
      <div className="flex-1 space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      {/* Sidebar for Filters */}
      <aside className="w-64 bg-white p-4 shadow-lg rounded-lg ml-6">
        <h2 className="text-xl font-semibold mb-4">Filter by</h2>

        {/* Tags Section */}
        <h3 className="text-lg font-medium mb-2">Tags</h3>
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className={`cursor-pointer px-3 py-1 rounded-lg ${
                selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Categories Section */}
        <h3 className="text-lg font-medium mt-4 mb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer px-3 py-1 rounded-lg ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
