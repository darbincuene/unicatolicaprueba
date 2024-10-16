const express = require('express');
const userController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/login', userController.loginUser);
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;
