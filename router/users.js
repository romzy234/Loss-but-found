var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/user');


router.get('/signup',usercontroller.getsignup);
router.post('/signup',usercontroller.postsignup);
router.get('/signin',usercontroller.getsignin);
router.post('/signin',usercontroller.postsignin);
router.get('/test2',usercontroller.getTest);
router.post('/upload-multiple-images', usercontroller.postTest);
//router.get('/register',check,usercontroller.getRegister);



module.exports = router;