var installationRepository = require('cloud/dal/InstallationRepository.js');
var customerRepository = require('cloud/dal/CustomerRepository.js');
var ridesRepository = require('cloud/dal/RidesRepository.js');
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
        function (customer) {
            if (customer === undefined) {
                response.error("No customer found with requested id");
            } else {
                var Ride = Parse.Object.extend("Ride");
                var newRide = new Ride();
                newRide.set("customer", customer);
                newRide.set("vehicleName", "Bus");
                newRide.set("vehicleType", "Bus");
                newRide.set("routeName", "Checkpoint Charlie");
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
        function (error) {
            response.error(error);
        }
    );

});

//params: customerId, beaconData
Parse.Cloud.define("endRide", function (request, response) {

    var customerId = request.params.customerId;
    var beaconData = request.params.beaconData;

    customerRepository.getCustomerById(customerId).then(
        function (customer) {
            if (customer === undefined) {
                response.error("No customer found with requested id");
            } else {
                ridesRepository.getStartedRideByCustomer(customer).then(
                    function (ride) {
                        if (ride === undefined) {
                            response.error("No started ride for requested customer");
                        } else {
                            ride.set("endedAt", new Date());
                            ride.save().then(
                                function (savedRide) {
                                    response.success(JSONConverter.rideToJson(savedRide));
                                },
                                function (error) {
                                    response.error(error);
                                }
                            );
                        }
                    },
                    function (error) {
                        response.error(error);
                    }
                );
            }
        },
        function (error) {
            response.error(error);
        }
    );

});

//params: customerId
Parse.Cloud.define("getRidesHistory", function (request, response) {

    var customerId = request.params.customerId;

    customerRepository.getCustomerById(customerId).then(
        function (customer) {
            if (customer === undefined) {
                response.error("No customer found with requested id");
            } else {
                ridesRepository.getRidesHistoryForCustomer(customer).then(
                    function (rides) {
                        var jsonRides = [];
                        rides.forEach(function(ride) {
                            jsonRides.push(JSONConverter.rideToJson(ride));
                        });
                        response.success(jsonRides);
                    },
                    function (error) {
                        response.error(error);
                    }
                );
            }
        },
        function (error) {
            response.error(error);
        }
    );

});

//params: customerId
Parse.Cloud.define("getPromotions", function (request, response) {

    var query = new Parse.Query("Promotion");
    query.find().then(
        function(promotions) {
            var jsonPromo = [];
            promotions.forEach(function(promotion) {
                jsonPromo.push(JSONConverter.promoToJson(promotion));
            });

            response.success(jsonPromo);
        },
        function(error) {
            response.error(error);
        }
    );

});

//params: customerId
Parse.Cloud.define("getUsers", function (request, response) {

    var query = new Parse.Query("FacebookProfile");
    query.find().then(
        function(profiles) {
            response.success(profiles);
        },
        function(error) {
            response.error(error);
        }
    );

});