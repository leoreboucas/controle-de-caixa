const DailyReport = require('../models/DailyReport')
const Expense = require('../models/Expense')

const createCashRegisterService = async ({ user, ...data }) => {
    const { date, initialCash, finalCash, expensesData = [] } = data
    const userId = user._id

    // Validações básicas

    const today = new Date()
    today.setHours(23, 59, 59, 999)

    if (new Date(date) > today) {
        throw new Error('Não é permitido criar caixa para datas futuras')
    }

    // Verificar duplicidade
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)

    const end = new Date(date)
    end.setHours(23, 59, 59, 999)

    const existingReport = await DailyReport.findOne({
        userId,
        date: { $gte: start, $lte: end }
    })

    if (existingReport) {
        throw new Error('Já existe um caixa registrado para este dia')
    }

    // Regra: cálculo

    const totalExpense = expensesData.reduce(
        (sum, e) => sum + e.amount,
        0
    )

    const grossProfit = finalCash - initialCash

    if (grossProfit < 0 && expensesData.length === 0) {
        throw new Error('Lucro negativo sem despesas registradas')
    }

    if (totalExpense > finalCash + initialCash) {
        throw new Error('Despesas incompatíveis com o caixa informado')
    }

    const dailyReport = await DailyReport.create({
        userId, 
        date,
        initialCash,
        finalCash,
        totalExpense,
        grossProfit,
        netProfit: grossProfit - totalExpense
    })

    if (expensesData.length > 0) {
        await Expense.insertMany(
            expensesData.map(e => ({
                ...e,
                userId,
                dailyReportId: dailyReport._id
            }))
        )
    }

    return dailyReport
}

module.exports = {
    createCashRegisterService
}
