const { users } = require("../config/nedb");
users.loadDatabase();

exports.getsignup = (req, res, next) =>{
    res.render('signup');
}

exports.postsignup = (req, res, next) =>{
    data = req.body
    console.log(data)
}

exports.getsignin = (req, res, next) =>{
    res.render('signin');
}

exports.postsignin = (req, res, next) =>{
    res.render('signin');
}