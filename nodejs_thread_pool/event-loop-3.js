const fs = require("fs")

const a = 100

setImmediate(() => console.log("setImmediate"))

setTimeout(() => console.log("Timer expired"), 0)

Promise.resolve("Promise").then(console.log)

fs.readFile("./file.txt", "utf8", () => {
    setTimeout(() => console.log("2nd timer"))

    process.nextTick(() => console.log("2nd nextTick"))

    setImmediate(() => console.log("2nd setImmediate"))

    console.log("file reading CB")
})

process.nextTick(() => console.log("process.nextTick"))

function printA () {
    console.log("a =",a)
}

printA()
console.log("last line of the file")

// output:
// a = 100
// last line of the file
// process.nextTick
// Promise
// Timer expired
// setImmediate
// file reading CB
// 2nd nextTick
// 2nd setImmediate
// 2nd timer

// or if file reading is completed fast
// a = 100
// last line of the file
// process.nextTick
// Promise
// Timer expired
// file reading CB
// 2nd nextTick
// setImmediate
// 2nd setImmediate
// 2nd timer