// Importing or requiring all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");

const User = require("./models/signup");
const Expenses = require("./models/expense");
const Order = require('./models/order');

const signUpRoutes = require("./routes/signup");
const expenseRoutes = require("./routes/expense");
const paymentRoutes = require("./routes/payment");

const app = express();

// For allowing cross connection between frontend and backend of our application
app.use(cors());
// For parsing the data to frontend in json format
app.use(bodyParser.json({ extended: false }));

// For different routes
app.use(signUpRoutes);
app.use(expenseRoutes);
app.use(paymentRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello");
});

// For connecting both tables User to Expenses (One to Many)
User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// For converting our model into table using sequelize and start a server at port 3000
sequelize
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
