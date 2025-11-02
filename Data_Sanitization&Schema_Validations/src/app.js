const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const data  = req.body
  console.log(req.body);

  // // Creating a new instance of the user model
  const user = new User(req.body);

  try {
    const allowed_details = ["firstName", "lastName", "emailId","password"]
    const isDetailsAllowed = Object.keys(data).every((k) => allowed_details.includes(k))
    if(!isDetailsAllowed){
      throw new Error("Cannot add user")
    }
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error adding the user:" + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  const userId = req.body._id

  try { 
    const user = await User.findOne({emailId: userEmail})
    // const user = await User.findById({_id: userId})
    if(!user) {
      res.status(404).send("User not found");
    }else {
      res.send(user)
    }
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else { 
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - Get/feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.error(err)
    res.status(400).send("Something went wrong");
  }
});

// delete a user from the database
app.delete("/user", async (req,res) => {
  const userId = req.body.userId
  try {
    // const user = await User.findByIdAndDelete({_id:userId})
    const user= await User.findByIdAndDelete(userId)    // shortcut 
    res.send("User deleted successfully")
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})

// update data for the user
app.patch("/user/:userId", async(req,res) => {
  const userId = req.params?.userId
  const data = req.body
  try {
    const allowed_update = ["photoUrl", "skills", "about","gender","age"]
    const isUpdateAllowed = Object.keys(data).every((k) => allowed_update.includes(k))
    if(!isUpdateAllowed){
      throw new Error("Update is not allowed")
    }
    if(data?.skills.length > 10){
      throw new Error("Skills cannot be more than 10")
    }
    // const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after"})
    const user = await User.findByIdAndUpdate(userId , data, {returnDocument: "after", runValidators: true})
    console.log(user)
    res.send("User updated successfully")
  } catch (err) {
    res.status(400).send("Update failed:"+ err.message)
  }
})

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server  is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });

// Note: Order of writing the routes matter a lot
