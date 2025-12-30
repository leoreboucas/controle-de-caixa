const express = require('express')

const Router = express.Router()

const { createCashRegisterController } = require('../controllers/dailyReportController')
const authMiddleware = require('../middlewares/authMiddleware')

Router.post('/create', authMiddleware, createCashRegisterController)

module.exports = Router