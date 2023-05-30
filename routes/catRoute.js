'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const router = express.Router();
const catController = require('../controllers/catController');
const {body} = require('express-validator');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'test123',
    database: 'catdb'
  });

  db.connect((err) => {
    if (err) throw err;
   // console.log('Connected to database!');
  });

const fileFilter = (req,file,cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
if(allowedTypes.includes(file.mimetype)){
    cb(null, true);
} else {
    cb(null, false);
}
};

const upload = multer({dest: 'uploads/', fileFilter: fileFilter});

router.route('/')
.get(catController.getCatList)
.post(upload.single('cat'),
    body('name').isAlphanumeric().isLength({min: 1, max: 200}).escape().trim(),
    body('birthdate').isDate(),
    body('weight').isFloat({min: 0.1, max: 50}),
    body('owner').isInt({min: 1}),
    catController.postCat)

.put(
body('name').isAlphanumeric().isLength({min: 1, max: 200}),
    body('birthdate').isDate(),
    body('weight').isFloat({min: 0.1, max: 50}),
    body('owner').isInt({min: 1}),
catController.putCat)

router.post('/like/:id', async (req, res) => {
    try {
      const catId = req.params.id;
  
      // like count update in the wop_cat table
      const updateQuery = `UPDATE wop_cat SET likes = likes + 1 WHERE cat_id = ?`;
      await db.query(updateQuery, [catId]);
  
      const selectQuery = `SELECT * FROM wop_cat WHERE cat_id = ?`;
      const result = await db.query(selectQuery, [catId]);
  
      if (result.length === 0) {
        res.status(404).json({ error: 'Cat not found' });
      } else {
        const cat = result[0];
        res.json(cat);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
router.route('/:id')
.get(catController.getCat)
.delete(catController.deleteCat);

module.exports = router;