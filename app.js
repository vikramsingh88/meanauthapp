const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');
//Connect to databse
mongoose.connect(config.database);
//On Connection
mongoose.connection.on('connected', () => {
  console.log('connected to databse', config.database);
});
//On Error
mongoose.connection.on('err', (err) => {
  console.log('MongoDB error', err);
});

const app = express();
const port = 3000;

//Cors middleware
app.use(cors());
//Set static folder
app.use(express.static(path.join(__dirname,'public')));
//Body parser middleware
app.use(bodyParser.json());
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//user midleware
app.use('/users', users);

//Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

//Start server
app.listen(port, () => {
  console.log('Server is running at port '+port);
});
