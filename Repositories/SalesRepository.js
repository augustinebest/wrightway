const model = require('../Models/Sales');
const BaseRepository = require('../Repositories/BaseRepository');

function SalesRepository() {

}

SalesRepository.prototype = BaseRepository(model);

module.exports = new SalesRepository();