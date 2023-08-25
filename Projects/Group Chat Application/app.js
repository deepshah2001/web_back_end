const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");

const User = require('./models/user');
const Message = require('./models/message');

const UserRoutes = require("./routes/user");
const MessageRoutes = require("./routes/message");

const app = express();

app.use(bodyParser.json({ extended: false }));  // For passing json as response to frontend
app.use(cors()); // For allowing Cross connection

app.use("/user", UserRoutes);
app.use("/message", MessageRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello there!");
});

// User to Message relationship is one to many
User.hasMany(Message);
Message.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
