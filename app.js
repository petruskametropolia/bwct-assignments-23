'use strict';
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const app = express();
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
  });

  app.post('/signup', (req, res) => {
    const { username,email, password } = req.body;
    const sql = `INSERT INTO wop_user (name,email, password) VALUES (?, ?, ?)`;
  
    db.query(sql, [username,email, password], (err, results) => {
      if (err) throw err;
  
      res.send('User created successfully!');
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
