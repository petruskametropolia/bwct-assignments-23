'use strict';
// userController
const userModel = require('../models/userModel');

const getUserList = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

// TODO: update for new user model (check cat controller for example)
const getUser = async (req, res) => {
  //console.log(req.params);
  const id = Number(req.params.userId);
  // filter matching user(s) based on id
if(!Number.isInteger(userId)){
  res.status(400).json({error: 500, message: 'invalid id'});
  return;
}

const [user] = await userModel.getUserById(userId);

  //const filteredUsers = users.filter(user => id == user.id);

  //if (filteredUsers.length > 0) {
   // res.json(filteredUsers[0]);
if (user){
  res.json(user);
  } else{
    // send response 404 if id not found in array 
    // res.sendStatus(404);
    res.status(404).json({message: 'User not found.'})
  }
};

// TODO: update for new user model
const postUser = (req, res) => {
  console.log('req body: ', req.body);
  const newUser = 
  {
    name: req.body.name,
    email: req.body.email,
    password: req.body.passwd
  };
  //users.push(newUser);
  res.status(201).send('Added user ' + req.body.name);
};

const putUser = (req, res) => {
  res.send('With this endpoint you can modify a user');
};

const deleteUser = (req, res) => {
  res.send('With this endpoint you can delete a user');
};

const userController = {getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;