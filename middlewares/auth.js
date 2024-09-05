import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const tokenString = req.header("Authorization");

  if (!tokenString) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = tokenString.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token is missing, authorization denied" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
