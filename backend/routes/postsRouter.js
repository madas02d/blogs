import express from "express";
import { getAllPosts, createPost, getPost, updatePost, deletePost } from "../controllers/postsController.js";
import { checkToken } from "../middleware/checkToken.js"

const router = express.Router()

router.get("/", getAllPosts)
router.post("/", createPost)
router.get("/:postId", getPost)
router.put("/:postId", checkToken, updatePost)
router.delete("/:postId", checkToken, deletePost)

export default router;