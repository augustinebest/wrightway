const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdminController');
const auth = require('../Factories/functions');
const upload = require('../Factories/image_uploads');

router.post('/login', adminController.login);
router.post('/create', auth.checkAuth, upload.upload.single('passport'), adminController.addWorker);
router.get('/:id/factoryWorkers', auth.checkAuth, adminController.getFactoryWorkers);
router.get('/getAdminForAttendance', auth.checkAuth, adminController.getAdminForAttendance);
router.get('/:id/getFactoryWorkersForAttendance', auth.checkAuth, adminController.getFactoryWorkersForAttendance);
router.get('/:id/getDriversForAttendance', auth.checkAuth, adminController.getDriversForAttendance);
router.get('/:id/getOperatorsForAttendance', auth.checkAuth, adminController.getOperatorsForAttendance);
router.get('/:id/getDrivers', auth.checkAuth, adminController.getDrivers);
router.get('/:id/getOperators', auth.checkAuth, adminController.getOperators);
router.get('/:id/worker', auth.checkAuth, adminController.getAworker);
router.post('/ascribeSalary', auth.checkAuth, adminController.ascribeSalary);
router.post('/mark-attendance', auth.checkAuth, adminController.markAttendance);
router.post('/:id/worker-attendance-in-a-month', auth.checkAuth, adminController.findAWorkerAttendanceInAMonth);
router.post('/:id/make-expenses', auth.checkAuth, adminController.makeExpenses);
router.post('/:id/getByDay', auth.checkAuth, adminController.getPreferredDateExpenses);
router.post('/:id/addSales', auth.checkAuth, adminController.addSales);

module.exports = router;