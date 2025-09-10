// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    token = token.split(" ")[1]; // remove 'Bearer '

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, phoneNumber }
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
