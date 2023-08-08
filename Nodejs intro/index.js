// Nodejs is a javascript runtime
// It uses the same engine as that of google chrome i.e. v8 built by google

console.log("Hello, World!");

// File System
const fs = require('fs');       // Importing file system to use its functionality in our javascript file.

fs.writeFileSync('hello.txt', "Hello from Node.js");