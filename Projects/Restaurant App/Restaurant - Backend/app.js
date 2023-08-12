// Requiring all the packages for the application
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const orderRoutes = require("./routes/order");
const sequelize = require("./util/database");

const app = express();

// For allowing cross connection between front-end and back-end
app.use(cors());
// For parsing the data from back-ebd to front-end in the form of json
app.use(bodyParser.json({ extended: false }));

// routes for particular thing
app.use(orderRoutes);

// Converting the model we created to a table in database
sequelize
  .sync()
  .then(() => {
    console.log("Created");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
