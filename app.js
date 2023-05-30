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
const flash = require('express-flash');
const session = require('express-session');


app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
  }));
  
  app.use(flash());

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
  app.use(express.static('public')); 

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      req.flash('error', 'Please provide both username and password.');
      return res.redirect('/ui6/login.html');
    }
  
    const sql = `SELECT * FROM wop_user WHERE name = ? AND password = ?`;
  
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error(err);
        req.flash('error', 'Internal Server Error');
        return res.redirect('/ui6/login.html');
      }
  
      if (results.length > 0) {
        // Login successful
        return res.redirect('/ui2/front.html');
      } else {
        req.flash('error', 'Incorrect username or password.');
  
        // pop-up epäonnistuneelle kirjautumiselle
        const script = `
          <script>
            alert('Incorrect username or password.');
            window.location.href = '/ui6/login.html';
          </script>
        `;
  
        return res.send(script);
      }
    });
  });

app.post('/signup', (req, res) => {
    const { username,email, password } = req.body;
    const sql = `INSERT INTO wop_user (name,email, password) VALUES (?, ?, ?)`;
  
    db.query(sql, [username,email, password], (err, results) => {
      if (err) throw err;
  
    //  res.send('User created successfully!');
      res.redirect('/ui2/front.html');
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