// const fs = require("node:fs") // or
const fs = require("fs")
const https = require("https")

console.log("hello world")

var a = 1023
var b = 2098

// sync function
// fs.readFileSync("./file.txt", "utf8")  // if it take 100 ms until this executes the js engine will not go to the next line as it is a sync function and it will block the main thread


// async function
https.get("https://dummyjson.com/produsts/1", (res) => {
    console.log("Fetched Data Successfully")
})

// async function
setTimeout(() => {
    console.log("setTimeout called after 5 seconds")
}, 5000)

// async function
fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log("File data : ", data)
})

// sync function
// fs.readFileSync("./file.txt", "utf8")

// sync function
function multiplyFn (x,y){
    const result = a * b
    return result
}

var c = multiplyFn(a,b)
console.log("Multiplication result is : ", c) 


// Console Output:
// hello world 
// Multiplication result is :  2146254
// File data :  This is the file
// Fetched Data Successfully
// setTimeout called after 5 seconds