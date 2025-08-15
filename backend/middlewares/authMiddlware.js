const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.json({
      error: true,
      message: "token does not exists",
    });
  }
  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      error: true,
      message: "token does not exists",
    });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: true, message: "unauthorized user" });
    }
    req.user = decoded;
  });

  next();
}

module.exports = authenticateToken;
