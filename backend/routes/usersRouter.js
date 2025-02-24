import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/usersController.js";
import { checkToken } from "../middleware/checkToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/", checkToken, getProfile);
router.put("/:id", checkToken, updateProfile);

export default router;
