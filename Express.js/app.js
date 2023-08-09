// Importing packages
const bodyParser = require('body-parser');
const express = require('express');

// Setting portNumber to 4000 for localhost
const portNumber = 4000;

// Initialization an express application.
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use("/add-product", (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="number" name="size"><button type="submit">Submit</button></form>')
})

app.post("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
})

app.use("/", (req, res, next) => {
    res.send("<h1>Hello from Express JS</h1>");
})

// Creates server and set the port number which is described in the argument at desired location
app.listen(portNumber, 'localhost', () => 
    console.log(`Server stater at http://localhost:${portNumber}`));

// Refer to practice.js for basics