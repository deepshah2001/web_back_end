// Importing packages
const bodyParser = require('body-parser');
const express = require('express');

// Importing local files
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

// Setting portNumber to 4000 for localhost
const portNumber = 4000;

// Initialization an express application.
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// Making a default route before the actual route like '/admin/...' and so on.
app.use("/admin", adminRouter);
app.use("/shop", shopRouter);

// For 404 status code
app.use((req, res, next) => {
    res.status(404).send("<h1>404 Page Not Found!</h1>");
})

// Creates server and set the port number which is described in the argument at desired location
app.listen(portNumber, 'localhost', () => 
    console.log(`Server stater at http://localhost:${portNumber}`));

// Refer to practice.js for basics