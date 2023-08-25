const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");

const UserRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json({ extended: false }));  // For passing json as response to frontend
app.use(cors()); // For allowing Cross connection

app.use("/user", UserRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello there!");
});

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
