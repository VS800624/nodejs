const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async(req, res) => {
    try {
      const fromUserId = req.user._id // the logged in user sending the connection request  
      const toUserId = req.params.toUserId
      const status = req.params.status

      const allowedStatus = ["interested","ignored"]
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid status type: " + status})
      }

      const toUser = await User.findById(toUserId)
      if(!toUser) {
        return res.status(400).json({message: "User not found!"})
      }

      // If there is an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          // The request was sent by the current user → another user Example: A → B
          // {fromUserId: fromUserId, toUserId: toUserId}, //or
          {fromUserId, toUserId},
          // The other user already sent a request to the current user Example: B → A
          {fromUserId: toUserId, toUserId: fromUserId}
        ]
      })

      if(existingConnectionRequest){
        return res.status(400).json({message: "Connection Request already exist"})
      }

      // new instance of ConnectionRequest model
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      })
      const data = await connectionRequest.save()
      res.json({
        message: (status === "interested"? req.user.firstName + " is " + status + " in " + toUser.firstName: req.user.firstName + " has " + status  + " " + toUser.firstName),
        // data: data //or 
        data
      })
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

module.exports = requestRouter;
