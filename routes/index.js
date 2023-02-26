
const express = require('express');
const router = express.Router();

// getting homepage controller
const homeController = require('../controller/homeController');
router.get('/',homeController.home);
// create habit route
router.post('/create-habit',homeController.createHabit);
// delete habit route
router.get('/delete-habit/',homeController.deleteHabit);
// use details routes
router.use('/details',require('./details'))


module.exports=router;
