const model = require('../Models/Admins');
const BaseRepository = require('../Repositories/BaseRepository');

function AdminRepository() {

}

AdminRepository.prototype = BaseRepository(model);

module.exports = new AdminRepository();