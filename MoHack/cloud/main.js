var installationRepository = require('cloud/dal/InstallationRepository.js');
var customerRepository = require('cloud/dal/CustomerRepository.js');
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
            );

        },
        function (error) {
            response.error(error);
        }
    );
});

//params: customerId, beaconData
Parse.Cloud.define("startRide", function (request, response) {

    var customerId = request.params.customerId;
    var beaconData = request.params.beaconData;

    customerRepository.getCustomerById(customerId).then(
        function(customer) {
            if(customer === undefined) {
                response.error("No customer found with requested id");
            } else {
                var Ride = Parse.Object.extend("Ride");
                var newRide = new Ride();
                newRide.set("customer", customer);
                newRide.set("vehicleName", "name");
                newRide.set("vehicleType", "type");
                newRide.set("routeName", "route name");
                newRide.set("startedAt", new Date());

                newRide.save().then(
                    function (createdRide) {
                        response.success(JSONConverter.rideToJson(createdRide));
                    },
                    function (error) {
                        response.error(error);
                    }
                );
            }
        },
        function(error) {
            response.error(error);
        }
    );

});

//params: customerId,
Parse.Cloud.define("endRide", function (request, response) {

    var customerId = request.params.customerId;
    var beaconData = request.params.beaconData;

    customerRepository.getCustomerById(customerId).then(
        function(customer) {
            if(customer === undefined) {
                response.error("No customer found with requested id");
            } else {
                customerRepository.getStartedRideByCustomer(customer).then(
                    function(ride) {
                        if(ride === undefined) {
                            response.error("No started ride for requested customer");
                        } else {
                            ride.set("endedAt", new Date());
                            ride.save().then(
                                function(savedRide) {
                                    response.success(JSONConverter.rideToJson(savedRide));
                                },
                                function(error) {
                                    response.error(error);
                                }
                            );
                        }
                    },
                    function(error) {
                        response.error(error);
                    }
                );
            }
        },
        function(error) {
            response.error(error);
        }
    );

});
