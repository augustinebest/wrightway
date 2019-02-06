const services = require('../Services/CompanyServices');

exports.create = (req, res) => {
    console.log('You want to create a company')
    const request = req.body;
    const data = {
        name: request.name,
        maxTimeStart: request.maxTimeStart,
        late1Start: request.late1Start,
        late1End: request.late1End,
        late1Debit: request.late1Debit,
        late2Start: request.late2Start,
        late2End: request.late2End,
        late2Debit: request.late2Debit,
        absentDebit: request.absentDebit
    };
    if(data.name == '' || data.name == null) {
        res.json({message: 'The field is required'})
    } else {
        return services.create(req, res, data);
    }
}

exports.getCompanies = (req, res) => {
    return services.getCompanies(req, res)
}

exports.getACompany = (req, res) => {
    const companyId = req.params.id;
    return services.getACompany(req, res, companyId);
}