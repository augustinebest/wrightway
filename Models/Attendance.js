const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    idNo: { 
        type: String
    },
    date: {
        type: String
    },
    timeIn: {
        type: String
    },
    status: {
        type: Number,
        default: null
    },
    amountDeducted: {
        type: Number,
        default: 0
    },
    day: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Attendance', AttendanceSchema);