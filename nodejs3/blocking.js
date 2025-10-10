// const crypto =  require("node:crypto") // or
const crypto =  require("crypto")

console.log("Hello World")

var a = 1023
var b = 2098

// sync function - will block the main thread - don't use it
crypto.pbkdf2Sync("password","salt", 500000, 50, "sha512")
console.log("First Key is generated")

// Password base key deravtive function this is also managed by libuv
// async function 
crypto.pbkdf2("password","salt", 50000, 50, "sha512", (err,key) => {
    console.log("key is generated")
})



function multiplyFn (x,y){
    const result = a * b
    return result
}

var c = multiplyFn(a,b)
console.log("Multiplication result is : ", c) 
