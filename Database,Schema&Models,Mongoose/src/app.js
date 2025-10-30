const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@kohli.com",
    password: "virat@123",
  };

  // Creating a new instance of the user model
  const user = new User(userObj);
  // or
  // const user = new User({
  //     firstName: "Vishal",
  //     lastName: "Singh",
  //     emailId: "vishal@singh.com",
  //     password: "vishal@123"
  //   })

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error adding the user:" + err.message);
  }
});

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
