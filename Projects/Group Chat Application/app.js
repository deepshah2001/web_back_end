const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require("./util/database");

const UserRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use("/user", UserRoutes);

app.use("/", (req, res, next) => {
    res.send("Hello there!");
})

sequelize
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));