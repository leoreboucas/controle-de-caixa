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
        default: new Date(),
        required: true
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
    unitPrice: {
        type: Number,
        required: true,
        default: 0
    },
    dailyReportId: {
        type: Schema.Types.ObjectId,
        ref: 'DailyReport',
        required: true
    }
})

module.exports = mongoose.model('Expense', ExpenseSchema);