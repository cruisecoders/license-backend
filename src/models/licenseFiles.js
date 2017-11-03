const mongoose = require('mongoose');
const moment = require('moment');


const LicenseFileSchema = new mongoose.Schema({
    customerId:{ type:String, required:true,unique:true },
    customerName:String,
    licenses:[String],
    description:String,
    createdAt:Date,
    updatedAt:Date,
});

const LicensesFiles = mongoose.model('licensefile', LicenseFileSchema);

module.exports = {
    insert: function(licenseFileData,callback) {
        licenseFileData['createdAt'] = moment();
        licenseFileData['updatedAt'] = moment();

        new LicensesFiles(licenseFileData).save(function (error,data){
            callback(error?false:data);
        });
    },
    getSortedLicenseFiles: function(skip,limit,index,sort,filter,dateStart,dateEnd,callback) {
        filter = filter ? { createdAt:{ $gt:(dateStart),$lt:(dateEnd)}} : {}
        sort = sort ? {customerName : index} : {createdAt : -1};
        LicensesFiles.find(filter,null,{
            skip:skip,
            limit:limit,
            sort:sort,
        }, function(error,data){
            callback(error? {} : data)
        })
    },
    getLicenseFileById: function(customerId,callback) {
        LicensesFiles.findOne({
            'customerId':customerId
        },function(error,data) {
            callback(error? false: (data === null)? false: data);
        });
    },
    findByName: function(searchString,callback) {
        const regex = new RegExp(searchString)
        LicensesFiles.find({
            customerName: { $regex: regex  }
        },function(error,data) {
            callback(error? false: (data === null)? false: data);
        })
    }
}