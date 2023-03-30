'use strict';
// catRoute

const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/userController');

const upload = multer({dest: 'uploads/'});


router.get('/', userController.getUserList);
router.get('/:userId', userController.getUser);

router.post('/', userController.postUser);

//router.route('/')
//.get(userController.getUserList)
//.post(upload.single('user'), userController.postUser)
//.put(userController.putUser)

// TODO: add  other endpoints needed

module.exports = router;