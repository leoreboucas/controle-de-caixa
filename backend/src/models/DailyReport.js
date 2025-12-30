const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DailyReportSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    date: {
        type: Date,
        required: true
    },

    initialCash: {
        type: Number,
        required: true,
        min: 0
    },

    finalCash: {
        type: Number,
        required: true,
        min: 0
    },

    totalExpense: {
        type: Number,
        required: true,
        min: 0
    },

    grossProfit: {
        type: Number,
        required: true
    },

    netProfit: {
        type: Number,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('DailyReport', DailyReportSchema)