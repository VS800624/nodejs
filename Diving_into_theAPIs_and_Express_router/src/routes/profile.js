const express = require("express");
const { userAuth } = require("../middlewares/auth");
const authRouter = require("./auth");

const profileRouter = express.Router()

authRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter