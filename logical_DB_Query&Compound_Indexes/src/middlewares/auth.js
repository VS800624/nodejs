const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
  try {
    //   const cookies = req.cookies
    //   const {token} = cookies // or
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!!!")
    }
      // validate the token (secret key) and decode and return the payload (the data (_id) you originally stored in the token)
    const decodedMessage = await jwt.verify(token, "DEV@TINDER$619")
    const {_id} = decodedMessage

    const user = await User.findById(_id)
    if (!user){
      throw new Error("User not found")
    }
    req.user = user
    next()
    
  } catch (err) {
    res.status(400).send("ERROR:" + err.message)
  }
};

module.exports = {
  userAuth,
};
