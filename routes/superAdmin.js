const express = require('express');
const router = express.Router();
const superAdminController = require('../Controllers/SuperAdminController');
const upload = require('../Factories/image_uploads');

router.post('/create-admin', upload.upload.single('passport'), superAdminController.createAdmin);

module.exports = router;