const Validate = require('../Factories/Validate');
const Admin = require('../Models/Admins');
const service = require('../Services/SuperAdminServices');
const cloud = require('../Factories/cloudinary');

exports.createAdmin = (req, res) => {
    // console.log(req.file);
    const request = req.body;
    const admin = {
        fullName: request.fullName,
        idNo: null,
        email: request.email,
        address: request.address,
        nationality: request.nationality,
        passport: req.file.path,
        imageID: '',
        stateOfOrigin: request.stateOfOrigin,
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
        courseOfStudy: request.courseOfStudy
    }
    // console.log(admin)
    try {
        if((request.fullName == '' || request.fullName == null || request.email == '' || request.email == null || request.address == '' || request.address == null || request.nationality == '' || request.nationality == null || request.stateOfOrigin == '' || request.stateOfOrigin == null || request.localGovtArea == '' || request.localGovtArea == null || request.town == '' || request.town == null || request.religion == '' || request.religion == null || request.phoneNumber == '' || request.phoneNumber == null || request.sex == '' || request.sex == null || request.age == '' || request.age == null || request.maritalStatus == '' || request.maritalStatus == null )) {
            res.json({message: 'The field(s) are empty'})
        } else {
            Admin.findOne({email: request.email}, (err, result) => {
                if(err) return res.json({message: 'Error ocurred in finding this email'});
                if(result) {
                    return res.json({message: 'This email already exist'})
                } else {
                    if(!Validate('email', request.email)) {
                        res.json({message: 'The email is not valid'})
                    } else {
                        if(!Validate('sex', request.sex)) {
                            res.json({message: 'The gender is not valid'})
                        } else {
                            if(!Validate('phone_number', request.phoneNumber)) {
                                res.json({message: 'The phone number is not valid'})
                            } else {
                                if(!Validate('age', request.age)) {
                                    res.json({message: 'The age is not valid'})
                                } else {
                                    if(!Validate('fullName', request.fullName)) {
                                        res.json({message: 'The full name format is invalid'})
                                    } else {
                                        cloud.upload(req.file.path).then(result => {
                                            admin.passport = result.url;
                                            admin.imageID = result.Id;
                                            return service.createAdmin(req, res, admin);
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
        res.json({message: error});
    }
}