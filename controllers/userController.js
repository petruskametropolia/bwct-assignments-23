'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;

for (const user of users){
  delete user.password;
}
const getUserList = (req, res) => {
  
    res.json(users);
    //res.send('From this endpoint you can get Users.');
};

const getUser = (req, res) => {
    //console.log(req.params);
    const id = req.params.userId;
    const filteredUsers = users.filter(user => id == user.id);

    console.log(filteredUsers);
    //todo, filter matching user based on id
    // todo , response 404 if id not found in array
    if(filteredUsers.length > 0){
        res.json(filteredUsers[0]);
    } else {
       // res.status(404).send('Not found')
       res.status(404).json({message: 'User not found'});
    }
    const user = filteredUsers[0];
   
   // res.send('From this endpoint you can get a user with id: ' + req.params.userId);
  }

  const postUser  = (req, res) => {
    res.send('From this endpoint you can add users.')
  };

  const putUser = (req, res) => {
    res.send('From this endpoint you can modify users.')
  };

  const deleteUser = (req, res) => {
    res.send('From this endpoint you can delete users.')
  };

const userController = {getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;