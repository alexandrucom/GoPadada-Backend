/**
 * Created by Alex on 04/12/2016.
 */

module.exports.getCustomerById = function (customerId) {
    var query = new Parse.Query("Customer");
    query.equalTo("objectId", customerId);
    query.include('facebookProfile');
    query.include('installation');
    return query.first();
};

module.exports.getStartedRideByCustomer = function(customer) {
    var query = new Parse.Query("Ride");
    query.equalTo("customer", customer);
    query.doesNotExist("endedAt");
    return query.first();
};