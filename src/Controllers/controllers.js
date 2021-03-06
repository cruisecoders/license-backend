const express = require('express');
const Action = require('../Actions/actions')
const router = express.Router();

router.post('/addCustomer',Action.addCustomer);

router.get('/getCustomer',Action.getCustomer);

router.get('/getCustomerById',Action.getCustomerById);

router.post('/queryCustomerName',Action.queryString);

router.post('/editCustomer',Action.editCustomer);

router.post('/generateLicense',Action.generateLicense);

router.get('/getLicense',Action.getAllLicense);

router.get('/getLicenseFile',Action.getLicenseFiles);

router.post('/getLicenseByCustomer',Action.getLicenseByCustomer);

router.post('/getLicenseFileByCustomer',Action.getLicenseFileByCustomer);

router.get('/getLicenseFileById',Action.getLicenseFileById);

module.exports = router;    