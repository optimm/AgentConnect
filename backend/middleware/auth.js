const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../db/models/User");

const authMiddleware = async (req, res, next) => {
  if (!req.cookies) {
    throw new UnauthenticatedError("Cookie not present, Please log in");
  }
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Token not present, Please log in");
  }
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthenticatedError("Invalid token");
  }
  const isAgent = user.role === "agent";
  req.user = { userId, isAgent };

  console.log("going away .....");
  next();
};

module.exports = { authMiddleware };
