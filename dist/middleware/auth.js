"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(tokenWithoutBearer, process.env.TOKEN_SECRET);
        // Attach user info to the request object
        req.user = decoded;
        // Proceed to the next middleware/route handler
        next();
    }
    catch (err) {
        res.status(400).json({ message: "Invalid token." });
    }
};
exports.default = authMiddleware;
