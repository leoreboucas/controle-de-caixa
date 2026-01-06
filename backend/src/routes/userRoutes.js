const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { updateUserController } = require('../controllers/userController');

const Router = express.Router();

Router.patch('/update', authMiddleware, updateUserController)

module.exports = Router