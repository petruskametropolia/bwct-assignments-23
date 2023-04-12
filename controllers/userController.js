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
const postUser = async (req, res) => {
  console.log('Creating a new user: ', req.body);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.passwd, salt);
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: password,
    role: 1, // default user role (normal user)
  };
  const errors = validationResult(req);
  console.log('validation errors', errors);
  if (errors.isEmpty()) {
    try {
      const result = await userModel.insertUser(newUser);
      res.status(201).json({message: 'user created', userId: result});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  } else {
    res.status(400).json({
      message: 'user creation failed',
      errors: errors.array(),
    });
  }
};


const putUser = (req, res) => {
  res.send('With this endpoint you can modify a user');
};

const deleteUser = (req, res) => {
  res.send('With this endpoint you can delete a user');
};

const checkToken = (req, res) => {
  res.json({user: req.user});
};


const userController = {getUserList, checkToken, getUser, postUser, putUser, deleteUser};
module.exports = userController;