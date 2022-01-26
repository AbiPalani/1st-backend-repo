const jwt = require("jsonwebtoken");
const JWT_SECRET = "diary21232@123";

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}

function authentication(req, res, next) {
  const authHeader = req.headers.token;
  if (!authHeader) return res.status(401).send("You are NOT Authenticated");
  const token = authHeader;
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Token is not Valid");
    req.user = user;
    next();
  });
}

module.exports = {
  authentication,
  ignoreFavicon
};
