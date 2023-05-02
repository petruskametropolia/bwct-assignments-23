'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');

const upload = multer({dest: 'uploads/'});


//Todo move functions to controller
router.post('/posts', upload.single('image'), (req, res) => {
  const { description } = req.body;
  const image = req.file.filename; // multer renames the file to a unique filename

  const sql = `INSERT INTO posts (description, image) VALUES (?, ?)`;
  db.query(sql, [description, image], (err, result) => {
    if (err) throw err;
    res.redirect('/posts');
  });
});
router.post('/like/:id', (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE posts SET likes = likes + 1 WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/posts');
  });
});
router.get('/posts', (req, res) => {
  const sql = `SELECT * FROM posts`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('posts', { posts: results });
  });
});

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

module.exports = router;