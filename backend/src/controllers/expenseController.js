const { getExpenseService } = require("../services/expenseService")

const getExpenseController = async (req, res) => {
    try {
        const dailyReportID = req.params.id
        const expense = await getExpenseService({
            user: req.user,
            dailyReportID
        })

        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    getExpenseController
}