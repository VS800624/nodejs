const express = require("express")

const app = express()  

app.use("/user", (req, res, next) => {
    // route handler 1
    res.send("response 1")
    next()
    console.log("Handling the route user 1!")
}, (req, res) => {
    // route handler 2
    res.send("2nd response")
    console.log("Handling the route user 2!")
})
app.listen(3000, () => {
    console.log("Server  is successfully listening on port 3000...")
})

// Note: Order of writing the routes matter a lot 