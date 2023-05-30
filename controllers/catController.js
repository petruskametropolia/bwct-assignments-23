'use strict';
// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');

const getCatList = async (req, res) => {
  try {
    let cats = await catModel.getAllCats();
    // convert ISO date to date only
    // should this be done on the front-end side??
    cats = cats.map(cat => {
      cat.birthdate = cat.birthdate.toISOString().split('T')[0];
      return cat;
    });
    res.json(cats);
  } catch (error) {
    res.status(500).json({error: 500, message: error.message});
  }
};

const getCat = async (req, res) => {
  //console.log(req.params);
  // convert id value to number
  const catId = Number(req.params.id);
  // check if number is not an integer
  if (!Number.isInteger(catId)) {
    res.status(400).json({error: 500, message: 'invalid id'});
    return;
  }
  // TODO: wrap to try-catch
  const [cat] = await catModel.getCatById(catId);
  console.log('getCat', cat);
  if (cat) {
    res.json(cat);
  } else {
    // send response 404 if id not found in array 
    // res.sendStatus(404);
    res.status(404).json({message: 'Pet not found.'})
  }
};

const postCat = async (req, res) => {
 // console.log('posting a cat', req.body, req.file);
 if(!req.file){
res.status(400).json({status: 400, message: 'Invalid or missing image data'});
return;
 }

const validationErrors = validationResult(req);
if(!validationErrors.isEmpty()){
res.status(400).json({status: 400, errors: validationErrors.array(), message: 'Invalid post data'});
return;
}

  const newCat = req.body;
  newCat.filename = req.file.filename;
  try {
    const result = await catModel.insertCat(newCat);
    res.status(201).json({message: 'new pet added!'});
  } catch (error) {
    res.status(500).json({error: 500, message: error.message});
  }
};

const putCat = async (req, res) => {
 // console.log('modifying a cat', req.body);
  
  const validationErrors = validationResult(req);
if(!validationErrors.isEmpty()){
res.status(400).json({status: 400, errors: validationErrors.array(), message: 'Invalid put data'});
return;
}
const cat = req.body;
  try {
    const result = await catModel.modifyCat(cat);
    res.status(200).json({message: 'pet modified!'});
  } catch (error) {
    res.status(500).json({error: 500, message: error.message});
  }
};

const deleteCat = async (req, res) => {
//  console.log('deleting a cat', req.params.id);
  try {
    const result = await catModel.deleteCat(req.params.id);
    res.status(200).json({message: 'pet deleted!'});
  } catch (error) {
    res.status(500).json({error: 500, message: error.message});
  }
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;