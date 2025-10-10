console.log("hello world")

var a = 1023
var b = 2098

// this setTimeout will not execute right away because it is a async operation and it goes to libuv and libuv can only get this callback method to be called ones the ones the callstack is empty , ones the callstack has finished executing all the code. 
// First all of JS Engine in the global execution context will execute the full code than only it will execute any callback all these callbacks you see in async functions will only execute ones your global execution context is out of callstack and callstack is empty even when the setTimeout is 0 seconds
// This  callback will only pushed to call stack in JS Engine (V8 engine) once the call stack is empty , it will run only be called once call stack  main thread is empty, after 0 seconds when the call stack is empty
setTimeout(() => {
    console.log("call me right now")
},0)


setTimeout(() => {
    console.log("call me after 3 seconds")
},3000)

function multiplyFn (x,y){
    const result = a * b
    return result
}

var c = multiplyFn(a,b)
console.log("Multiplication result is : ", c) 
