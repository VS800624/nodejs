console.log("very important code")
var x = 100


// all the code of the module is wrapped inside a function and this function is IIFE function (Immediately Invoked Function Expression)

//( function (module, require) {
// require("./path")
//     // all the code of the module is run inside this function
//     function calculateSum (a,b){
//     const sum = a + b
//     console.log(sum)
// }
// module.exports = {calculateMultiply}
// })(module)


// (function (exports, require, module, __filename, __dirname) { 
//     // all the code of your module
//   })


console.log(__filename)
console.log(__dirname)