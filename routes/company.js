const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/CompanyController');
const auth = require('../Factories/functions');

router.post('/create', companyController.create);
router.get('/get', auth.checkAuth, companyController.getCompanies);
router.get('/get-a-comp/:id', auth.checkAuth, companyController.getACompany);

module.exports = router;