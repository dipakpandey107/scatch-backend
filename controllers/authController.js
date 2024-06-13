const userModel = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken.js");

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) return res.status(401).send("You have already an account, please login");

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).send({ message: "Error generating salt" });
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).send({ message: "Error hashing password" });
        }

        try {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token, { httpOnly: true, secure: true }); // Secure flag should be used in production with HTTPS
          res.status(201).send("User created successfully");
        } catch (createErr) {
          res.status(500).send({ message: "Error creating user", error: createErr.message });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports.userLogin = async function (req, res) {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) return res.status(401).send("Email or password is invalid");

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).send({ message: "Error comparing passwords" });
      }
      if (!result) {
        return res.status(401).send("Email or password is invalid");
      }

      let token = generateToken(user);
      res.cookie("token", token, { httpOnly: true, secure: true }); 
      res.status(200).send("Login successful");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
