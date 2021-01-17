const { users } = require("../config/nedb");
users.loadDatabase();

exports.getsignup = (req, res, next) =>{
    res.render('signup');
}

exports.Postsignup = (req, res, next) =>{
    res.render('signup');
}

exports.getsignin = (req, res, next) =>{
    res.render('signin');
}

exports.Postsignin = (req, res, next) =>{
    res.render('signin');
}