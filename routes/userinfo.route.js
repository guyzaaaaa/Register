const express = require('express');
const router = express.Router();
const UserinfoController = require('../controller/Userinfo/Userinfo.controller.js')

//Get User
router.get('/', UserinfoController.getUser);

//Get User by ID
router.get('/byid/:id', UserinfoController.getUserById);

//Add User
router.post('/info' ,UserinfoController.addUserinfo );

//Update User
router.put('/update-user/:id', UserinfoController.updateUserinfo);

//Delete User
router.delete('/delete-user/:id', UserinfoController.deleteUserinfo);

module.exports = router;