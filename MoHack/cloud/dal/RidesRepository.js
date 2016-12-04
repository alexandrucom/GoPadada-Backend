/**
 * Created by Alex on 04/12/2016.
 */

module.exports.getStartedRideByCustomer = function(customer) {
    var query = new Parse.Query("Ride");
    query.equalTo("customer", customer);
    query.doesNotExist("endedAt");
    return query.first();
};

module.exports.getRidesHistoryForCustomer = function (customer) {
    var query = new Parse.Query("Ride");
    query.equalTo("customer", customer);
    return query.find();
};