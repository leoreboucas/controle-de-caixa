const express = require('express')

const Router = express.Router()

const { createProductController } = require('../controllers/productController') 
const authMiddleware = require('../middlewares/authMiddleware')

Router.post('/create', authMiddleware, createProductController)

module.exports = Router