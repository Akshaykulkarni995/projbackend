const User = require("../models/user");


exports.signup = (req,res ) => {
    // console.log("REQUEST BODY", req.body);
    // res.json({
    //     message : "Signup Works!"
    // })
};

exports.signout = (req,res) => {
    res.json({
        message : " User Signout"
    });
    };