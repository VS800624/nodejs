const express = require("express")
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const validator = require("validator");
const User = require("../models/user");

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);

  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT()
      // console.log(token);

      // Add the token to cookie and send the response back to the user
      // res.cookie("token", token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        httpOnly: true,
      });
      res.send("Logged in successfully!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req,res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  })
  res.send("Logout successfully")
})


module.exports = authRouter