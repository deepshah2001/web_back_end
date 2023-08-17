const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");
const signUpRoutes = require("./routes/signup");

const app = express();

// For allowing cross connection between frontend and backend of our application
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(signUpRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello");
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
