const jwt = require("jsonwebtoken");
const JWT_SECRET = "diary21232@123";

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}

function authentication(req, res, next) {
  const token = req.headers["auth-token"];
  if(token){
    try{
      req.user = jwt.verify(token,JWT_SECRET);
      next();
    }catch(err){
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(401);
  }
}

module.exports = {
  authentication,
  ignoreFavicon
};
