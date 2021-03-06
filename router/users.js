var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/user');
const path = require('path');
const passport = require('passport');
const check = require('../middlewares/checkstaus')
const { time } = require('../middlewares/checkTime')

router.use(express.static(path.join(__dirname, 'uploads')));

router.get('/signup',usercontroller.getsignup);
router.post('/signup',usercontroller.postsignup);
router.get('/signin',usercontroller.getsignin);
// router.post('/signin',usercontroller.postsignin);
router.get('/test2',check,usercontroller.getTest);
router.post('/upload-multiple-images', usercontroller.postTest);

router.post('/signin',passport.authenticate('local', { failureRedirect: '/signin', successRedirect: '/' }));

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

router.get('/verified/:id', usercontroller.verified); 
router.get('/reset/:id/:salt/:time/:hash', time, usercontroller.getReset);
router.post('/reset', usercontroller.postReset); 
module.exports = router;