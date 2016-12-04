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
