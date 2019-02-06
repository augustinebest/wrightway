const CompanyRepository = require('../Repositories/CompanyRepository');

exports.create = (req, res, name) => {
    CompanyRepository.add(name, (err, company) => {
        if(err) return res.json({message: err});
        if(company) {
            return res.json({message: 'This company have been created successfully'});
        }
    })
}

exports.getCompanies = (req, res) => {
    CompanyRepository.get({}, (err, companies) => {
        if(err) return res.json({message: 'error ocurred in creating the companies', code: 10});
        res.json({message: companies, code: 200});
    })
}

exports.getACompany = (req, res, id) => {
    CompanyRepository.getById(id, (err, company) => {
        if(err) return res.json({message: 'error ocurred in getting the company', code: 10});
        if(!company) {
            return res.json({message: 'This does not exist', code: 11});
        }
        res.json({message: company, code: 200});
    })
}