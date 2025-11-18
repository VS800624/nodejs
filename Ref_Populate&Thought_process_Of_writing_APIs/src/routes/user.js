const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested" 
    }).populate("fromUserId", USER_SAFE_DATA); //or
    // }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "skills"]);

    res.json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Get all the connections of the logged in user
// This code:
// Finds all accepted connections related to you
// Populates both users' profile details
// Figures out who is the other user in each connection
// Returns a clean list of your connections
userRouter.get("/user/connections", userAuth, async(req,res) => {
  try {

    const loggedInUser = req.user

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {toUserId: loggedInUser._id, status: "accepted"},
        {fromUserId: loggedInUser._id, status: "accepted"}
      ]
    }).populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA)

    console.log(connectionRequest)
    
    const data = connectionRequest.map((row) => {
      // Check if the logged-in user is fromUserId
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId      // return the other user
      }
      return row.fromUserId     // return the other user

    })
    
    res.json({data})  
    
  } catch (err) {
    res.status(400).send({message: err.message})
  }
})

module.exports = userRouter;
