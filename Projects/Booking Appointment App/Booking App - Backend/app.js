const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

// Sequelize for ORM to manage database and node.js relation
const sequelize = require("./util/database");

const app = express();

// For allowing for cross connection
app.use(cors());

const userRoutes = require("./routes/user");

// Passing json to the front-end for handling and display or showing the data
app.use(bodyParser.json({ extended: false }));

// Handling all the routes of the booking appointment app
app.use(userRoutes);

// Creates table for the model we defined
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
