const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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

    // console.log(connectionRequest)
    
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

userRouter.get("/feed", userAuth, async(req,res) => {
  try {
    // User should  see all the user cards except:
    // 1) His own card
    // 2) His connections
    // 3) Ignored people 
    // 4) Already sent the connection request (i.e. interested)
    const loggedInUser = req.user

   const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = limit>50 ? 50 : limit
    let skip = (page-1)*limit

    // Find all the connection requests (sent + received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
    }).select("fromUserId toUserId")

    const hideUserFromFeed = new Set()
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString())
      hideUserFromFeed.add(req.toUserId.toString())
    })

    // console.log(hideUserFromFeed)

    const users = await User.find({
      $and: [
        {_id: {$nin: Array.from(hideUserFromFeed)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    
    res.send(users) 
    
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

module.exports = userRouter;


// Select → choose which fields to include/exclude
// Populate → replace ObjectId with full document