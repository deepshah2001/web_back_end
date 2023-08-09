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