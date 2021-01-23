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
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var session = require('express-session');


// hashing ---Note
//sql -- later
// createError 



// Express 
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "ilovecoding",//process.env.SECRET,
  resave: false,
  saveUninitialized: true,  
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
})); 

app.use(passport.initialize());
app.use(passport.session());

//passport config
require('./auth/passport');

const port = process.env.PORT || '3000';
app.listen(port, ()=>{
    console.log(`running on port ${port} or go to 'http://localhost:3000' `)
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });



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