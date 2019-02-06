const model = require('../Models/FactoryWorker');
const BaseRepository = require('../Repositories/BaseRepository');

function FactoryWorkerRepository() {

}

FactoryWorkerRepository.prototype = BaseRepository(model);

module.exports = new FactoryWorkerRepository();