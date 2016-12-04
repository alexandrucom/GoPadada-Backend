'use strict';

module.exports.getInstallation = function (installationId) {
    Parse.Cloud.useMasterKey();

    var query = new Parse.Query(Parse.Installation);
    query.equalTo("installationId", installationId);
    return query.first();
};