const CustomerModal = require('../models/customer');
const LicenseModal = require('../models/license');
const LicenseFileModal = require('../models/licenseFiles');
const moment = require('moment');

module.exports = {
    addCustomer: function(req,res) {
        const customerData = req.body;
        CustomerModal.insert(customerData,async (insertCustomerRes)=> {
            res.json({status:true,data:insertCustomerRes});
        });
    },
    getCustomer: function(req,res) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = page > 0 ? ((page) * limit) : 0
        const sort = req.query.sort;

        const index = parseInt(req.query.index);
        CustomerModal.getSortedCustomers(skip,limit,index,sort,async (customers) => {
            res.json({ status:true,data: customers });
        });
    },
    editCustomer: function(req,res) {
        const id = req.body.id;
        const data = req.body.data;
        CustomerModal.update(id,data,async (editCustomerRes) => {
            res.json({ status:true,data:editCustomerRes });
        });
    },
    getCustomerById : function(req,res) {
        const id = req.query.id;
        CustomerModal.findCustomerById(id,data,async (customer) => {
            res.json({ status:true,data:customer });
        });
    },
    generateLicense: function(req,res) {
        const data = req.body.data
        const numberOfLicenses = parseInt(req.body.numberOfLicenses);
        let generatedLicenseKey = [];
        CustomerModal.findCustomerById(data.customerId, async(customerNameRes) => {
            if(customerNameRes) {
                data['customerName'] = customerNameRes.customerName;
                for(i=0;i<numberOfLicenses;i++) {
                    LicenseModal.insert(data,async (addLicenseKeyRes) => {
                        if(!addLicenseKeyRes) {
                            res.json({ status:true,data:addLicenseKeyRes });
                            res.end();
                        }
                        generatedLicenseKey.push(addLicenseKeyRes);
                        if(generatedLicenseKey.length === numberOfLicenses) {
                            data['licenses'] = generatedLicenseKey;
                            LicenseFileModal.insert(data,async (LicenseFileRes) => {
                                res.json({ status:true,data:LicenseFileRes });
                            });
                        }
                    });
                }
            } else {
                res.json({ status:true,data:'User Does Not Exists' });
            }
        })  
    },
    getAllLicense: function(req,res) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = page > 0 ? ((page) * limit) : 0
        const sort = req.query.sort;
        const filter = req.query.filter;
        const dateStart = moment(req.query.dateStart,'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const dateEnd = moment(req.query.dateEnd,'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');;
        const index = parseInt(req.query.index);
        LicenseModal.getSortedLicenses(skip,limit,index,sort,filter,dateStart,dateEnd,async (licenses) => {
            res.json({ status:true,data: licenses });
        });
    },
    getLicenseFiles: function(req,res) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = page > 0 ? ((page) * limit) : 0
        const sort = req.query.sort;
        const filter = req.query.filter;
        const dateStart = moment(req.query.dateStart,'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const dateEnd = moment(req.query.dateEnd,'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');;
        const index = parseInt(req.query.index);
        LicenseFileModal.getSortedLicenseFiles(skip,limit,index,sort,filter,dateStart,dateEnd,async (licenses) => {
            res.json({ status:true,data: licenses });
        });
    },
    getLicenseFileById: function(req,res) {
        const customerId = req.query.id;
        LicenseFileModal.getLicenseFileById(customerId,async (licenseFile) => {
            res.json({ status:true,data:licenseFile });
        });
    },
    queryString: function(req,res) {
        const searchString = req.body.query;
        CustomerModal.findByName(searchString, async (matchedResults) => {
            if(matchedResults) {
                res.json({ status:true,data:matchedResults });
            } else {
                res.json({ status:true,data:'No Matching Results' });
            }
        })
    },
    getLicenseByCustomer:  function(req,res) {
        const searchString = req.body.query;
        LicenseModal.findByName(searchString, async (matchedResults) => {
            if(matchedResults) {
                res.json({ status:true,data:matchedResults });
            } else {
                res.json({ status:true,data:'No Matching Results' });
            }
        })
    },
    getLicenseFileByCustomer:  function(req,res) {
        const searchString = req.body.query;
        LicenseFileModal.findByName(searchString, async (matchedResults) => {
            if(matchedResults) {
                res.json({ status:true,data:matchedResults });
            } else {
                res.json({ status:true,data:'No Matching Results' });
            }
        })
    },
}
    