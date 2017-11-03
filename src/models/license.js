const mongoose = require('mongoose');
const moment = require('moment');
const uuidv4 = require('uuid/v4'); //Random key

const LicenseSchema = new mongoose.Schema({
    customerId:{ type:String, required:true },
    licenseKey:{ type:String,required:true },
    customerName:String,
    createdAt:Date,
    updatedAt:Date,
});

const Licenses = mongoose.model('license', LicenseSchema);

module.exports = {
    insert: function(licenseData,callback) {
        licenseData['createdAt'] = moment();
        licenseData['updatedAt'] = moment();
        licenseData['licenseKey'] = uuidv4();
        
        new Licenses(licenseData).save(function (error,data) {
            callback(error? false : (data.licenseKey));
        });
    },
    getSortedLicenses: function(skip,limit,index,sort,filter,dateStart,dateEnd,callback) {
        filter = filter ? { createdAt:{ $gt:(dateStart),$lt:(dateEnd)}} : {}
        sort = sort ? {customerName : index} : {createdAt : -1};
        Licenses.find(filter,null,{
            skip:skip,
            limit:limit,
            sort:sort,
        }, function(error,data){
            callback(error? {} : data)
        })
    }
}
