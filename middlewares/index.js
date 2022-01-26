const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  console.log("helllo");
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(234).json({ error: "Authorization required" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(234).json({ error: "You are not admin" });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "fresher") {
    return res.status(400).json({ error: "You are not user" });
  }
  next();
};
