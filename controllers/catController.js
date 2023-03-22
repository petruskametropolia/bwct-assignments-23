'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = async (req, res) => {
     const cats = await catModel.getAllCats();
    res.json(cats);
    //res.send('From this endpoint you can get cats.');
};

const getCat = (req, res) => {
    //console.log(req.params);
    const id = req.params.catId;
    const filteredCats = cats .filter(cat => id == cat.id);

    //console.log(filteredCats);
    //todo, filter matching cat based on id
    // todo , response 404 if id not found in array
    if(filteredCats.length > 0){
        res.json(filteredCats[0]);
    } else {
       // res.status(404).send('Not found')
       res.status(404).json({message: 'Cat not found'});
    }
    //const cat = filteredCats[0];
   
   // res.send('From this endpoint you can get a cat with id: ' + req.params.catId);
  }

  const postCat  = (req, res) => {
    console.log('posting a cat', req.body, req.file);
    const newCat = req.body;
    newCat.filename  = 'http://localhost:3000/uploads/' + req.file.path;
    cats.push(newCat);
    res.status(201).send('new cat added!');
  };

  const putCat = (req, res) => {
    res.send('From this endpoint you can modify cats.')
  };

  const deleteCat = (req, res) => {
    res.send('From this endpoint you can delete cats.')
  };

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;