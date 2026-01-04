const express = require('express')

const Router = express.Router()

const { createProductController, updatedProductController } = require('../controllers/productController') 
const authMiddleware = require('../middlewares/authMiddleware')

Router.post('/create', authMiddleware, createProductController)
Router.patch('/update/:id', authMiddleware, updatedProductController)

module.exports = Router