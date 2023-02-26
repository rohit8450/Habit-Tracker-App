const express = require('express');
const router=express.Router();

// getting user controller
const detailsController = require('../controller/detailsController');
router.get('/',detailsController.details);

// update route for habits
router.post('/update-habit/',detailsController.updateHabit);



module.exports=router;