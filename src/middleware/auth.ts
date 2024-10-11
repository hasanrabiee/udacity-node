import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Define the interface for request that includes user info
interface AuthenticatedRequest extends Request {
  user?: string | object; // Optional user object attached to the request
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get token from Authorization header
  const token = req.headers["authorization"];

  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Remove 'Bearer ' if it exists from the token string
    const tokenWithoutBearer = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    // Verify the token with the secret key
    const decoded = jwt.verify(
      tokenWithoutBearer,
      process.env.TOKEN_SECRET as string
    );

    // Attach user info to the request object
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
