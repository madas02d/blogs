import createError from "http-errors";
import Comment from "../models/commentsModel.js";
import Post from "../models/PostsModel.js";

// Get comments for a specific post
export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const limit = parseInt(req.query.limit) || 10; 

    if(!postId) {
      return res.status(400).json({message: "Post ID is required"})
    }

    const comments = await Comment.find({ post: postId })
      .populate("user","fullName profilePic") //Populate user details
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// Add a new comment (Any authenticated user can comment on any post)
export const addComment = async (req, res, next) => {
  try {
   
    const { text } = req.body;
    const postId = req.params.postId || req.body.post; 
    const userId = req.user.id; 

    if (!postId) {
      return next(createError(400, "Post ID is required"));
    }

    if (!text) {
      return next(createError(400, "Comment text is required"));
    }

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return next(createError(404, "Post not found"));
    }

    const newComment = await Comment.create({ post: postId, user: userId, text });

    res.status(201).json({
      success: true,
      message: "Comment added successfully!",
      data: newComment,
    });

  } catch (error) {
    next(error);
  }
};

// Delete a comment (Only the author can delete)
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id; // Authenticated user ID

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(createError(404, "Comment not found"));
    }

    // Check if the user is the author of the comment
    if (comment.user.toString() !== req.user.id) {
      return next(createError(403, "Unauthorized: You can only delete your own comments"));
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
