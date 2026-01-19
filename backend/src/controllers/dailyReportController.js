const { createCashRegisterService, updateCashRegisterService, deleteCashRegisterService, getCashRegisterService, getAllCashRegisterService } = require('../services/dailyReportService')
const { createDailyReportSchema, updateDailyReportSchema } = require("../schemas/dailyReport.schema")

const getDailyReportController = async (req, res) => {
    try {
        const dailyReportID = req.params.id
        const dailyReport = await getCashRegisterService({
            dailyReportID,
            user: req.user
        })

        res.status(200).json(dailyReport)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllDailyReportController = async (req, res) => {
    try {
        const dailyReport = await getAllCashRegisterService({
            user: req.user
        })

        res.status(200).json(dailyReport)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const createCashRegisterController = async (req, res) => {
    try {
        const data = createDailyReportSchema.parse(req.body)
        
        const cashRegister = await createCashRegisterService({
            ...data,
            user: req.user
        })
        res.status(201).json(cashRegister)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const updatedDailyReportController = async (req, res) => {
    try {
        const data = updateDailyReportSchema.parse(req.body)
        const dailyReportID = req.params.id
        const dailyReport = await updateCashRegisterService({
            ...data,
            dailyReportID,
            user: req.user
        })

        res.status(201).json(dailyReport)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteDailyReportController = async (req, res) => {
    try {
        const dailyReportID = req.params.id
        const dailyReport = await deleteCashRegisterService({
            dailyReportID,
            user: req.user
        })

        res.status(200).json(dailyReport)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    getDailyReportController,
    getAllDailyReportController,
    createCashRegisterController,
    updatedDailyReportController,
    deleteDailyReportController
}
