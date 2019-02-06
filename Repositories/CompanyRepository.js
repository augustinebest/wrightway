const model = require('../Models/Company');
const BaseRepository = require('../Repositories/BaseRepository');

function CompanyRepository() {

}

CompanyRepository.prototype = BaseRepository(model);

module.exports = new CompanyRepository();