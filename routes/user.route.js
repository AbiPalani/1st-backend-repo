const services =  require("../services/user.services");
const router = require("express").Router();

// ROUTES
router.post("/register", services.register);
router.post("/login", services.login);

module.exports = router;
