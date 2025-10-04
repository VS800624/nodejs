// require("./xyz.js")  // one module to another
// require("./sum.js")   // modules protected  their variables and functions from leaking
// you cannot access variables and functions of sum.js in app.js
// const calculateSum = require("./sum.js")   // you have to write it like this if you want to access calculateSum
// const obj = require("./sum.js")   // getting multiple things that are exported from sum.js
// const {x,calculateSum} = require("./sum.js")  //destructuring it and you can directly access it
import { calculateSum } from "./sum.js";
var name = "Namaste NodeJS"
var a = 10;
var  b = 20
 console.log(name)
console.log(calculateSum(a,b))  
// console.log(obj.calculateSum(a,b))

//  console.log(global)
//  console.log(this)  //empty object
//  console.log(globalThis)
 console.log(global === globalThis)