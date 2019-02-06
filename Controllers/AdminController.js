const services = require('../Services/AdminServices');
const Validate = require('../Factories/Validate');
const FactoryWorker = require('../Models/FactoryWorker');
const cloud = require('../Factories/cloudinary');

exports.login = (req, res) => {
    const request = req.body;
    const admin = {
        idNo: request.idNo,
        password: request.password
    }
    if(request.idNo == '' || request.idNo == null || request.password == '' || request.password == null) {
        res.json({message: 'The field(s) are empty', code: 10})
    } else {
        services.login(req, res, admin);
    }
}

exports.addWorker = (req, res) => {
    // console.log(req.file);
    const request = req.body;
    const factoryWorker = {
        fullName: request.fullName,
        idNo: null,
        email: request.email,
        address: request.address,
        nationality: request.nationality,
        passport: req.file.path,
        imageID: '',
        stateOfOrigin: request.stateOfOrigin,
        role: request.role,
        localGovtArea: request.localGovtArea,
        town: request.town,
        religion: request.religion,
        phoneNumber: request.phoneNumber,
        sex: request.sex,
        age: request.age,
        maritalStatus: request.maritalStatus,
        prySch: request.prySch,
        secSch: request.secSch,
        college: request.college,
        courseOfStudy: request.courseOfStudy,
        companyId: request.companyId
    }
    try {
        if((request.fullName == '' || request.fullName == null || request.address == '' || request.address == null || request.nationality == '' || request.nationality == null || request.stateOfOrigin == '' || request.stateOfOrigin == null || request.role == '' || request.role == null || request.localGovtArea == '' || request.localGovtArea == null || request.town == '' || request.town == null || request.religion == '' || request.religion == null || request.phoneNumber == '' || request.phoneNumber == null || request.sex == '' || request.sex == null || request.age == '' || request.age == null || request.maritalStatus == '' || request.maritalStatus == null)) {
            res.json({message: 'The field(s) are empty', code: 10})
        } else {
            FactoryWorker.findOne({email: request.email}, (err, result) => {
                if(err) return res.json({message: 'Error ocurred in finding this email', code: 11});
                if(result) {
                    return res.json({message: 'This email already exist', code: 12})
                } else {
                    if(!Validate('email', request.email)) {
                        res.json({message: 'The email is not valid', code: 13})
                    } else {
                        if(!Validate('sex', request.sex)) {
                            res.json({message: 'The gender is not valid', code: 14})
                        } else {
                            if(!Validate('phone_number', request.phoneNumber)) {
                                res.json({message: 'The phone number is not valid', cde: 15})
                            } else {
                                if(!Validate('age', request.age)) {
                                    res.json({message: 'The age is not valid', code: 16})
                                } else {
                                    if(!Validate('fullName', request.fullName)) {
                                        res.json({message: 'The full name format is invalid', code: 17})
                                    } else {
                                        cloud.upload(req.file.path).then(result => {
                                            factoryWorker.passport = result.url;
                                            factoryWorker.imageID = result.Id;
                                            return services.addWorker(req, res, factoryWorker);
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
    } catch(error) {
        return res.json({err: error});
    }
}

exports.getAdminForAttendance = (req, res) => {
    try{
        const currentDateToBeMarked = new Date;
        return services.getAdminForAttendance(req, res, currentDateToBeMarked);
    } catch(error) {
        res.json({message: error})
    }
}

exports.getFactoryWorkers = (req, res) => {
    try {
        const compId = req.params.id 
        return services.getFactoryWorkers(req, res, compId);
    } catch(error) {
        res.json({message: error});
    }
}

exports.getFactoryWorkersForAttendance = (req, res) => {
    try {
        const currentDateToBeMarked = new Date;
        const compId = req.params.id;
        return services.getFactoryWorkersForAttendance(req, res, currentDateToBeMarked, compId);
    }catch(error) {
        return res.json({message: error, code: 10});
    }
}

exports.getDriversForAttendance = (req, res) => {
    try {
        const currentDateToBeMarked = new Date;
        const compId = req.params.id;
        return services.getDriversForAttendance(req, res, currentDateToBeMarked, compId);
    }catch(error) {
        return res.json({message: error, code: 10});
    }
}

exports.getOperatorsForAttendance = (req, res) => {
    try {
        const compId = req.params.id
        const currentDateToBeMarked = new Date;
        return services.getOperatorsForAttendance(req, res, currentDateToBeMarked, compId);
    }catch(error) {
        return res.json({message: error, code: 10});
    }
}

exports.getDrivers = (req, res) => {
    try {
        const compId = req.params.id
        // console.log(compId)
        return services.getDrivers(req, res, compId);
    } catch(error) {
        return res.json({message: error})
    }
}

exports.getOperators = (req, res) => {
    try {
        const compId = req.params.id
        return services.getOperators(req, res, compId);
    } catch(error) {
        return res.json({message: error})
    }
}

exports.getAworker = (req, res) => {
    try {
        const workerId = req.params.id;
        return services.getAworker(req, res, workerId);
    } catch(error) {
        return res.json({message: error, code: 10})
    }
}

exports.ascribeSalary = (req, res) => {
    const request = req.body;
    const data = {
        workerId: request.workerId,
        newSalary: request.newSalary
    }
    try {
        if(request.workerId == '' || request.workerId == null) {
            return res.json({message: 'The workerID is required', code: 8});
        } else {
            if(!Validate('salary', request.newSalary)) {
                return res.json({message: 'Salaries should not below 1,000 and should be a number', code: 9});
            } else {
                return services.ascribeSalary(req, res, data);
            }
        }
    } catch(error) {
        return  res.json({message: error});
    }
}

exports.markAttendance = (req, res) => {
    try {
        const request = req.body;
        const data = {
            date: new Date,
            idNo: request.idNo,
            status: request.status,
            companyId: request.companyId,
            amountDeducted: null,
            timeIn: null,
            day: null
        }
        if(request.idNo == '' || request.idNo == null || request.status == '' || request.status == null) {
            return res.json({message: 'No attendance was taken for this worker', code: 10});
        } else {
            return services.markAttendance(req, res, data);
        }
    } catch(error) {
        res.json({message: error})
    }
}

exports.findAWorkerAttendanceInAMonth = (req, res) => {
    try{
        return services.findAWorkerAttendanceInAMonth(req, res)
    } catch(error) {
        res.json({message: error})
    }
}

// exports.doNothing = (req, res) => {

// }