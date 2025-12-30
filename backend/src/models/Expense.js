const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    date: {
        type: Date, 
        default: Date.now(),
        required: true
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
    dailyReportId: {
        type: Schema.Types.ObjectId,
        ref: 'DailyReport',
        required: true
    }
})

module.exports = mongoose.model('Expense', ExpenseSchema);