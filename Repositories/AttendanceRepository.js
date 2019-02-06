const model = require('../Models/Attendance');
const BaseRepository = require('../Repositories/BaseRepository');

function AttendanceRepository() {

}

AttendanceRepository.prototype = BaseRepository(model);

module.exports = new AttendanceRepository();