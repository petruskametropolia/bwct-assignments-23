'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/userController');

const upload = multer({dest: 'uploads/'});


//Todo move functions to controller

//router.get('/',userController.getUserList);
//router.route('/')
//.post(upload.single('user'), userController.postUser)
//router.get('/user/',userController.getUser);
//router.post('/', userController.postUser);

router.route('/')
.get(userController.getUserList)
.post(upload.single('user'), userController.postUser)
.put(userController.putUser)

//router.route('/:user_id')
//.get(userController.getUser);


module.exports = router;