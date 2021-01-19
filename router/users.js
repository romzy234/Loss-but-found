var express = require('express');
var router = express.Router();
var multer =require('multer');
var usercontroller = require('../controller/user');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

router.get('/signup',usercontroller.getsignup);
router.post('/signup',usercontroller.postsignup);
router.get('/signin',usercontroller.getsignin);
router.post('/signin',usercontroller.postsignin);
router.get('/test2',usercontroller.getTest);
router.post('/upload-multiple-images', usercontroller.postTest);
//router.get('/register',check,usercontroller.getRegister);



module.exports = router;