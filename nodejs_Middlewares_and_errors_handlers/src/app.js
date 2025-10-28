const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// app.use("/router", [rH1, rH2, rH3, rH4, rH5])
// or  app.use("/router", [rH1, rH2], rH3, rH4, rH5)
// rH means route handler


// handle auth middleware  for all get, post , , ...  etc requests
app.use("/admin",adminAuth )

app.post("/user", (req,res) => {
  res.send("User logged in successfully")
})

app.get("/user", userAuth , (req,res) => {
  res.send("User Data Sent")
})

app.get("/admin/getAllData", (req,res) => {
  // logic of fetching all data
  res.send("All data sent")
})

app.get("/admin/deleteUser", (req,res) => {
  // login for deleting a user
  res.send("Deleted a User")
})

app.listen(3000, () => {
  console.log("Server  is successfully listening on port 3000...");
});

// Note: Order of writing the routes matter a lot
