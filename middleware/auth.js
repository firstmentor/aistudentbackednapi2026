const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, "hghdfsjfhjdsfiuekj");
    // console.log(decoded)
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
