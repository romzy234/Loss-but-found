const express = require('express');
const cors = require('cors');
const nedb = require('nedb');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const { config } = require('./config.js');

// passport 
// hashing
//sql
// createError 
// express Session


// Express 
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || '3000';
app.listen(port, ()=>{
    console.log(`running on port ${port} `)
});


// routes
const indexRouter = require('./router/index');
const usersRouter = require('./router/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/test.html'));
  })