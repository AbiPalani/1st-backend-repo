const jwt = require("jsonwebtoken");

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
      req.user = jwt.verify(authtoken,process.env.JWT_SECRET);
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
}

module.exports = {
  authentication,
  ignoreFavicon,
  logging
};
