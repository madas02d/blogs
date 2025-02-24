import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import createError from "http-errors";

// Middleware function to check the validity of the JWT token
export const checkToken = async (req, res, next) => {
  try {
    const jwtToken =
      req.cookies?.jwtToken || req.headers.authorization?.split(" ")[1];
    if (!jwtToken) {
      return next(createError(401, "Unauthorized request: No token provided"));
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return next(createError(401, "Invalid token: No user ID found"));
    }

    // Find the user by the ID contained in the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(createError(401, "User no longer exists"));
    }

    // Attach the user information to the request object
    req.user = { id: user._id.toString(), email: user.email };

    // Refresh the token by setting it again in the cookies with updated options
    res.cookie("jwtToken", jwtToken, {

      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour

  
    });

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Token verification error:", error.message);
    if (error.name === "JsonWebTokenError") {
      next(createError(401, "Invalid Token"));
    } else if (error.name === "TokenExpiredError") {
      next(createError(401, "Token Expired"));
    } else {
      next(createError(500, "Internal Server Error"));
    }
  }
};
