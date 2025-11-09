const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router()

requestRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;

  // sending a connection request
  console.log("Sending a connection request");
  res.send(user.firstName + " sent the connection request!");
});

module.exports = requestRouter