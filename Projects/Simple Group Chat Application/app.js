const express = require('express');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');

const portNumber = 4000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(homeRouter);
app.use('/login', loginRouter);

app.listen(portNumber, 'localhost', () => console.log(`Server started at http://localhost:${portNumber}`));