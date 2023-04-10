'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');

const upload = multer({dest: 'uploads/'});


//Todo move functions to controller


router.route('/')
.get(userController.getUserList)
.post(upload.single('user'),
    body('name').isAlphanumeric().isLength({min: 3, max: 200}).escape().trim(),
    body('email').isEmail(),
    body('password').isLength({min: 8}),
userController.postUser
)

router.route('/:userId')
  .get(userController.getUser)

  router.get('/token', userController.checkToken);

module.exports = router;