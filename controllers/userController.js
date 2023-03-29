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
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: `User with id ${id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};
// TODO: update for new user model (check cat controller for example)

const postUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  try {
    const result = await userModel.createUser({ name, email, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};


// TODO: update for new user model



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

const userController = {getUserList,getUserById, getUser, postUser, putUser, deleteUser};
module.exports = userController;