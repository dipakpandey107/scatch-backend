const express = require("express");
const router = express.Router();
const {registerUser , userLogin} = require("../controllers/authController.js");


// Define your routes here
router.get("/", (req, res) => {
  res.send("Hey, it's a User Routes");
});

router.post("/register", registerUser);

router.post("/login",userLogin);

module.exports = router;
