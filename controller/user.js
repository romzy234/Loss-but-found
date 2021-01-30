const { users, test } = require("../config/nedb");
var multer =require('multer');
var helpers = require('../script/helper')
const path = require('path');
users.loadDatabase();
test.loadDatabase();

const {verified} = require('../mail/verify');
const {validHash} = require('../script/resetHash');


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
        name : req.body.name,
        email: req.body.email,
        hash: hash,
        salt: salt,
        status : true,
        verified: false,
        // admin: true
    };

   // welcome.newAdmin(req.body.email, req.body.username, req.body.password);
    users.insert(newUser, function (err, newDoc) { 
       // verified(newDoc.email,newDoc._id); // For Mail Verification
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

exports.verified = (req,res, next) => {
    const id = req.params.id
    // Set an existing field's value
    users.update({ _id: id }, { $set: { verified: true } }, function (err, numReplaced) {
        res.redirect('/');
  });
}

exports.reset= (req,res, next) => {
    const salt = req.params.salt;
    const hash = req.params.hash;
    const id = req.params.id;
    // Set an existing field's value
    console.log('ranss')
    users.findOne({ _id : id}, (err, data) =>{
        
        if (err) { return res.send('you are very not in'); }

        if (!data) { return res.send('you are very not in'); }
        
            const isValid = validHash(data.password, hash, salt);
            // console.log( isValid)
            if (isValid) {
                res.send('you are in');
            } else {
                res.send('you are very not in');
            }
    })
}

/**So for the reset function
 * we use the salt to find the user 
 * then run the  valid hash function 
 * if true we rediret the user to a page which would update the password
 * else send a bad request and flagg the user ;-)
 * 
 * then the post genratation we pass a mail function with the following params 
 * (email, salt, time, hash) 
 * this would sent the mail 
 * the post route would use email 
 *  a middleware to find the user 
 * if not exist would sent a bad request in the html 
 * not redirect to another user
 */