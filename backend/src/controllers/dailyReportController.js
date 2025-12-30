const { createCashRegisterService } = require('../services/dailyReportService')
const { createDailyReportSchema } = require("../schemas/dailyReport.schema")

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

module.exports = {
    createCashRegisterController
}
