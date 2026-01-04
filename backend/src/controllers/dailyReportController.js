const { createCashRegisterService, updateCashRegisterService } = require('../services/dailyReportService')
const { createDailyReportSchema, updateDailyReportSchema } = require("../schemas/dailyReport.schema")

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

module.exports = {
    createCashRegisterController,
    updatedDailyReportController
}
