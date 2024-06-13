const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model.js");

module.exports = async function(req , res , next){
    // check token 
    if(!req.cookies.token){
        req.flash("error" , "You need to login first");
        return res.redirect("/");
    }

    // is token available so find user 
    try {

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email : decoded.email}).select("-password");
        req.user = user;
        next();
        
    } catch (error) {
        req.flash("error" , "Invalid Something Went Wrong");
        return res.redirect("/");
    }
}