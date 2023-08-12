// Importing or requiring all essential packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// For database connection
const sequelize = require('./util/database');

const expenseRoute = require('./routes/expense');

const app = express();

// For allowing cross connection betwwwn our front-end and back-end
app.use(cors());
// For passing data in form of json from back-end to front-end.
app.use(bodyParser.json({extended: false}));

// Manages all routes from front-end
app.use(expenseRoute);

// Converting our model into table using sequelize into SQL and starting a server at 3000
sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));