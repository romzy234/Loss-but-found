var express = require('express');
var router = express.Router();
const indexcontroller = require('../controller/index')


router.get('/',indexcontroller.getHome);
router.post('/report',indexcontroller.postReport);
router.get('/add',indexcontroller.getAdd);
module.exports = router;