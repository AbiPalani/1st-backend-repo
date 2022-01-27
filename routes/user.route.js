const user_route = require("express").Router();
const userService= require("../services/user.services");

user_route.get('/',function (req, res, next) {
    res.status(200).send("Welcome users");
    next();
  })
user_route.post("/register",userService.register);
user_route.post("/login",userService.login);


module.exports = user_route;

