const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = Schema({
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
        ref: 'dailyreport',
        required: true
    }
})

module.exports = mongoose.model('expense', ExpenseSchema);