const Expense = require('../models/Expense')
const User = require('../models/User')
const DailyReport = require('../models/DailyReport')

const getExpenseService = async ({ user, dailyReportID }) => {
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
        if (!userExists) {
            throw new Error('Usuário não encontrado.')
        }
    
    

    const userId = userExists._id
    const dailyReport = await DailyReport.findOne({userId,
        _id: dailyReportID
    })

    const expense = await Expense.find({
            userId,
            dailyReportId: dailyReport._id
        })
        if(!expense) {
            throw new Error('Despesas não registrada!')
        }
    
        return expense
}

module.exports = {
    getExpenseService
}