import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/commentController.js";
import { checkToken } from "../middleware/checkToken.js";

const router = express.Router();
router.get("/:postId", checkToken, getComments);
router.post("/:postId", checkToken, addComment);
router.delete("/:commentId", checkToken, deleteComment);

export default router;
