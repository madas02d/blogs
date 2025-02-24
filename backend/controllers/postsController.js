import Post from "../models/PostsModel.js";

//Getting all the posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "fullName profilePic");

    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

//Creating a post
export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

//To retrieve a specific post
export const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("author");

    if (!postId) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: post,

      isAuthenticated: true,
    });
  } catch (error) {
    next(error);
  }
};

// Updating the post
export const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized: You can only edit your own posts",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Update success",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a single post (by authors only)
export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized: You can only delete your own posts",
      });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
