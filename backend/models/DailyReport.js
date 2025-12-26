const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DailyReportSchema = Schema({
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    initialCash: {
        type: Number,
        default: 0
    },
    finalCash: {
        type: Number,
    },
    totalExpense: {
        type: Number,
        required: true,
    },
    grossProfit: {
        type: Number, 
        required: true,
    },
    netProfit: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model('dailyreport', DailyReportSchema)