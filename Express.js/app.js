// Importing packages
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

// Importing local files
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const contactRouter = require('./routes/contactus');

// Controllers
const error = require('./controllers/error');

// Setting portNumber to 4000 for localhost
const portNumber = 4000;

// Initialization an express application.
const app = express();

// to parse the urlencoded data from the request body and extended: false for converting the parse data into key-value pair.
app.use(bodyParser.urlencoded({extended: false}));

// For allowing the static files to be used to show to users like css, js or images etc.
app.use(express.static(path.join(__dirname, 'public')));

// Making a default route before the actual route like '/admin/...' and so on.
app.use("/admin", adminRouter);
app.use("/shop", shopRouter);
app.use("/", contactRouter);

// For 404 status code
app.use(error.pageNotFound);

// Creates server and set the port number which is described in the argument at desired location
app.listen(portNumber, 'localhost', () => 
    console.log(`Server stater at http://localhost:${portNumber}`));

// Refer to practice.js for basics