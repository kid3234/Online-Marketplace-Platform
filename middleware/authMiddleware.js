const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
console.log("here 1");
  try {
    console.log("here 2");

    const decode = jwt.verify(token,process.env.JWT_SECRET);
    console.log("deode::::!",decode);
    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (error) {
    console.log("here 3");
    console.error("Error authenticating token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.role)) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};
