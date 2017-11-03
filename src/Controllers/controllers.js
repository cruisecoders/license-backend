const express = require('express');
const Action = require('../Actions/actions')
const router = express.Router();

router.post('/addCustomer',Action.addCustomer);

router.get('/getCustomer',Action.getCustomer);

router.post('/queryCustomerName',Action.queryString);

router.post('/editCustomer',Action.editCustomer);

router.post('/generateLicense',Action.generateLicense);

router.get('/getLicense',Action.getAllLicense);

router.get('/getLicenseFile',Action.getLicenseFiles);

router.get('/getLicenseByCustomer',Action.getLicenseByCustomer);

router.get('/getLicenseFileById',Action.getLicenseFileById);

module.exports = router;