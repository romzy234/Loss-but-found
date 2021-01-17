var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/user');

router.get('/signup',usercontroller.getsignup);
router.post('/signup',usercontroller.postsignup);
router.get('/signin',usercontroller.getsignin);
router.post('/signin',usercontroller.postsignin);
//router.get('/register',check,usercontroller.getRegister);
module.exports = router;