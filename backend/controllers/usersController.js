import createError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

//Register
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, profilePic } = req.body;

    if (!password) {
      throw createError(400, "Password is required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    res.status(201).json({
      success: true,
      message: "User created, yay!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(404, "Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError(401, "Incorrect email or password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30min",
    });
    res.cookie("jwtToken", token, { maxAge: 30 * 60 * 1000, httpOnly: true });

    res.status(200).json({
      success: true,
      message: "Login successfull",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//Logut
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwtToken", { httpOnly: true });

    res.status(200).json({
      success: true,
      status: 200,
      data: "User logged out",
    });
  } catch (error) {
    next(error);
  }
};

//getProfile
export const getProfile = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
      isAuthenticated: true,
    });
  } catch (error) {
    next({ status: 401, message: error.message });
  }
};

//updateProfile
export const updateProfile = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { id } = req.params;

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      message: "Update success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
