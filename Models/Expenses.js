const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    reason: {
        type: String
    },
    amount: {
        type: Number
    },
    person: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
})

module.exports = mongoose.model('Expense', ExpenseSchema);