// Importing express package
const express = require('express');

// Setting portNumber to 4000 for localhost
const portNumber = 4000;

// Initialization an express application.
const app = express();

// For handling requests and responses with the help of concept of middlewares (core of express.js).
// Middlewares are nothing but dividing our code into small functions and pieces to handle all request easily and efficiently.
app.use((req, res, next) => {
    console.log("In First Middleware!");
    next();             // It is used to allow the request to continue to the next middleware in line from top to bottom.
});

app.use((req, res, next) => {
    console.log("In Second Middleware!");
    res.send('<h1>Hello from Express JS</h1>');
});

// Creates server and set the port number which is described in the argument at desired location
app.listen(portNumber, 'localhost', () => 
    console.log(`Server stater at http://localhost:${portNumber}`));