'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Todo move functions to controller
router.get('/',userController.getUserList);
router.get('/user/',userController.getUser);

module.exports = router;