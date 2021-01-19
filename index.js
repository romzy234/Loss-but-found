const express = require('express');
const cors = require('cors');
const nedb = require('nedb');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const { config } = require('./config.config');
var createError = require('http-errors');
var passport = require('passport');
const multer = require('multer');

// hashing
//sql
// createError 
// express Session


// Express 
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || '3000';
app.listen(port, ()=>{
    console.log(`running on port ${port} `)
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });

//passport config
require('./auth/passport');

app.use((req, res, next) => {
    res.locals.logUser = req.user;  
    next();
  });
// routes
const indexRouter = require('./router/index');
const usersRouter = require('./router/users');

app.use('/', indexRouter);
app.use('/', usersRouter);
// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname+'/test.html'));
//   })

console.log(config.port)