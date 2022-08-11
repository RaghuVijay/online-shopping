const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
  let token = req.query.token || req.headers.token;
  if (!token)
    res.status(403).json({
      status: "403 Forbidden",
      message: "Invalid User",
    });
  let value = jwt.verify(token, process.env.JWT_KEY);
  req.user = value;
  next();
};
