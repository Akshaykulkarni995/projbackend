const { Router } = require("express");
var express = require("express");
// const { sign } = require("jsonwebtoken");
var router = express.Router();
//get auth from controller
const {signout,signup} = require("../controllers/auth");

 
router.post("/signup", [
    check("")
],
signup);
router.get("/signout", signout);  


module.exports = router;