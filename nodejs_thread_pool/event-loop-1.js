const fs = require("fs")

const a = 100

setImmediate(() => console.log("setImmediate"))

fs.readFile("./file.txt", "utf8", () => {
    console.log("file reading CB")
})

setTimeout(() => console.log("Timer expired"), 0)

function printA () {
    console.log("a =",a)
}

printA()
console.log("last line of the file")

// output: 
// a = 100
// last line of the file
// Timer expired
// setTImmediate
// file reading CB 

// or if file reading is completed fast
// a = 100
// last line of the file
// Timer expired
// file reading CB
// setImmediate

// The key confusion: fs.readFile vs setImmediate

// fs.readFile is asynchronous I/O, so its callback is queued in the poll phase.
// setImmediate runs in the check phase, which happens after the poll phase.
// But here’s the twist 👇
// If the I/O (file reading) finishes very fast, then when Node reaches the poll phase:
// There are pending I/O callbacks (like fs.readFile’s callback),
// So the event loop executes them immediately before moving to the check phase,
// → meaning the file reading callback can appear before setImmediate.
// However, if the poll phase becomes idle (no more I/O to handle), Node jumps to the check phase right away, executing setImmediate first — then later executes the file I/O callback.

// In simple words:

// fs.readFile may complete before setImmediate if the file I/O finishes quickly and the poll phase still has work to do.
// But if Node moves on to the check phase first, setImmediate runs before the I/O callback.

// That’s why the order between file reading CB and setImmediate is not guaranteed — it depends on system speed and event loop timing.
// Note:
// fs.readFile is asynchronous and will execute its callback during the poll phase, but only after the file read is complete.
// If the file reading finishes before timers and check phases start, then when event loop reaches the poll phase, the callback is ready immediately.