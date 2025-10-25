const express = require("express")

const app = express()  //We are creating a new express js application
// this is basically like creating a new web server on to using express framework we will have to call listen over here and we have to listen some port so that anybody can connect to us.

// for handling incoming  request we write:

// this will only handle GET call to "/user"

// app.use("/user",(req, res) => {
//     res.send("Haha!")
// })

app.get("/user", (req,res) => {
    res.send({firstName: "Vishal", lastName: "Singh"})
})

app.post("/user", (req,res) => {
//    saving data to db
   res.send("Data successfully saved to the database")
})

app.delete("/user", (req,res) => {

   res.send("Data deleted successfully")
})

// this will match all the HTTP method API  calls to "/test"
app.use("/test",(req, res) => {
    res.send("Hello from the test!")
})

app.use("/hello", (req,res) => {
    res.send("Hello World!")
})


app.use("/",(req, res) => {
    res.send("Namaste from the dashboard!")
})

// this function here is known as request handler 

app.listen(3000, () => {
    console.log("Server  is successfully listening on port 3000...")
})
// we have created a web server on the port 3000 and my app is listening on that server 
// when we call this listen method , we have to pass port to listen(port) what port you want your application to be running on

// Note: Order of writing the routes matter a lot