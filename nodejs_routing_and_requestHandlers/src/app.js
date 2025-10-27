const express = require("express")

const app = express()  //We are creating a new express js application
// this is basically like creating a new web server on to using express framework we will have to call listen over here and we have to listen some port so that anybody can connect to us.

// for handling incoming  request we write:

// this will only handle GET call to "/user"

// app.use("/user",(req, res) => {
//     res.send("Haha!")
// })

// it will match req /user, /user/xyz, /user/1 , /user/...
// http://localhost:3000/user?userId=101&password=testing  
// we will get userId=101&password=testing with req.query
app.get("/user", (req,res) => {
    console.log(req.query)
    res.send({firstName: "Vishal", lastName: "Singh"})
})

// http://localhost:3000/user/897
// we will get userId with req.params and adding /:userId in /user route
app.get("/user/:userId", (req,res) => {
    console.log(req.params)
    res.send({firstName: "Vishal", lastName: "Singh"})
})

app.get("/user/:userId/:name/:password", (req,res) => {
    console.log(req.params)
    res.send({firstName: "Vishal", lastName: "Singh"})
})

// it will work for /ac as well as /abc due to ? b has become optional
app.get("/ab?c", (req,res) => {
    res.send({firstName: "Vishal", lastName: "Singh"})
})

app.get("/a(bc)?d", (req,res) => {
    res.send({firstName: "Vishal", lastName: "Singh"})
})


// here you can write as many as b you want to in between a and b this route will still work
app.get("/ab+c", (req,res) => {
    res.send({firstName: "Vishal", lastName: "Singh"})
})

// here this  route will work even if you write anything between ab and cd
app.get("/ab*cd", (req,res) => {
    res.send({firstName: "Vishal", lastName: "Singh"})
})

//this regex means if in the path a exist this route will work
app.get("/a/", (req,res) => {
    res.send({firstName: "Vishal", lastName: "Singh"})
})

//this regex means this route will works as long as the fly is at the end
app.get("/.*fly$/", (req,res) => {
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