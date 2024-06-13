const express = require('express');
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();

router.get("/" , function(req,res){
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop" , isLoggedin , function(req, res){
    res.render("shop");
} );

module.exports=router;