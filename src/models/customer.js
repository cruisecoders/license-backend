const mongoose = require('mongoose');
const moment = require('moment');

const CustomerSchema = new mongoose.Schema({
    customerId:{ type:String, required:true,unique:true },
    customerName:String,
    customerEmail:[String],
    createdAt:Date,
    updatedAt:Date,
});
CustomerSchema.index({ customerName:'text' });
const Customers = mongoose.model('customer', CustomerSchema);

module.exports = {
    insert: function(customerData,callback) {
        customerData['createdAt'] = moment();
        customerData['updatedAt'] = moment();
        new Customers(customerData).save(function (error, data) {
            callback((error) ? false : data);
        });
    },
    findById: function (id, callback) {
        Customers.findById({_id:id}, function (error, data) {
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },
    update: function (id, data, callback) {
        this.findById(id, function (customerData) {
            if (Object.keys(customerData).length > 0) {

                Object.keys(data).map(userKey => {
                    customerData[userKey] = data[userKey];
                });
                customerData['updatedAt'] = moment();
                customerData.save(function (error, data) {
                    callback((error) ? false : data);
                });
            } else {
                callback(false);
            }
        });
    },
    getSortedCustomers: function(skip,limit,index,sort,callback) {
        sort = sort ? {customerName : index} : {createdAt : 1};
        Customers.find(null,null,{
            skip:skip,
            limit:limit,
            sort:sort,
        }, function(error,data){
            callback(error? {} : data)
        })
    },
    findCustomerName: function (customerId,callback) {
        Customers.findOne({
            'customerId':customerId
        },function(error,data) {
            callback(error? false: (data === null)? false: data.customerName);
        });
    },
    findByName: function(searchString,callback) {
        const regex = new RegExp(searchString)
        Customers.find({
            customerName: { $regex: regex  }
        },function(error,data) {
            callback(error? false: (data === null)? false: data);
        })
    }
}