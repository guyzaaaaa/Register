const express = require('express');
const router = express.Router();
const UserController = require('../controller/User/Users.controller')

//Get User
router.get('/', UserController.getUser);

//Get User By Id
router.get('/byid/:id', UserController.getUserById);

//Insert User or Register
router.post('/register', UserController.InsertUser);

//Update User
router.put('/update-user/:id', UserController.UpdateUser);

//Delete User
router.delete('/delete-user/:id', UserController.DeleteUser);

//Login User
router.post('/login', UserController.LoginUser);

router.get('/getme/',UserController.getme);

module.exports = router;