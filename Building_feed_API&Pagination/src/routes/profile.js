const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const user = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser)

    // loggedInUser.firstName = req.body.firstName //or
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log(loggedInUser)
    await loggedInUser.save();
    // res.send(`${loggedInUser.firstName}, your profile is updated successfully`)
    // best practice
    res.json({
      message: `${loggedInUser.firstName}, your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
     const user = req.user;
    const {oldPassword, newPassword} = req.body
    // Step 1: Validate old password
    const isPasswordValid = await user.validatePassword(oldPassword);
    if(!isPasswordValid) {
      return res.status(400).json({error: "Old password is incorrect"})
    }

    // Step 2: Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    
    // Step 3: Save new password
    user.password = hashedNewPassword
    await user.save()
    res.send("Password changed successfully")

  } catch (err) {
    res.status(400).send("ERROR:" + err.message)
  }

})

module.exports = profileRouter;
