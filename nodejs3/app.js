require("./xyz.js")  // one module to another

//( function (module) {
//     // all the code of the module is run inside this function
// })(module)

const {calculateSum, calculateMultiply} = require("./calculate")  // you do not need to write "./calculate/index" you can just write "./calculate" the index will automatically be taken care of.
const data = require("./data.json")   //this is how to import json

const util = require("node:util")

console.log(JSON.stringify(data))

var name = "Namaste NodeJS"
var a = 10;
var  b = 20
 console.log(name)
console.log(calculateSum(a,b))  
console.log(calculateMultiply(a,b))
// console.log(obj.calculateSum(a,b))

//  console.log(global)
//  console.log(this)  //empty object
//  console.log(globalThis)
 console.log(global === globalThis)