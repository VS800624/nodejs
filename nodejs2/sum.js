// modules protected  their variables and functions from leaking
// you cannot access variables and functions of sum.js in app.js
console.log("sum module executed")

var x = "hello world"

export function calculateSum (a,b){
    const sum = a + b
    console.log(sum)
}

// module.exports = calculateSum     // you have export it if you want to use it in another module(file)
// module.exports = {   // order way
//     x: x, calculateSum
// }   //exporting multiple things
// new way
//  module.exports = { x, calculateSum} 