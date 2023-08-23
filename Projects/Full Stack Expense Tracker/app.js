// Importing or requiring all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const sequelize = require("./util/database");

const User = require("./models/signup");
const Expenses = require("./models/expense");
const Order = require('./models/order');
const ResetPassword = require('./models/forgotPasswordRequests');
const FilesDownloaded = require('./models/filesDownloaded');

const signUpRoutes = require("./routes/signup");
const expenseRoutes = require("./routes/expense");
const paymentRoutes = require("./routes/payment");
const premiumRoutes = require('./routes/premium');
const forgotRoutes = require('./routes/forgot');

const streamAccessFile = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: 'a'
})

const app = express();

app.use(helmet());
app.use(morgan('combined', {stream: streamAccessFile}));
// For allowing cross connection between frontend and backend of our application
app.use(cors());
// For parsing the data to frontend in json format
app.use(bodyParser.json({ extended: false }));

// For different routes
app.use(signUpRoutes);
app.use(expenseRoutes);
app.use(paymentRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", forgotRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello!");
});

// For connecting both tables User to Expenses (One to Many)
User.hasMany(Expenses);
Expenses.belongsTo(User);

// For connecting both tables User to Order (One to Many)
User.hasMany(Order);
Order.belongsTo(User);

// For connecting both tables User to ResetPassword (One to Many)
User.hasMany(ResetPassword);
ResetPassword.belongsTo(User);

// For connecting both tables User to FilesDownloaded (One to Many)
User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);

// For converting our model into table using sequelize and start a server at port 3000
sequelize
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
