var installationRepository = require('cloud/dal/InstallationRepository.js');
var JSONConverter = require('cloud/helpers/JsonConverter.js');

//params: installationId
Parse.Cloud.define("registerCustomer", function (request, response) {

    var installationId = request.params.installationId;

    installationRepository.getInstallation(installationId).then(
        function (installation) {

            var Customer = Parse.Object.extend("Customer");
            var newCustomer = new Customer();
            newCustomer.set("installation", installation);

            newCustomer.save().then(
                function (createdCustomer) {
                    response.success(JSONConverter.customerToJson(createdCustomer));
                },
                function (error) {
                    response.error(error);
                }
            ).catch(function (error) {
                response.error(error.stack);
            });
        },
        function (error) {
            response.error(error);
        }
    );
});
