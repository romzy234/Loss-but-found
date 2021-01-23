const { users, test } = require("../config/nedb");
var multer =require('multer');
var helpers = require('../script/helper')
const path = require('path');
users.loadDatabase();
test.loadDatabase();


var genPassword = require('../utils/passwordutils').genPassword;
var isValid = require('../utils/passwordutils').validPassword

exports.getsignup = (req, res, next) =>{
    res.render('signup');
}

exports.postsignup = (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = {
        username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt,
        status : true
        // admin: true
    };

   // welcome.newAdmin(req.body.email, req.body.username, req.body.password);
    users.insert(newUser, function (err, newDoc) { 
        res.redirect('/');
        if(err){
            res.status(500)
        }
        });
};

exports.getsignin = (req, res, next) =>{
    res.render('signin');
}

exports.postsignin = (req, res, next) =>{
    res.render('signin');
}

exports.getTest = (req, res, next) =>{
    res.render('imageTest');
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
      console.log('ran from cb')
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


exports.postTest = (req, res) => {
    // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('multiple_images', 10);
    console.log('ran from cb 2')
    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        //else if () // The same as when uploading single images

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./">Upload more images</a>';
        res.send(result);
    });
};

