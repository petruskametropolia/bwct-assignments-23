'use strict';
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const multer = require('multer');
const port = 3000;
const mysql = require('mysql2');
const bodyParser = require('body-parser');

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
  
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(multer({ dest: 'uploads/' }).single('image')); 
app.use(express.static('public')); 

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM wop_user WHERE name = ? AND password = ?`;
  
    db.query(sql, [username, password], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.send('Login successful!');
       
      } else {
        res.send('Incorrect username or password.');
      }
    });
    res.redirect('/ui7/posts.html');
  });
  app.get('/posts', (req, res) => {
    // render the posts page
    res.render('posts');
  });
  
  app.post('/signup', (req, res) => {
    const { username,email, password } = req.body;
    const sql = `INSERT INTO wop_user (name,email, password) VALUES (?, ?, ?)`;
  
    db.query(sql, [username,email, password], (err, results) => {
      if (err) throw err;
  
      res.send('User created successfully!');
    });
  });
  
//post
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
  app.post('/posts', upload.single('image'), (req, res) => {
    const { description } = req.body;
    const imageUrl = `uploads/${req.file.filename}`;
  
    const sql = 'INSERT INTO posts (description, imageUrl, likes) VALUES (?, ?, 0)';
    db.query(sql, [description, imageUrl], (err, result) => {
      if (err) throw err;
      console.log('Post created!');
      res.redirect('/');
    });
  });
  
  app.post('/posts/:id/like', (req, res) => {
    const sql = 'UPDATE posts SET likes = likes + 1 WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      console.log('Post liked!');
      res.sendStatus(200);
    });
  });
  

  app.get('/posts', (req, res) => {
    // Get all posts from the database
    db.collection('posts').find().toArray((err, posts) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
  
      // Render the posts page with the posts data
      res.render('posts', { posts: posts });
    });
  });

  


app.use((req, res, next) =>{
    console.log(Date.now() + ': request: ' + req.method + '' + req.path)
    next();
});
app.use(express.static('example-ui'));
app.use('/uploads', express.static('uploads'));

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cat', catRoute);
app.use('/user',userRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
