'use strict'
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req,res) => {
    const username = 'Käyttähän nimi';
    const description = 'Aku ankka';
    const content = {title: username, description};
res.render('index', content);
});

app.get('/kukkuu', (req, res) => {
    res.send('No moro')
  })

  app.get('/esim-sivu', (req, res) => {
    const monkDataFromD8 = 'Käyttähän nimi';
    const response = '<html><head><title></head></body></html>';
    res.send(response);
  })

  app.get("/catinfo", (req, res) => {
    const cat = {
      name: "Frank",
      birthdate: "2010-12-25",
      weight: 5,
    };
    res.json(cat);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

