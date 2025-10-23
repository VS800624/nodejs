const express = require("express")

const app = express()  //We are creating a new express js application
// this is basically like creating a new web server on to using express framework we will have to call listen over here and we have to listen some port so that anybody can connect to us.

// for handling incoming  request we write:
app.use("/",(req, res) => {
    res.send("Namaste from the dashboard!")
})


app.use("/test",(req, res) => {
    res.send("Hello from the test!")
})

app.use("/hello", (req,res) => {
    res.send("Hello World!")
})

// this function here is known as request handler 

app.listen(3000, () => {
    console.log("Server  is successfully listening on port 3000...")
})
// we have created a web server on the port 3000 and my app is listening on that server 
// when we call this listen method , we have to pass port to listen(port) what port you want your application to be running on

