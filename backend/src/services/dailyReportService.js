const DailyReport = require('../models/DailyReport')
const Expense = require('../models/Expense')
const User = require('../models/User')
const normalizeDateUTC = require('../helpers/normalizeDateUTC')

const getCashRegisterService = async ({ dailyreportID, user } ) => {
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }

    const userId = userExists._id

    const dailyReport = await DailyReport.findOne({
        userId,
        _id: dailyreportID
    })

    if(!dailyReport) {
        throw new Error('Caixa não existe!')
    }

    return dailyReport
}

const getAllCashRegisterService = async ({ user }) => {
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }

    const userId = userExists._id

    const dailyReport = await DailyReport.find({
        userId
    })
    

    return dailyReport
}

const createCashRegisterService = async ({ user, ...data }) => {
    const { date, initialCash, finalCash, expensesData = [] } = data

    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }
    const userId = userExists._id

    // Validações básicas

    const inputDateUTC = date instanceof Date ? date : new Date(`${date}T00:00:00`);


    const todayUTC = new Date();
    todayUTC.setUTCHours(23, 59, 59, 999);

    if (inputDateUTC > todayUTC) {
        throw new Error('Não é permitido criar caixa para datas futuras');
    }

    // Verificar duplicidade
    const start = new Date(inputDateUTC);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(inputDateUTC);
    end.setUTCHours(23, 59, 59, 999);

    const existingReport = await DailyReport.findOne({
        userId,
        date: { $gte: start, $lte: end }
    });

    if (existingReport) {
        throw new Error('Já existe um caixa registrado para este dia')
    }

    // Regra: cálculo

    const totalExpense = expensesData.reduce(
        (sum, e) => sum + e.amount,
        0
    )

    const grossProfit = (finalCash - initialCash) + totalExpense

    if (grossProfit < 0 && expensesData.length === 0) {
        throw new Error('Lucro negativo sem despesas registradas')
    }

    if (totalExpense > finalCash + initialCash) {
        throw new Error('Despesas incompatíveis com o caixa informado')
    }

    const dailyReport = await DailyReport.create({
        userId,
        date: inputDateUTC,
        initialCash,
        finalCash,
        totalExpense,
        grossProfit,
        netProfit: grossProfit - totalExpense
    });

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

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }
    const userId = userExists._id
    
    // Validações básicas

    const inputDateUTC = date instanceof Date ? date : new Date(`${date}T00:00:00`);


    const todayUTC = new Date();
    todayUTC.setUTCHours(23, 59, 59, 999);

    if (inputDateUTC > todayUTC) {
        throw new Error('Não é permitido criar caixa para datas futuras');
    }

    // Verificar duplicidade
    const start = new Date(inputDateUTC);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(inputDateUTC);
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

    const grossProfit = (finalCash - initialCash) + totalExpense

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
                date: inputDateUTC,
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

const deleteCashRegisterService = async({dailyReportID, user}) =>  {
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }
    const userId = userExists._id

    const dailyReportExists = await DailyReport.findOne({ 
        userId,
        _id: dailyReportID
     })

    if(!dailyReportExists){
        throw new Error('Caixa inexistente!')
    }

    const dailyReport = await DailyReport.findOneAndDelete({ 
        userId,
        _id: dailyReportID
    })
    
    return dailyReport
}

module.exports = {
    getCashRegisterService,
    getAllCashRegisterService,
    createCashRegisterService,
    updateCashRegisterService,
    deleteCashRegisterService
}
