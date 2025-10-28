const express = require("express");

// const auth = require("./middlewares/auth");
// const adminAuth = auth.adminAuth;
// const userAuth = auth.userAuth;
// destructuring
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// app.use("/router", [rH1, rH2, rH3, rH4, rH5])
// or  app.use("/router", [rH1, rH2], rH3, rH4, rH5)
// rH means route handler


// handle auth middleware  for all get, post , , ...  etc requests
// app.use("/admin", authAdmin)

// app.get("/user/login", authUser, (req,res,next) => {
//   res.send("User logged in successfully")
// }) 

// app.post("/user/login", (req,res) => {
//   res.send("User logged in successfully")
// })

// app.get("/admin/getAllData", (req,res) => {
//   // logic of fetching all data
//   res.send("All Data sent ")
// })

// app.get("/admin/deleteUser", (req,res) => {
//   // logic for deleting a user
//   res.send("Deleted a user")
// })

app.use("/", (err,req,res,next) => {
  if(err) {
    // log your error 
    res.status(500).send("something went wrong")
  }
})

app.get("/user",  (req,res) => {
  try {
    // logic of DB call and get user data 
    throw new error("some random error")
    res.send("User logged in successfully")
  } catch (err) {
    res.status(500).send("some error occurred please contact support team")
  }
}) 

app.use("/", (err,req,res,next) => {
  if(err) {
    // log your error 
    res.status(500).send("something went wrong")
  }
})

app.listen(3000, () => {
  console.log("Server  is successfully listening on port 3000...");
});

// Note: Order of writing the routes matter a lot
