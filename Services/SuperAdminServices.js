const AdminRepository = require('../Repositories/AdminRepository');
const functions = require('../Factories/functions');

exports.createAdmin = (req, res, admin) => {
    var idNo;
    const date = new Date;
    const year = date.getUTCFullYear();
    const uuid = functions.uuid();
    AdminRepository.get({}, (err, result) => {
        if(err) return res.json({message: 'Error ocurred in finding the Admin'});
        if(result) {
            if(result.length == 0) {
                const start = 1;
                idNo = 'WWA-'+year+uuid+start;
            }else {
                idNo = 'WWA-'+year+uuid+(result.length+1);
            }
            admin.idNo = idNo;
            AdminRepository.add(admin, (err, ad) => {
                if(err) return res.json({message: 'Error ocurred in adding this Admin'});
                if(ad) {
                    return res.json({message: 'This admin have been added successfully', admin: admin});
                }
            })
        } 
    })
}