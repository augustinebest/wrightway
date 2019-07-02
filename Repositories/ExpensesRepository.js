const model = require('../Models/Expenses');
const BaseRepository = require('../Repositories/BaseRepository');

function ExpenseWorkerRepository() {

}

ExpenseWorkerRepository.prototype = BaseRepository(model);

module.exports = new ExpenseWorkerRepository();