const express = require("express");

const app = express();

// app.use("/router", [rH1, rH2, rH3, rH4, rH5])
// or  app.use("/router", [rH1, rH2], rH3, rH4, rH5)
// rH means route handle

// Get users => middleware chain  => request handler
app.use(
  "/user",
  (req, res, next) => {
    // route handler 1
    // res.send("Handling /route")
    console.log("Handling /route");
    next();   // moves to next middleware
  },
);

app.get(
  "/user",
  (req, res, next) => {
    // route handler 1
    // res.send("response 1")
    console.log("Handling the route user 1!");
    next();   // moves to next middleware
  },
  (req, res, next) => {
    // route handler 2
    // res.send("2nd response");
    console.log("Handling the route user 2!");
    next()      // moves to next middleware
  },
  (req, res,next) => {
    // route handler 3
    res.send("3nd response");    // request handler
    console.log("Handling the route user 3!");
  }
);

app.listen(3000, () => {
  console.log("Server  is successfully listening on port 3000...");
});

// Note: Order of writing the routes matter a lot
