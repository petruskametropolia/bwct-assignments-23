'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = (req, res) => {
    res.json(cats);
    //res.send('From this endpoint you can get cats.');
};

const getCat = (req, res) => {
    //console.log(req.params);
    const id = req.params.catId;
    //todo, filter matching cat based on id
    // todo , response 404 if id not found in array
    const cat = cats[0];
    res.json(cat);
   // res.send('From this endpoint you can get a cat with id: ' + req.params.catId);
  }

const catController = {getCatList, getCat};
module.exports = catController;