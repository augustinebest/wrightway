const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    idNo: {
        type: String
    },
    email: {
        type: String,
        match: /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    currentDate: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: 'wrightway'
    },
    address: {
        type: String
    },
    nationality: {
        type: String
    },
    passport: {
        type: String,
        default: null
    },
    imageID: {
        type: String
    },
    stateOfOrigin: {
        type: String
    },
    localGovtArea: {
        type: String
    },
    town: {
        type: String
    },
    religion: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    sex: {
        type: String
    },
    age: {
        type: Number
    },
    maritalStatus: {
        type: String
    },
    prySch: {
        type: String
    },
    secSch: {
        type: String
    },
    college: {
        type: String
    },
    courseOfStudy: {
        type: String
    },
    salary: {
        type: Number,
        default: 0
    },
    attendanceTable: [{ 
        type:  mongoose.Schema.Types.ObjectId, ref: 'Attendance'
    }],
    guarantor1passport: {
        type: String,
        default: null
    },
    guarantor2passport: {
        type: String,
        default: null
    },
    utilityBill: {
        type: String,
        default: null
    },
    validIDCard: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Admin', AdminSchema);