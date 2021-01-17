var express = require('express');
var router = express.Router();
const indexcontroller = require('../controller/index')


router.get('/',indexcontroller.getHome);
router.post('/report',indexcontroller.postReport);
router.get('/add',indexcontroller.getAdd);
router.get('/test',indexcontroller.getTest);
router.get('/api',indexcontroller.getTestApi);
router.get('/search',indexcontroller.getSearch);
router.post('/search',indexcontroller.postSearch);
module.exports = router;