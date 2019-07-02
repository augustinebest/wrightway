const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
    },
    maxTimeStart: {
        type: String,
        default: '0:00'
    },
    late1Start: {
        type: String,
        default: '0:00'
    },
    late1End: {
        type: String,
        default: '0:00'
    },
    late1Debit: {
        type: Number,
        default: '0'
    },
    late2Start: {
        type: String,
        default: '0:00'
    },
    late2End: {
        type: String,
        default: '0:00'
    },
    late2Debit: {
        type: Number,
        default: '0'
    },
    absentDebit: {
        type: Number,
        default: '0'
    },
    workers: [{
        type:  mongoose.Schema.Types.ObjectId, ref: 'FactoryWorker'
    }],
    admins: [{
        type:  mongoose.Schema.Types.ObjectId, ref: 'Admin'
    }],
    Drivers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'FactoryWorker'
    }],
    expenses: [{
        type:  mongoose.Schema.Types.ObjectId, ref: 'Expense'
    }]
})

module.exports = mongoose.model('Company', CompanySchema);