'use strict';

module.exports.customerToJson = function (customer) {

    if (customer) {

        var customerJson = {};
        customerJson["objectId"] = customer.id;
        customerJson["os"] = customer.get("os");
        customerJson["installation"] = customer.get("installation").id;
        customerJson["facebookProfile"] = this.facebookProfileToJson(customer.get("facebookProfile"));
        customerJson["createdAt"] = customer.get("createdAt") ? customer.get("createdAt").getTime() : undefined;
        customerJson["updatedAt"] = customer.get("updatedAt") ? customer.get("updatedAt").getTime() : undefined;

        return customerJson;

    } else {

        return undefined;

    }

};

module.exports.facebookProfileToJson = function (facebookProfile) {

    if (facebookProfile) {

        var facebookProfileJson = {};
        if(facebookProfile.get("objectId") !== undefined) {
            facebookProfileJson["objectId"] = facebookProfile.get("objectId");
        } else {
            facebookProfileJson["objectId"] = facebookProfile.id;
        }
        facebookProfileJson["facebookId"] = facebookProfile.get("facebookId");
        facebookProfileJson["username"] = facebookProfile.get("username");
        facebookProfileJson["profilePhotoURL"] = facebookProfile.get("profilePhotoURL");
        facebookProfileJson["facebookLink"] = facebookProfile.get("link");
        facebookProfileJson["createdAt"] = facebookProfile.get("createdAt") ? facebookProfile.get("createdAt").getTime() : undefined;

        return facebookProfileJson;

    } else {

        return undefined;

    }

};