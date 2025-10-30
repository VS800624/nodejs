| Component             | Description                                  |
| --------------------- | -------------------------------------------- |
| **Memory Heap**       | Stores objects, variables, and functions     |
| **Call Stack**        | Tracks function calls (execution order)      |
| **Garbage Collector** | Cleans up unused memory automatically        |
| **V8 Engine**         | Executes JS by converting it to machine code |



In Node.js, the top-level code is not executed in the global scope like in the browser. Instead, it's wrapped inside a module system.

Every file in Node.js is treated as a module, and Node wraps your code in a function like this:

(function(exports, require, module, __filename, __dirname) {
   // your code here
})();


So, at the top level of a Node.js file, this refers to module.exports, not the global object.

🔍 Example 1: Top-level code
console.log(this);


Output:

{}   // (empty object == module.exports)


This means:

this === module.exports

this !== global

🔍 Example 2: Inside a normal function
function test() {
  console.log(this);
}
test();


Output:

global   // In non-strict mode


In functions, if not in strict mode, this refers to the global object.

🔍 Example 3: Inside an arrow function
const test = () => {
  console.log(this);
}
test();


Output:

{}  // same as top-level this (arrow functions don’t have their own `this`)


Arrow functions take this from the surrounding lexical scope, which at the top level is the module object.

🌍 Browser vs Node.js
Context	Top-level this
Browser	window (global object)
Node.js	module.exports (not global)
🧠 Conclusion

console.log(this) at the top level in Node does not log the global object because Node runs your file inside a module wrapper function. Therefore, this refers to the current module, not the global scope.

If you want to access the global object in Node, use:

console.log(global);