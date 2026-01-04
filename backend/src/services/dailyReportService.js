const DailyReport = require('../models/DailyReport')
const Expense = require('../models/Expense')
const User = require('../models/User')

const createCashRegisterService = async ({ user, ...data }) => {
    const { date, initialCash, finalCash, expensesData = [] } = data

    const firebaseUid = user.uid
    
    const userId = (await User.findOne({ firebaseUid }))._id 

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

const updateCashRegisterService = async ({ dailyReportID, user, ...data }) => {
    const { date, initialCash, finalCash, expensesData = [] } = data

    const firebaseUid = user.uid

    const userId = (await User.findOne({ firebaseUid }))._id
    
    // Validações básicas

    const inputDate = new Date(date);

    const today = new Date();
    today.setUTCHours(23, 59, 59, 999);

    if (inputDate > today) {
        throw new Error('Não é permitido criar caixa para datas futuras');
    }

    // Verificação de duplicidade
    const start = new Date(inputDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(inputDate);
    end.setUTCHours(23, 59, 59, 999);

    const existingReport = await DailyReport.findOne({
        userId,
        date: { $gte: start, $lte: end }
    });

    if (existingReport && existingReport._id.toString() !== dailyReportID) {
        throw new Error('Já existe um caixa registrado para este dia');
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

    const updatedDailyReport = await DailyReport.findOneAndUpdate(
            { _id: dailyReportID, userId },
            {
                userId,
                date,
                initialCash,
                finalCash,
                totalExpense,
                grossProfit,
                netProfit: grossProfit - totalExpense
            },
            { new: true }
        )
        

    await Expense.deleteMany({
        userId,
        dailyReportId: updatedDailyReport._id
    });
    if (expensesData.length > 0) {
        await Expense.insertMany(
            expensesData.map(e => ({
                ...e,
                userId,
                dailyReportId: updatedDailyReport._id
            }))
        )
    }

    return updatedDailyReport
}

module.exports = {
    createCashRegisterService,
    updateCashRegisterService
}
