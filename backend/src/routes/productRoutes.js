const express = require('express')

const Router = express.Router()

const { createProductController, updatedProductController, deleteProductController, getAllProductController, getProductController } = require('../controllers/productController') 
const authMiddleware = require('../middlewares/authMiddleware')

Router.get('/get/:id', authMiddleware, getProductController)
Router.get('/get-all', authMiddleware, getAllProductController)
Router.post('/create', authMiddleware, createProductController)
Router.patch('/update/:id', authMiddleware, updatedProductController)
Router.delete('/delete/:id', authMiddleware, deleteProductController)

module.exports = Router