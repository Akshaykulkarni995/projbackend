const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');





exports.signup = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {

        if (err) {
            return res.status(400).json({
                err: "Not able to save user in db"
            })
        }

        res.json({
            name: user.name,
            email: user.email,
            id: user._id,

        })
    });



    // console.log("REQUEST BODY", req.body);
    // res.json({
    //     message : "Signup Works!"
    // })
};


exports.signin = (req, res) => {
    const errors = validationResult(req);

    //destructuting

    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {

        if (err || !user ) {
            res.status(400).json({
                error: "User Email does not exists"
            })
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: " Email and Pass does not maatch"
            })

        }

        //creating token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });
        //send data to frontend

        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });


    });


};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: " User Signout successfully"
    });
};


//protected routes 
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
});  



//custom middleware
exports.isAuthenticated = ( req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id === req.auth

    next();
};

exports.isAdmin = ( req, res, next) => {

    next();
}
