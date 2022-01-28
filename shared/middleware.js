const jwt = require("jsonwebtoken");
const JWT_SECRET = "diary21232@123";

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).send("welcome");
  }
  next();
}

function authentication(req,res,next){
  const authtoken = req.headers[{ "Content-type":"application/json" },{"auth-token":"JWT_SECRET"}];
  if(authtoken){
      try{
      req.user = jwt.verify(authtoken,JWT_SECRET);
      next();
      }catch(err){
       res.sendStatus(401);
      }
  }else{
      res.status(401);
  }
}

function logging(req,res,next){
  console.log(`[${new Date()} - ${req.user.userId} - ${req.url} - ${req.method}]`);
  res.end();
}

module.exports = {
  authentication,
  ignoreFavicon,
  logging
};
