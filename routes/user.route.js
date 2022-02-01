const user_route = require("express").Router();
const userService= require("../services/user.services");

user_route.post("/register",userService.register);
user_route.post("/login",userService.login);
user_route.get("/profile",userService.profile);


module.exports = user_route;
