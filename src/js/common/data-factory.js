/**
 * Data factory.
 *
 * Created by Ruslan Kardanov.
 * Date: 12/08/16.
 */
dataFactory = function($rootScope, $http) {

    // Factory.
    var factory = {};

    // Method to do places from the JSON file.
    factory.getPlaces = function() {
        var deferred = $rootScope.loadingTracker.createPromise();
        $http({
            method: 'GET',
            url: 'src/data/places.json'
        }).then(function success(response) {
            deferred.resolve(response.data);
        }, function fail() {
            deferred.resolve([]);
        });
        return deferred.promise;
    }

    // Returns factory.
    return factory;
}