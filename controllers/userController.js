'use strict';
// userController
const userModel = require('../models/userModel');

const getUserList = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    res.json(users);
  }
 
 catch (error) {
    res.status(500).json({message: error.message})
  }
};

// TODO: update for new user model (check cat controller for example)

const getUser = async (req, res) => {
  //console.log(req.params);
  // convert id value to number
  const userId = Number(req.params.user_id);
  // check if number is not an integer
  if (!Number.isInteger(userId)) {
    res.status(400).json({error: 500, message: 'invalid id'});
    return;
  }
  // TODO: wrap to try-catch
  const [user] = await userModel.getUserById(userId);
  console.log('getUser', user);
  if (user) {
    res.json(user);
  } else {
    // send response 404 if id not found in array 
    // res.sendStatus(404);
    res.status(404).json({message: 'User not found.'})
  }
};


// TODO: update for new user model
const postUser = async (req, res) => {
  //console.log('req body: ', req.body);
  const newUser = req.body;
  newUser.filename = req.file.filename;
  try {
    const result = await userModel.insertUser(newUser);
    res.status(201).send('Added user ' + req.body.name);
  } catch (error){
    res.status(500).json({error: 500, message: error.message});
  }
  //users.push(newUser);
};



const putUser = async (req, res) => {
  const user = req.body;
  try{
    const result = await userModel.modifyUser(user);
    res.status(200).json({message: 'user modified!'});
  }catch (error) {
    res.status(500).json({error: 500, message: error.message});
  }
};


const deleteUser = (req, res) => {
  res.send('With this endpoint you can delete a user');
};

const userController = {getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;