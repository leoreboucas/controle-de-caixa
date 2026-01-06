const express = require('express')

const Router = express.Router()

const { createCashRegisterController, updatedDailyReportController, deleteDailyReportController } = require('../controllers/dailyReportController')
const authMiddleware = require('../middlewares/authMiddleware')

Router.post('/create', authMiddleware, createCashRegisterController)
Router.patch('/update/:id', authMiddleware, updatedDailyReportController)
Router.delete('/delete/:id', authMiddleware, deleteDailyReportController)

module.exports = Router