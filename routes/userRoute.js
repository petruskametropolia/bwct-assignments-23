'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/userController');

const upload = multer({dest: 'uploads/'});


//Todo move functions to controller

router.get('/',userController.getUserList);
router.route('/')
.post(upload.single('cat'), catController.postCat)
router.get('/user/',userController.getUser);
router.post('/', userController.postUser);

module.exports = router;